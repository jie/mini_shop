const cloud = require('wx-server-sdk')
const db = require('./db')
const axios = require('axios');
const settings = require('./cloud_settings.json')
const tpl_notify = require('./utils/tpl_notify')
const moment = require('moment')
const APPID = settings.app_id;
const APPSECRET = settings.app_secret;
const COLLNAME = 'wechat_token';
const FIELDNAME = settings.wechat_access_token_record_id


const sendNotification = async (event, context) => {
  let result = null
  try {
    result = await db.collection('admin').where({ is_enable: true }).get()
    console.log('result: ', result)
    if (!result || result.errMsg !== 'collection.get:ok') {
      console.log(result)
    }
  } catch (e) {
    console.error(e)
  }

  let admins = []
  for (let item of result.data) {
    admins.push({
      name: item.name,
      openid: item.user_id
    })
  }
  console.log('admins:', admins)
  let orderResult = null
  try {
    orderResult = await db.collection('order').where({
      is_enable: true, is_admin_notified: false
    }).get()
    console.log('orderResult:', orderResult)
    if (!orderResult || orderResult.errMsg !== 'collection.get:ok') {
      console.log(orderResult)
    }
  } catch (e) {
    console.error(e)
  }

  let orders = []
  for (let item of orderResult.data) {
    orders.push(item)
  }
  console.log('orders:', orders)
  let sendResult = null
  for (let admin of admins) {
    for (let order of orders) {
      var msgid;
      var msgData = null;
      if (order.type == 'despit') {
        msgid = settings.depositMsgId
        msgData = getDepositMsgData(order)
      } else if (order.type == 'pay') {
        msgid = settings.payMsgId
        msgData = getPayMsgData(order)
      }
      if (msgid && msgData) {
        try {
          var tokenResult = await db.collection('admin_push_token').where({ user_id: admin.user_id }).orderBy('create_at', 'asc').limit(1).get();
          console.log('tokenResult:', tokenResult)
          if (tokenResult && tokenResult.errCode == 'collection.get.ok' && tokenResult.data.length !== 0) {
            sendResult = await sendTemplateMsg(tokenResult[0], msgid, msgData, admin.user_id, tokenResult.data[0].token, `pages/user_orders/user_orders?user_id=${order.openid}`)
            console.log('sendResult:', sendResult)
          }

        } catch (e) {
          console.error(e)
        }

      }

    }
  }

  console.log('start update orders')
  let updateResult = null
  let orderIds = []
  for (let item of orders) {
    orderIds.push(item._id)
  }
  console.log('orderIds:', orderIds)
  if (orderIds.length !== 0) {
    try {
      updateResult = await db.collection('order').where({ _id: db.command.in(orderIds) }).update({
        data: {
          is_admin_notified: true
        }
      })
      db.collection('todos').where({
        done: false
      }).update({
          data: {
            progress: _.inc(10)
          },
        })
      console.log('updateResult:', updateResult)
      if (!updateResult || updateResult.errMsg !== 'collection.update:ok') {
        console.log(updateResult)
      }
    } catch (e) {
      console.error(e)
    }
  }

}

module.exports = {
  sendNotification: sendNotification
}
