
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'

   
const PageObject = mergePages({}, BaseMixin, {
  data: {
    users: [],
    search_text: '',
    controlItems: [
      {
        id: 1,
        name: '调整余额'
      },
      {
        id: 2,
        name: '设置状态'
      }
    ]
  },
  onInited(options) {
  },
  async getUsers() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.getUsers",
          search_text: this.data.search_text
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
    console.log(res.result.data.entities)
    this.setData({
      users: res.result.data.entities
    })
  },
  bindInputSearchText(e) {
    this.setData({
      'search_text': e.detail.value
    })
  },
  goOrdes(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/user_orders/user_orders?user_id=${e.currentTarget.dataset.userid}`,
    })
  },
  showUserControls() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})

Page(PageObject)