
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'


const PageObject = mergePages({}, BaseMixin, {
  data: {
    addressInfo: {
      userName: '',
      telNumber: '',
      provinceName: '',
      cityName: '',
      countyName: '',
      postalCode: '',
      detailInfo: ''
    }
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

    if(res.result.data.entities && res.result.data.entities[0].addressInfo) {
      this.setData({
        addressInfo: res.result.data.entities[0].addressInfo
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
          apiName: "adminAPI.updateOrderAddress",
          addressInfo: this.data.addressInfo,
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
    console.log(e)
    if (e.currentTarget.dataset.field == 'userName') {
      this.setData({
        'addressInfo.userName': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'telNumber') {
      this.setData({
        'addressInfo.telNumber': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'provinceName') {

      this.setData({
        'addressInfo.provinceName': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'cityName') {
      this.setData({
        'addressInfo.cityName': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'countyName') {
      this.setData({
        'addressInfo.countyName': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'postalCode') {

      this.setData({
        'addressInfo.postalCode': e.detail.value
      })
    }

    if (e.currentTarget.dataset.field == 'detailInfo') {
      this.setData({
        'addressInfo.detailInfo': e.detail.value
      })
    }
  }
})

Page(PageObject)