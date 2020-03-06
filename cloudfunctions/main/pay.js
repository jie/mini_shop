
const cloud = require('wx-server-sdk')
const db = require('./db')
const constant = require('./constant')
const shortid = require('./utils/shortid')
const notification = require('./notification')

function checkOrder(orderInfo) {
  // todo: add order verifiy function
  return true
}


function create_pay_orderid(length) {
  let s = shortid(length)
  return `P${s}`
}


const orderPay = async (event, wxContext, user) => {
  let orderInfo = event.orderInfo

  // 校验订单数据
  let checkResult = checkOrder(orderInfo)
  if (!checkResult) {
    return {
      status: false,
      message: 'order_info_error'
    }
  }

  // 校验用户余额
  console.log('user.balance:', user.balance)
  console.log('orderInfo.total:', orderInfo.total)
  let balance;
  if (user.balance !== undefined && user.balance !== null) {
    balance = user.balance
  }
  if (balance < parseFloat(orderInfo.total)) {
    return {
      status: false,
      message: 'user_balance_error'
    }
  }
  let orderNo = event.orderNo
  let balanceAfter = balance - parseFloat(orderInfo.total);
  if (!orderNo) {
    let orderNo = create_pay_orderid(5)
    let order = {
      orderNo: orderNo,
      orderInfo: orderInfo,
      create_at: new Date(),
      update_at: new Date(),
      is_enable: true,
      openid: user._id,
      userName: user.nickName,
      mobile_phone: user.mobile_phone,
      unionid: user.unionid,
      status: constant.PayStatus.submit,
      amount: orderInfo.total,
      type: constant.PayType.pay,
      balance: balance - parseFloat(orderInfo.total),
      is_admin_notified: false
    }

    let orderResult = null
    try {
      orderResult = await db.collection('order').add({
        data: order
      })
      console.log('orderResult:', orderResult)
    } catch (e) {
      console.error(e)
    }
    if (!orderResult) {
      return {
        status: false,
        message: 'create_order_error'
      }
    }

    let buyResult = null
    console.log('user:', user._id)
    try {
      buyResult = await db.collection('user').doc(user._id).update({
        data: {
          balance: db.command.inc(-parseFloat(orderInfo.total))
        }
      })
      console.log('buyResult:', buyResult)
    } catch (e) {
      console.error(e)
    }
    if (!buyResult) {
      return {
        status: false,
        message: 'update_balance_error'
      }
    }

    let payResult = null
    try {
      payResult = await db.collection('order').doc(orderResult._id).update({
        data: {
          status: constant.PayStatus.pay,
          update: new Date()
        }
      })
      console.log('payResult:', payResult)
    } catch (e) {
      console.error(e)
    }
    if (!payResult) {
      return {
        status: false,
        message: 'pay_order_error'
      }
    }
  } else {
    let orderResult = null
    try {
      orderResult = await db.collection('order').get({orderNo: orderNo}).limit(1).get()
      console.log('orderResult:', orderResult)
    } catch (e) {
      console.error(e)
    }
    if (!orderResult) {
      return {
        status: false,
        message: 'orderno_not_found'
      }
    }

    if (orderResult.status !== constant.PayStatus.submit) {
      return {
        status: false,
        message: 'submit_order_status_error'
      }
    }

    var admins = constant.currentAdministrators.map((item) => {
      return {'openid': item.user_id}
    })
    notification.newOrderNotification(admins, orderNo)
  }
  return {
    status: true,
    message: 'ok',
    data: {
      orderNo: orderNo,
    }
  }
}



module.exports = {
  orderPay: orderPay
}
