import regeneratorRuntime from './regenerator-runtime/runtime'
import settings from '../settings/index'
const ERR_DURATION = 3000
const UploadAPI = async (apiName, params = {}, withSession = true) => {
  let data = params.data || {}
  let method = params.method || 'POST'

  if (params.hideLoading === false) {
    wx.showLoading({
      title: 'Loading',
    })
  }
  let header = {}
  if (withSession) {
    let sessionData = wx.getStorageSync('sessionData')
    header.sessionid = sessionData.sessionid
  }

  let url;
  if (apiName.includes('http')) {
    url = apiName
  } else {
    url = `${settings.server_addr}${settings.apis[apiName].addr}`
  }

  let ReqData = {
    url: url,
    formData: data,
    header: header,
    name: params.fieldName || 'file',
    filePath: params.filePath
  }
  if (params.header) {
    ReqData.header = params.header
  }
  console.log('reqData:', ReqData)
  let promiseResult = await new Promise((resolve, reject) => {
    wx.uploadFile({
      ...ReqData,
      success: (res) => {
        console.log('==== success ====')
        console.log(url)
        console.log(res)
        if (res && res.data && res.statusCode == 200 ) {
          console.log('res:', res)
          let respData = JSON.parse(res.data)
          resolve(respData)
        } else {
          wx.showToast({
            title: 'System Error',
            duration: ERR_DURATION
          })
          reject(res)
        }
      },
      fail: (err) => {
        console.log('==== err ====')
        console.log(url)
        console.log(err)
        wx.showToast({
          title: err.errMsg,
          duration: ERR_DURATION
        })
        reject(err)
      },
      complete: (e) => {
        wx.hideLoading()
      }
    })
  })
  return promiseResult
}

export {
  UploadAPI
}