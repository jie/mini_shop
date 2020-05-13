
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { asyncPayment } from '../../utils/async_tools/async_payment.js'


const PageObject = mergePages({}, BaseMixin, {

  data: {
    navbarData: {
      showCapsule: 1,
      title: "首页",
      isPage: false
    },
    entities: [],
    images: [],
    targetImage: null,
    cardId: null,
    colors: {
      one: '#ffc0d0',
      two: '#ffe0e0',
      three: '#ffedff'
    }
  },

  onInited: function (options) {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: async function () {
    await this.getCards()
    wx.stopPullDownRefresh()
  },
  async getCards() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI('main', {
        apiName: 'getCards'
      })
    } catch (e) {
      console.error(e)
      this.showToast({
        title: e.message
      })
      this.hideLoading()
      wx.stopPullDownRefresh()
      return
    }
    this.hideLoading()
    console.log(res)
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
    } else {
      this.setData({
        entities: res.result.data.entities,
        images: res.result.data.images,
        
      })
      if(this.data.images && this.data.images.length !== 0 ) {
        this.setData({
          targetImage: this.data.images[0].url
        })
        console.log(this.data.targetImage)
      }
    }
    wx.stopPullDownRefresh()
  },
  ontapCard(e) {
    let that = this
    let card = e.currentTarget.dataset.card
    $wuxDialog().confirm({
      resetOnClose: true,
      title: `您正在购买充值卡，支付${card.value}元实际得到${card.real_value}元`,
      content: '确定是否提交订单',
      onConfirm: (e, response) => {
        that.setData({
          cardId: card._id
        })
        if (that.data.cardId) {
          that.submitDepositOrder()
        }
      }
    })
  },
  submitDepositOrder() {
    let that = this
    console.log('card:', that.data.cardId)
    wx.cloud.callFunction({
      name: 'main',
      data: {
        apiName: 'depositAPI.deposit',
        cardId: that.data.cardId
      },
      success: res => {
        console.log(res)
        if (!res.result.status) {
          this.showToast({
            title: res.result.message
          })
          return
        } else {
          this.startPayment(res.result.data.orderNo, res.result.data.payData)
        }

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  async startPayment(orderNo, payargs) {
    let result = null
    try {
      result = await asyncPayment(payargs)
    } catch(e) {
      console.error(e)
      if (e && e.errMsg == 'requestPayment:fail cancel') {
        return
      } else {
        this.showToast({
          title: e
        })
      }
    }
    console.log(result)
    if (result && result.errMsg && result.errMsg == 'requestPayment:ok') {
      // TODO: 查询支付结果
      this.depositSuccess(orderNo)
    }
    

  },
  async depositSuccess(orderNo) {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('main', {
        apiName: 'depositAPI.depositSuccess',
        orderNo: orderNo
      })
    } catch (e) {
      console.error(e)
      this.showToast({
        title: e.message
      })
      this.hideLoading()
      return
    }


    this.hideLoading()
    if (result.result.status !== true) {
      this.showToast({
        title: result.result.message
      })
      return
    }

    $wuxDialog().alert({
      resetOnClose: true,
      content: '充值成功',
      onConfirm: (e, response) => {
        wx.navigateTo({
          url: '/pages/orders/orders',
        })
      }
    })

  },
})


Page(PageObject)