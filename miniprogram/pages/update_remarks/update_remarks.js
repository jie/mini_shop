
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'

const PageObject = mergePages({}, BaseMixin, {
  data: {
    admin_remarks: '',
    remarks: ''
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

    if (res.result.data.entities && res.result.data.entities[0].orderInfo) {
      console.log(res.result.data.entities[0])
      this.setData({
        remarks: res.result.data.entities[0].remarks || '',
        admin_remarks: res.result.data.entities[0].admin_remarks || '',
      })
    }
  },


  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.updateOrderRemarks",
          remarks: this.data.remarks,
          admin_remarks: this.data.admin_remarks,
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
  bindAdminRemarksChange(e) {
    this.setData({
      admin_remarks: e.detail.value
    })

  },
  bindUserRemarksChange(e){
    this.setData({
      remarks: e.detail.value
    })
  } 
})

Page(PageObject)