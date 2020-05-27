import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import PulldownMixin from '../base/pulldown_mixin'
import OrdersMixin from '../base/orders_mixin'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
const moment = require('../../utils/moment.min.js')
import {
  CallCloudFuncAPI
} from '../../utils/async_cloudfunc'

const PageObject = mergePages({}, BaseMixin, BuycartMixin, {
  data: {
    navbarData: {
      showCapsule: 1,
      title: "拼团",
      isPage: true
    },
    itemWidth: '',
    paddingWidth: '',
    entity: null,
    entity_id: null,
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
  getEntity: async function() {
    let result = null
    try {
      result = await CallCloudFuncAPI('main', {
        apiName: 'grouponAPI.getGroupons',
        goods_id: this.data.entity_id
      })
    } catch (e) {
      console.error(e)
      this.showToast({
        title: e.message
      })
      return
    }

    if (result.result.status !== true) {
      this.showToast({
        title: result.result.message
      })
      return
    }
    let entity = result.result.data.entities[0]
    let goods = []
    entity.goods.map((item, index) => {
      item.display_price = item.display_price.toFixed(2)
      goods.push(item)
    })
    this.setData({
      entity: entity
    })
    console.log('entity:', this.data.entity)
  },
  onInited: function (options) {
    let paddingWidth = 15;
    this.setData({
      entity_id: options.entity_id,
      itemWidth: this.data.systemInfo.windowWidth - paddingWidth * 2,
      paddingWidth: paddingWidth
    })
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: async function () {
    this.showLoading()
    await this.getEntity()
    this.hideLoading()
  },
  ontapAddEntity(e) {
    let index = e.currentTarget.dataset.index
    this.addGoodsToCart(this.data.entity.goods[index])
  },
})


Page(PageObject)