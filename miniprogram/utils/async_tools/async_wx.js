import regeneratorRuntime from '../regenerator-runtime/runtime'

const asyncCallFunc = async (funcName, configs) => {
  let func = wx[funcName]
  let promiseResult = await new Promise((resolve, reject) => {
    func({
      ...configs,
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
  asyncCallFunc
}