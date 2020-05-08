import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import settings from '../../settings/index'

const asyncSubscribeMsg = async (tplIds) => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: tplIds,
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
  asyncSubscribeMsg
}