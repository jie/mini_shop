
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import PulldownMixin from '../base/pulldown_mixin'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'
import { StatusLabel, DeliveryStatusLabel } from '../../utils/constant'


export default {

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
    orderid: null,
    admin: null
  },
  onShow() {
    let admin = wx.getStorageSync('admin')
    if(admin && admin.id) {
      this.setData({
        admin: admin
      })
    } else {
      this.setData({
        admin: null
      })
    }
  },
  onInited(options) {
    if (!options.user_id) {
      return
    }
    this.setData({
      'reqData.user_id': options.user_id
    })
    console.log('user_id:', this.data.user_id)
    wx.startPullDownRefresh()
  },
  getEntitiesApiUrl() {
    return "main"
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
  },
  onControlOrder(e) {
    console.log(e)
    this.setData({
      orderid: e.currentTarget.dataset.orderid
    })
    let that = this;
    wx.showActionSheet({
      itemList: ['设置订单地址', '设置订单状态', '设置发货状态', '调整订单金额', '设置订单备注', '取消订单'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: `/pages/update_address/update_address?orderid=${that.data.orderid}`,
          })
        }

        if (res.tapIndex === 1) {
          wx.navigateTo({
            url: `/pages/update_order/update_order?orderid=${that.data.orderid}`,
          })
        }

        if (res.tapIndex === 2) {
          wx.navigateTo({
            url: `/pages/update_delivery/update_delivery?orderid=${that.data.orderid}`,
          })
        }

        if (res.tapIndex === 3) {
          wx.navigateTo({
            url: `/pages/update_total/update_total?orderid=${that.data.orderid}`,
          })
        }

        if (res.tapIndex === 4) {
          wx.navigateTo({
            url: `/pages/update_remarks/update_remarks?orderid=${that.data.orderid}`,
          })
        }

        if (res.tapIndex === 5) {
          wx.navigateTo({
            url: `/pages/cancel_order/cancel_order?orderid=${that.data.orderid}`,
          })
        }



      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }

}