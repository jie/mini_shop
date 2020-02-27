// import axios from 'axios'
const axios = require('axios').default;

async function dbHttpReq(url, data, accessToken) {
  var reqUrl = url
  if (accessToken) {
    reqUrl = `${url}?access_token=${accessToken}`
  }
  let result = null
  try {
    result = await axios.post(reqUrl, data)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'requestError',
      code: -9999
    }
  } else {
    if (result.data.errmsg != 'ok') {
      return {
        status: false,
        message: result.data.errmsg,
        code: result.data.errcode
      }
    } else {
      return {
        status: true,
        data: result,
        code: 1
      }
    }

  }
}

async function createCollections(accessToken, collectionName, env) {
  let result = dbHttpReq('https://api.weixin.qq.com/tcb/databasecollectionadd', {
    collection_name: collectionName,
    env: env
  }, access_token = accessToken)
  return result
}

async function addRecords(accessToken, env, query) {
  let result = dbHttpReq('https://api.weixin.qq.com/tcb/databaseadd', {
    env: env,
    query: query
  }, access_token = accessToken)
  return result
}

async function getAccessToken(appid, appsecret) {
  let result = null
  try {
    result = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'requestError',
      code: -9999
    }
  } else {
    if (result.data.errmsg && result.data.errmsg != 'ok') {
      return {
        status: false,
        message: result.data.errmsg,
        code: result.data.errcode
      }
    } else {
      return {
        status: true,
        data: result,
        code: 1
      }
    }
  }
}

module.exports = {
  dbHttpReq: dbHttpReq,
  getAccessToken: getAccessToken,
  createCollections: createCollections,
  addRecords: addRecords
}