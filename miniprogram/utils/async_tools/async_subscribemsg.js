import regeneratorRuntime from '../regenerator-runtime/runtime'

const requestSubscribeMessage = async (tpls) => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: tpls,
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })

  })
  return promiseResult
}


export {
  requestSubscribeMessage
}