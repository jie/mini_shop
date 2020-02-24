
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'

const PageObject = mergePages({}, BaseMixin, {
  data: {
    total: 0
  },
  onInited(options) {
    let push_token_total = wx.getStorageSync('push_token_total')
    if(!push_token_total) {
      this.setData({
        total: 0
      })
    } else {
      this.setData({
        total: parseInt(push_token_total)
      })
    }
  },
  async submitForm(e) {
    console.log(e)
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.increasePushToken",
          token: e.detail.formId
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
      this.setData({
        total: res.result.data.total
      })
      wx.setStorageSync('push_token_total', res.result.data.total)
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
    }

  }
})

Page(PageObject)