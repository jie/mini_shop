import regeneratorRuntime from '../utils/regenerator-runtime/runtime.js'
import {
  wxRequest
} from '../utils/async_http.js'
// import { wxUpload } from '../utils/upload.js'
import settings from '../settings/index'
import moment from '../utils/moment.min.js'


const ApiRequest = async function(apiName, data, withSession=true) {
  console.log(`${apiName}-req: `, data)
  let res;
  let url;
  if (apiName.includes('http')) {
    url = apiName
  } else {
    url = `${settings.config.server_addr}${settings.config.apis[apiName].addr}`
  }
  res = await wxRequest(url, {data: data})
  return res
}

export {
  ApiRequest
}