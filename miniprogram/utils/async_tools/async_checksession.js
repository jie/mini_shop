import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import settings from '../../settings/index'

const asyncChecksession = async () => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.checkSession({
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

export {
  asyncChecksession
}