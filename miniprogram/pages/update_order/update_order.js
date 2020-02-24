
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'


const OrderStatus = {
  '0': 'submit',
  '1': 'pay',
  '2': 'received',
  '3': 'refund',
  '4': 'complete',

}

const PageObject = mergePages({}, BaseMixin, {
  data: {
    status: null
  },
  onInited(options) {

    this.setData({
      orderid: options.orderid
    })
    this.getOrderDetail()
  },
  async getOrderDetail() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.getUserOrders",
          orderid: this.data.orderid
        }
      )
    } catch (e) {
      console.error(e)
      this.hideLoading()
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }


    this.hideLoading()
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }

    if (res.result.data.entities && res.result.data.entities[0].addressInfo) {
      this.setData({
        addressInfo: res.result.data.entities[0].addressInfo
      })
    }

    this.setData({
      status: res.result.data.status
    })
  },

  setOrderStatus() {
    let that = this;
    wx.showActionSheet({
      itemList: ['订单提交', '已支付', '已接单', '已退款', '已完成'],
      success(res) {
        console.log(res.tapIndex)
        that.setData({
          status: OrderStatus[res.tapIndex.toString()]
        })
        that.submitForm()
      },
      fail(res) {
        console.log(res.errMsg)

      }
    })
  },

  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.updateOrderStatus",
          status: this.data.status,
          orderId: this.data.orderid
        }
      )
    } catch (e) {
      console.error(e)
      this.hideLoading()
      this.showToast({
        title: e.message
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }

    this.hideLoading()
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
    } else {
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
    }

    setTimeout(() => {
      wx.navigateBack()
    }, this.data.settings.shortTipDuration)
  },
})

Page(PageObject)