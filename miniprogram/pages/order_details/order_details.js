
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import PulldownMixin from '../base/pulldown_mixin'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { StatusLabel } from '../../utils/constant'


const PageObject = mergePages({}, BaseMixin, PulldownMixin, {

  data: {
    reqData: {
      page: 1,
      pagesize: 10
    },
    entityIdField: '_id',
    apiName: "orderAPI.getOrders",
    isCloudFunc: true,
    statuses: StatusLabel,
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
  },
  formatEntities(data) {
    console.log(data)
    for (let entity of data.entities) {
      entity.create_at = moment(entity.create_at).format('YYYY/MM/DD HH:mm')
      if (entity.type == 'deposit') {
        entity.title = '购买充值卡'
      } else if (entity.type == 'pay') {
        entity.title = this.getGoodsName(entity.orderInfo)
      }
    }
    return data
  },
  getGoodsName(orderInfo) {
    let goodsName = '';
    orderInfo.entities.map((item, index) => {
      if (index === 0) {
        goodsName += item.name
      } else if (index > 0 && index < 3) {
        goodsName += '、' + item.name
      } else if (index == 3) {
        if (orderInfo.entities.length > 3) {
          goodsName += '等'
        }
      }
    })
    return goodsName
  }

})

Page(PageObject)