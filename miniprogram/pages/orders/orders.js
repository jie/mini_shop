
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import PulldownMixin from '../base/pulldown_mixin'
import OrdersMixin from '../base/orders_mixin'
import mergePages from '../../utils/objectUtils'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'

const PageObject = mergePages({}, BaseMixin, PulldownMixin, OrdersMixin, {

  data: {
    reqData: {
      page: 1,
      pagesize: 10
    },
    entityIdField: '_id',
    apiName: "orderAPI.getOrders",
    isCloudFunc: true,
    itemFlags: {
      pay: '-',
      deposit: '+'
    }
  },
  onInited() {
    wx.startPullDownRefresh()
  },
  getEntitiesApiUrl() {
    return "main"
  },
  async getOrders() {
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "orderAPI.getOrders"
        }
      )
    } catch (e) {
      console.error(e)
      wx.stopPullDownRefresh()
      return
    }

    if (res) {
      console.log(res)
      this.setData({
        entities: res.result.data.entities
      })
    }
    wx.stopPullDownRefresh()
  }
})

Page(PageObject)