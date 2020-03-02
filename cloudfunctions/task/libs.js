const settings = require('./cloud_settings.json')


// 下发订阅消息
const subscribeMsgSend = async (miniprogram_state, lang) => {

  let notificationsResult = null
  try {
    notificationsResult = await db.collection('notification').where({
      "status": false
    }).limit(10).get()
  } catch (e) {
    console.error(e)
    return
  }

  if (!notificationsResult || notificationsResult.errMsg != 'document.get.ok') {
    console.log('fail to get notification:', notificationsResult.errMsg)
    return
  }

  let tokenResult = null
  try {
    tokenResult = await db.collection('wechat_token').where({
      slug: "access_token"
    }).limit(1).get()
    if (!tokenResult || tokenResult.errMsg != 'document.get.ok') {
      return
    }
  } catch (e) {
    console.log('fail to get wechat access_token:', tokenResult.errMsg)
    return
  }

  notificationsResult.data.map((item) => {
    // sendNotification(tokenResult.data.token, item)
    
    item.openids.map((openid) => {
      var result = null;
      try {
        result = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${tokenResult.data.token}`, {
          touser: openid,
          template_id: item.templateId,
          page: item.page,
          form_id: item.formid,
          data: item.msgData,
          miniprogram_state: item.miniprogram_state,
          lang: item.lang || "zh_CN"
        })
      } catch (e) {
        console.error(e)
        return
      }
      if (!result || result.errCode !== 0) {
        console.log('fail to send subscribe msg:', result.errMsg)
      }

    })
  })
}


module.exports = {
  subscribeMsgSend: subscribeMsgSend
}