import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import settings from '../../settings/index'

const wxSettings = async () => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.error(err)
        reject(err)
      }
    })
  })
  return promiseResult
}


const openSettings = async() => {
  let result = await new Promise((resovle, reject) => {
    wx.openSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.error(err)
        reject(err)
      }
    })
  })
  return result
}

export {
  wxSettings,
  openSettings
}