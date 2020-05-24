import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import PulldownMixin from '../base/pulldown_mixin'
import OrdersMixin from '../base/orders_mixin'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
const moment = require('../../utils/moment.min.js')
import {
  CallCloudFuncAPI
} from '../../utils/async_cloudfunc'

const PageObject = mergePages({}, BaseMixin, PulldownMixin, {
  data: {
    navbarData: {
      showCapsule: 1,
      title: "拼团",
      isPage: false
    },
    reqData: {
      page: 1,
      pagesize: 10
    },
    entityIdField: '_id',
    apiModule: 'main',
    apiName: "grouponAPI.getGroupons",
    isCloudFunc: true,
    itemWidth: null,
    orders: [{
      goods: [{
        name: "经典全麦吐司",
        count: 1,
        cover: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
      },
      {
        name: "南瓜吐司",
        count: 2,
        cover: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
      }],
      create_at: "2020-05-02 11:12:11",
      name: "Jun",
      avatar: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
    },
    {
      goods: [{
        name: "经典全麦吐司",
        count: 1,
        cover: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
      },{
        name: "南瓜吐司",
        count: 2,
        cover: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
      }],
      create_at: "2020-05-02 11:23:01",
      name: "小龙虾经典全麦吐司",
      avatar: "cloud://testenv-am2lh.7465-testenv-am2lh-1259778713/goods/202005151030334964901740.jpg"
    }]
  },

  onInited: function (options) {
    let paddingWidth = 15;
    let orders = []

    this.data.orders.map((item) => {
      item.goodsName = this.joinString(item.goods, 'name')
      orders.push(item)
    })

    this.setData({
      itemWidth: this.data.systemInfo.windowWidth - paddingWidth * 2,
      paddingWidth: paddingWidth,
      orders: orders
    })
    wx.startPullDownRefresh()
  },
  onFinishedPageRequest() {
    let now = moment()
    let entities = []
    this.data.entities.map((item) => {
      if(now < moment(item.groupon_start_at)) {
        item.grouponStatus = '未开始'
      }
      if(now > moment(item.groupon_end_at)) {
        item.grouponStatus = '已结束'
      }
      entities.push(item)
    })
    this.setData({
      entities: entities
    })
  },
  onShareAppMessage() {
    return {
      title: '',
      path: 'page/component/pages/button/button'
    }
  },

})


Page(PageObject)