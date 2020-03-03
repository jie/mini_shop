const settings = require('./cloud_settings.json')
const db = require('./db')
const notification = require('./notification')
const wechat_token = require('./wechat_token')
// const constant = require('./constant')
const cloud = require('wx-server-sdk')


// 云函数入口函数
exports.main = async (event, context) => {
  console.log('*************')
  console.log('event:', event)
  console.log('typeof:', typeof event)
  const wxContext = cloud.getWXContext()
  console.log('wxContent:', wxContext)
  switch (event.TriggerName) {
    case 'wechat_token.updateWechatAccessToken':
      await wechat_token.updateWechatAccessToken(event, wxContext)
    case 'notification.subscribeMsgSend':
      await notification.subscribeMsgSend(event, wxContext)
    default:
      return {
        status: false,
        message: 'task_not_found'
      }
  }
}