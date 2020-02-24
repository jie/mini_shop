
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import PulldownMixin from '../base/pulldown_mixin'
import OrdersMixin from '../base/orders_mixin'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { $wuxCalendar } from '../../components/wux-weapp/index'
import { StatusLabel, DeliveryStatusLabel } from '../../utils/constant'


const PageObject = mergePages({}, BaseMixin, PulldownMixin, OrdersMixin, {

  data: {
    targetDate: [],
    target_date: '',
    reqData: {
      page: 1,
      pagesize: 10,
      start_at: null,
      end_at: null
    },
    entityIdField: '_id',
    apiName: "adminAPI.getUserOrders",
    isCloudFunc: true,
    statuses: StatusLabel,
    deliveryStatus: DeliveryStatusLabel,
    itemFlags: {
      pay: '-',
      deposit: '+'
    },
    user_id: null,
    orderid: null,
  },
  onInited(options) {
    let start_at = moment().format('YYYY-MM-DD 00:00:00')
    let end_at = moment().format('YYYY-MM-DD 23:59:59')
    this.setData({
      'reqData.start_at': start_at, 
      'reqData.end_at': end_at,
      'target_date': moment().format('YYYY-MM-DD')
    })
    wx.startPullDownRefresh()
  },
  showCalendar() {
    $wuxCalendar().open({
      value: this.data.targetDate,
      onChange: (values, displayValues) => {
        if (values && values.length === 0) {
          return
        }
        console.log('onChange', values, displayValues)
        this.setData({
          targetDate: displayValues,
          target_date: displayValues[0],
          'reqData.start_at': `${displayValues[0]} 00:00:00`,
          'reqData.end_at': `${displayValues[0]} 23:59:59`,
        })
        wx.startPullDownRefresh()
      },
    })
  }
})

Page(PageObject)