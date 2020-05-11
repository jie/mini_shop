import regeneratorRuntime from '../regenerator-runtime/runtime'
// import settings from '../settings/index'
const cloudUploadAPI = async (cloudPath, filePath, config = {}) => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      success: res => {
        // get resource ID
        // console.log(res.fileID)
        resolve(res)
      },
      fail: err => {
        console.log('upload_error:', err)
        reject(err)
      }
    })
  })
  return promiseResult
}

export {
  cloudUploadAPI
}