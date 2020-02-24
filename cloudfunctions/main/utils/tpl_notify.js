const axios = require('axios');
const db = require('../db');
const sendTemplateMsg = async (msgid, msgData, openid, formid, page) => {

  let tokenResult = null
  try {
    tokenResult = await db.collection('wechat_token').doc(settings.wechat_access_token_record_id).get()
    if(!tokenResult || tokenResult.errMsg != 'document.get.ok' ) {
      return
    }
  } catch(e) {
    return {
      status: false,
      data: 'fail_to_get_token'
    }
  }
  let result = null
  console.log('tokenResult:', tokenResult)
  try {
    result = await axios.post('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + tokenResult.data.token,
      {
        touser: openid,
        template_id: msgid,
        page: page,
        form_id: formid,
        data: msgData
      })
  } catch(e) {
    console.error(e)
  }

  if(!result || !result.data) {
    return {
      status: false,
      data: result
    }
  } else {
    return {
      status: true,
      data: result
    }
  }

}

module.exports = {
  sendTemplateMsg: sendTemplateMsg
}
