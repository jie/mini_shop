import regeneratorRuntime from './regenerator-runtime/runtime'
import settings from '../settings/index'
const toastDuration = 3000
const CallCloudFuncAPI = async (name, data, config = {}) => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
      data: data,
      config: config,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  return promiseResult
}

export {
  CallCloudFuncAPI
}