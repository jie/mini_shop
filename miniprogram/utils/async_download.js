import regeneratorRuntime from './regenerator-runtime/runtime'
import settings from '../settings/index'
import { $wuxToast } from '../dist/index'
const toastDuration = 3000
const DownloadAPI = async (url, params = {}) => {
  let data = params.data || {}
  let method = params.method || 'POST'

  if (params.hideLoading === false) {
    wx.showLoading({
      title: 'Loading',
    })
  }

  let promiseResult = await new Promise((resolve, reject) => {
    wx.downloadFile({
      url: url,
      success: (res) => {
        if (res && res.statusCode == 200) {
          console.log(res)
          if (res.errMsg == 'downloadFile:ok') {
            console.log('res.msg:', res.errMsg)
            resolve(res)
          } else {
            $wuxToast().show({
              type: 'default',
              duration: toastDuration,
              color: '#fff',
              icon: 'ios-information-circle-outline',
              text: `${res.data.message || '出现未知错误，请联系管理员'}`
            })
            reject(res.errMsg)
          }
        } else {
          $wuxToast().show({
            type: 'default',
            duration: toastDuration,
            color: '#fff',
            icon: 'ios-information-circle-outline',
            text: `${res.errMsg || '出现未知错误，请联系管理员'}`
          })
          reject(res)
        }
      },
      fail: (err) => {
        console.log('==== err ====')
        $wuxToast().show({
          type: 'default',
          duration: toastDuration,
          color: '#fff',
          icon: 'ios-information-circle-outline',
          text: `${err.errMsg || '出现未知错误，请联系管理员'}`
        })

        reject(err)
      }
    })
  })
  return promiseResult
}

export {
  DownloadAPI
}