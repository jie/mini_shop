import settings from '../settings/index'
import { $wuxToast } from '../dist/index'
const toastDuration = 3000

export default function HttpAPI(options) {
  console.log(options)
  let addr = `${settings.server_addr}${settings.apis[options.addr].addr}`
  console.log(addr)
  let req = {
    url: addr,
    data: options.data,
    method: options.method || 'POST',
    dataType: options.dataType || 'json',
  }

  if (options.header) {
    req.header = options.header
  }

  let sessionData = wx.getStorageSync('sessionData')
  if (sessionData && sessionData.sessionid) {
    if (req.header) {
      req.header.sessionid = sessionData.sessionid
    } else {
      req.header = { 'sessionid': sessionData.sessionid }
    }
  }

  req.success = (res) => {
    if (res.statusCode == 200 && res.data.code > 0) {
      console.log(res)
      if (options.success) {
        options.success(res)
      } else {
        $wuxToast().show({
          type: 'success',
          duration: toastDuration,
          color: '#fff',
          text: 'OK'
        })
      }
    } else {
      console.error(res)
      if (options.fail) {
        req.fail = (res) => {
          options.fail(res)
        }
      } else {
        if(res.statusCode == 403 || res.statusCode == 401) {
          $wuxToast().show({
            type: 'default',
            duration: toastDuration,
            color: '#fff',
            icon: 'ios-information-circle-outline',
            text: '用户未登录，即将为您跳转登陆页面'
          })
          wx.clearStorageSync('sessionData')
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/profile/profile',
            })
          }, 3000)
        } else {
          $wuxToast().show({
            type: 'default',
            duration: toastDuration,
            color: '#fff',
            icon: 'ios-information-circle-outline',
            text: `${res.data.message || '出现未知错误，请联系管理员'}`
          })
        }
      }
    }
  }

  req.complete = (res) => {
    options.app.setData({
      showSpinner: false
    })
    if(options.complete) {
      options.complete(res)
    }
  }

  options.app.setData({
    showSpinner: true
  })
  wx.request(req)
}
