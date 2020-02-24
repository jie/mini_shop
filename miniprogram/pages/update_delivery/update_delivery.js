
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { $wuxCalendar } from '../../components/wux-weapp/index'

const DeliveryStatus = {
  '0': 'preparing',
  '1': 'shipping',
  '2': 'delivering',
  '3': 'received'
}

const companies = [
  { name: '顺丰' },
  { name: '韵达' },
  { name: '中通' },
  { name: '圆通' },
  { name: '申通' },
  { name: '自营' }
]

const PageObject = mergePages({}, BaseMixin, {
  data: {
    status: null,
    companies: companies,
    targetDate: [],
    deliveryInfo: {
      company_name: '',
      orderno: '',
      will_received_date: '',
      will_received_time: '',
      create_at: '',
      fee: 0
    }
  },
  onInited(options) {
    this.setData({
      orderid: options.orderid
    })
    this.getOrderDetail()
  },

  openCalendar() {
    $wuxCalendar().open({
      value: this.data.targetDate,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          targetDate: displayValues,
          'deliveryInfo.will_received_date': displayValues[0]
        })
      },
    })
  },
  bindTimeChange(e) {
    this.setData({
      'deliveryInfo.will_received_time': e.detail.value
    })
  },
  bindOrdernoChange(e) {
    this.setData({
      'deliveryInfo.orderno': e.detail.value
    })
  },
  bindDeliveryCompanyInputChange(e) {
    this.setData({
      'deliveryInfo.company_name': e.detail.value
    })
  },
  bindOrdeFeeChange(e) {
    try {
      parseInt(e.detail.value)
    } catch(error) {
      console.error(error)
      return
    }
    this.setData({
      'deliveryInfo.fee': parseInt(e.detail.value)
    })
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

    this.setData({
      status: res.result.data.delivery_status
    })
  },

  setOrderStatus() {
    let that = this;
    wx.showActionSheet({
      itemList: ['备货中', '已发货', '正在送货', '已签收'],
      success(res) {
        console.log(res.tapIndex)
        that.setData({
          status: DeliveryStatus[res.tapIndex.toString()]
        })
        that.submitForm()
      },
      fail(res) {
        console.log(res.errMsg)

      }
    })
  },

  async submitForm() {
    console.log('status:', this.data.status)
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.updateDeliveryStatus",
          status: this.data.status,
          orderId: this.data.orderid,
          deliveryInfo: this.data.deliveryInfo
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
  bindDeliveryCompanyChange(e) {
    console.log(e)
    this.setData({
      'deliveryInfo.company_name': companies[parseInt(e.detail.value)].name
    })
  }
})

Page(PageObject)