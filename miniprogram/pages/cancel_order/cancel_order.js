
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'

const PageObject = mergePages({}, BaseMixin, {
  data: {
    refund_amount: 0
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
  },


  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.cancelOrder",
          refund_amount: this.data.refund_amount,
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
  bindInputChange(e) {
    try {
      this.setData({
        refund_amount: parseInt(e.detail.value)
      })
    } catch (e) {
      console.error(e)
    }

  }
})

Page(PageObject)