const fs = require('fs')
const axios = require('axios').default;
const request = require('request')

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


async function getUploadUrl(accessToken, env, path) {
  let result = await dbHttpReq(`https://api.weixin.qq.com/tcb/uploadfile?access_token=${accessToken}`, {
    path: path,
    env: env
  })
  if (!result.status) {
    return result
  }
  return {
    status: true,
    data: result.data.data,
    code: 1
  }
}

function getFilename(file_path) {
  var splited = file_path.split('/')
  return splited[splited.length - 1]
}



function uploadByRequest(params, data) {
  return new Promise((resolve, reject) => {
    request.post(params, (err, response, body) => {
      if (err) {
        console.log("[FAIL]上传文件到微信云时发生错误")
        reject(err)
      } else {
        resolve(response)
      }
    });
  })
}

async function cloudUploadFile(accessToken, file_path, env, path) {
  var result = await getUploadUrl(accessToken, env, path)
  if (!result.status) {
    return result
  }

  const params = {
    method: 'POST',
    uri: result.data.url,
    header: {
      'content-type': 'multipart/form-data'
    },
    formData: {
      key: path,
      Signature: result.data.authorization,
      'x-cos-security-token': result.data.token,
      'x-cos-meta-fileid': result.data.cos_file_id,
      file: fs.createReadStream(file_path)
    },
    json: true // Automatically stringifies the body to JSON
  }

  await uploadByRequest(params)
  return {
    status: true,
    data: {
      url: result.data.file_id
    }
  }
}

module.exports = {
  dbHttpReq: dbHttpReq,
  getAccessToken: getAccessToken,
  createCollections: createCollections,
  addRecords: addRecords,
  getUploadUrl: getUploadUrl,
  cloudUploadFile: cloudUploadFile
}