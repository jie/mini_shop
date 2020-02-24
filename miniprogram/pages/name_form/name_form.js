
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'


const PageObject = mergePages({}, BaseMixin, {
  data: {
    userInfo: null
  },
  onInited(options) {
    this.getProfile()
  },
  async getProfile() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "getProfile"
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
      userInfo: res.result.data.user
    })
  },
  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "userAPI.updateUserName",
          nickName: this.data.userInfo.nickName,
          realName: this.data.userInfo.realName
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
  bindInputRealName(e) {
    this.setData({
      'userInfo.realName': e.detail.value
    })
  },
  bindInputNickName(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
  }
})

Page(PageObject)