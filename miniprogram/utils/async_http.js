import regeneratorRuntime from './regenerator-runtime/runtime'
const toastDuration = 3000

const wxRequest = async (url, params = {}, withSession=true) => {
  let header = params.header || {
    'Content-Type': 'application/json',
    'dataType': 'json'
  }
  if(withSession) {
    let sessionData = wx.getStorageSync('sessionData')
    header.sessionid = sessionData.sessionid
  }
  let data = params.data || {}
  let method = params.method || 'POST'

  let promiseRes = await new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success(res) {
        console.log('wxrequest:', res)
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
  return promiseRes
}


export {
  wxRequest
}