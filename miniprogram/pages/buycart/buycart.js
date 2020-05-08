import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { getWxAddress } from '../../utils/async_tools/async_address'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'

const PageObject = mergePages({}, BaseMixin, BuycartMixin, {

  /**
   * 页面的初始数据
   */
  data: {
    buycart: null,
    isAgree: false,
    userInfo: null,
    address: null
  },
  onInited(options) {
    this.getProfile()
  },
  onShow() {
    this.loadBuycart()
    this.loadAgreeStatus()
    this.loadDeliveryStatus()
    this.getUserSubscribeMsg(["custom_pay_success", "order_reject"])
  },
  loadDeliveryStatus() {
    let isDelivery = wx.getStorageSync('isDelivery')
    if(isDelivery === true) {
      this.setData({
        'buycart.isDelivery': true
      })
    } else {
      this.setData({
        'buycart.isDelivery': false
      })
      wx.setStorageSync('isDelivery', false)
    }
  },
  loadAgreeStatus() {
    let isAgree = wx.getStorageSync('isAgree')
    if (isAgree === true) {
      this.setData({
        isAgree: true
      })
    } else {
      this.setData({
        isAgree: false
      })
      wx.setStorageSync('isAgree', false)
    }
  },
  counterUpdate(e) {
    console.log(e)
    if (e.detail.actionType == 'counterUpdate') {
      this.updateGoodsCount(e.detail.optId, e.detail.counter)
    }
  },
  ontapAgree() {
    this.setData({
      isAgree: !this.data.isAgree
    })
    wx.setStorageSync('isAgree', this.data.isAgree)
  },
  goCake() {
    wx.navigateBack()
  },
  ontapClearBuycart() {
    $wuxDialog().confirm({
      resetOnClose: true,
      title: '',
      content: '请确定是否清空购物车',
      onConfirm: (e, response) => {
        this._clearBuyCart()
      }
    })
  },
  ontapSubmit() {
    if (!this.data.isAgree) {
      $wuxDialog().alert({
        resetOnClose: true,
        content: '请点击同意用户协议后再提交订单',
      })
    } else {
      if (this.data.isDelivery && !this.data.address) {
        this.showToast({
          title: '请选择收货地址'
        })
        return
      }


      if(!this.data.buycart.entities || this.data.buycart.entities.length === 0) {
        $wuxDialog().confirm({
          resetOnClose: true,
          title: `您还没有选择商品`,
          content: '返回商城',
          onConfirm: (e, response) => {
            wx.navigateBack()
          }
        })
        return
      }

      $wuxDialog().confirm({
        resetOnClose: true,
        title: `订单总金额${this.data.buycart.total}元`,
        content: '确定是否提交订单',
        onConfirm: (e, response) => {
          this.submitOrder()
        }
      })
    }
  },
  async submitOrder() {
    console.log('submitOrder')
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI('main', {
        apiName: 'payAPI.orderPay',
        orderInfo: this.data.buycart
      })
    } catch (e) {
      console.error(e)
      this.hideLoading()
      this.showToast({
        title: e.message
      })
      return
    }

    this.hideLoading()
    if (!res.result.status) {
      this.showToast({
        title: res.result.message,
      })
      return
    }

    this._clearBuyCart()
    this.submitPaySuccess()
  },
  submitPaySuccess() {
    $wuxDialog().alert({
      resetOnClose: true,
      content: '支付成功',
      onConfirm: (e, response) => {
        wx.navigateTo({
          url: '/pages/orders/orders',
        })
      }
    })
  },
  async ontapAddress() {
    let [err, result] = await getWxAddress()
    console.log(err)
    console.log(result)
    if (err !== null) {
      return
    }
    this.updateAddress(result)

  },
  async updateAddress(address) {
    let result = null
    try {
      result = CallCloudFuncAPI("main",
        {
          apiName: "userAPI.updateAddress",
          address: address
        })
    } catch (e) {
      console.error(e)
    }
    if (result === null) {
      return
    }
    wx.setStorageSync('address', address)
    this.setData({
      address: address
    })
  },
  async getProfile() {
    let that = this
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "getProfile"
        }
      )
    } catch (e) {
      console.error(e)
    }


    if (res) {
      this.setData({
        userInfo: res.result.data.user,
        address: res.result.data.user.address
      })
      wx.setStorageSync('address', res.result.data.user.address)
    }
  },
  onSelectNotDelivery() {
    this.setData({
      'buycart.isDelivery': false
    })
    wx.setStorageSync('isDelivery', false)
  },
  onSelectDelivery() {
    this.setData({
      'buycart.isDelivery': true,
    })
    wx.setStorageSync('isDelivery', true)
  }
})

Page(PageObject)