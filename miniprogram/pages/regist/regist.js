
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import { asyncLogin } from '../../utils/async_tools/async_login'
import { asyncChecksession } from '../../utils/async_tools/async_checksession'
import { callAsync } from '../../utils/async_tools/async_tools'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'
import { wxRequest } from '../../utils/async_http'
import BaseMixin from '../base/base'
import { $wuxDialog } from '../../components/wux-weapp/index'

const PageObject = mergePages({}, BaseMixin, {

  data: {
    nextpage: null,
    sessionKey: null
  },

  onInited: async function (options) {
    const nextpage = wx.getStorageSync('nextpage_registed')
    if (nextpage) {
      this.setData({
        nextpage: nextpage
      })
    }
    // await this.wxLogin()
  },
  async cloudRegist(data, sessionKey) {
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "registAPI.regist",
          encryptData: data,
          sessionKey: sessionKey
        }
      )
    } catch (e) {

      console.error(e)
      this.showToast({
        title: e.message
      })

      return
    }

    wx.setStorageSync('sessionid', res.result.data.openid)
    if (res.result.status) {
      if (this.data.nextpage) {
        wx.removeStorageSync('nextpage_registed')
      }
      wx.switchTab({
        url: this.data.nextpage || res.result.data.nextpage,
      })
    }
  },
  async registByCloudID(cloudId) {
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "registAPI.registByCloudID",
          weRunData: cloudId,
        }
      )
    } catch (e) {

      console.error('registByCloudID error: ', e)
      this.showToast({
        title: 'system_error'
      })

      return
    }
    
    wx.setStorageSync('sessionid', res.result.data.openid)
    if (res.result.status) {
      if (this.data.nextpage) {
        wx.removeStorageSync('nextpage_registed')
      }
      wx.switchTab({
        url: this.data.nextpage || res.result.data.nextpage,
      })
    }
  },
  async wxLogin() {
    let result = await callAsync(asyncLogin)
    console.log('asyncLogin-status:', result[0])
    console.log('asyncLogin-result:', result[1])
    if (result[0]) {
      this.showToast({
        title: result.message
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.data.settings.app_id}&secret=${this.data.settings.app_secret}&js_code=${result[1].code}&grant_type=authorization_code`
    console.log('url:', url)
    result = await wxRequest(url, { method: 'GET' })
    console.log('jscode2session-result:', result)
    if (result.errMsg != 'request:ok') {
      this.showToast({
        title: result.errMsg
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }
    this.setData({
      sessionKey: result.data.session_key
    })
  },
  onGetPhoneNumber: async function (e) {
    // if(!this.data.sessionKey) {
    //   this.showToast({
    //     title: '未能获取到sessionKey'
    //   })
    //   return
    // }
    console.log('onGetPhoneNumber:', e)
    // await this.cloudRegist(JSON.stringify({
    //   iv: e.detail.iv,
    //   encryptedData: e.detail.encryptedData
    // }), this.data.sessionKey)
    this.showLoading()
    try {
      await this.registByCloudID(wx.cloud.CloudID(e.detail.cloudID))
    } catch(e) {
      logger.error(e)
    }
    this.hideLoading()
  }
})

Page(PageObject)