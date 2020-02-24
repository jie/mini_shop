import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import settings from '../../settings/index'
import { wxSettings, openSettings } from './async_settings'
import { callAsync } from './async_tools'

const wxChooseAddress = async () => {
  let promiseResult = await new Promise((resolve, reject) => {
    wx.chooseAddress({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
  return promiseResult
}


const getWxAddress = async () => {

  let [err, result] = await callAsync(wxSettings)
  if(err) {
    return [err, result]
  }

  if (result.authSetting['scope.address'] == false) {
    return await callAsync(wxSettings()) 
  }

  return await callAsync(wxChooseAddress)

}
export {
  wxChooseAddress,
  getWxAddress
}
