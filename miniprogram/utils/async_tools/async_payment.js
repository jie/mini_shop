import regeneratorRuntime from '../regenerator-runtime/runtime'

const asyncPayment = async (params) => {
  let paymentResult = await new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        console.log(res)
        resolve(res)
      },
      fail: (res) => {
        console.error(res)
        reject(res)
      }
    })
  })
  return paymentResult
}

export {
  asyncPayment
}