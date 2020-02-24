
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import PulldownMixin from '../base/pulldown_mixin'
import OrdersMixin from '../base/orders_mixin'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { StatusLabel, DeliveryStatusLabel } from '../../utils/constant'


const PageObject = mergePages({}, BaseMixin, PulldownMixin, OrdersMixin, {

  data: {
    reqData: {
      page: 1,
      pagesize: 10,
      user_id: null
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
    orderid: null
  }

})

Page(PageObject)