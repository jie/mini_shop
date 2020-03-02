const settings = require('./cloud_settings.json')
const db = require('./db')
const notification = require('./notification')
const wechat_token = require('./wechat_token')
// const constant = require('./constant')
const cloud = require('wx-server-sdk')
cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:', event)
  console.log(context)
  const wxContext = cloud.getWXContext()
  if(event.Type != 'Timer') {
      return {
        status: false,
        message: 'task_required'
      }
  }
  
  let user = await getUser(wxContext.OPENID)
  switch (event.TriggerName) {
    case 'wechat_token.updateWechatAccessToken':
      await wechat_token.updateWechatAccessToken(event, wxContext)
    case 'notification.sendNotification':
      await notification.sendNotification(event, wxContext)
    default:
      return {
        status: false,
        message: 'task_not_found'
      }
  }
}