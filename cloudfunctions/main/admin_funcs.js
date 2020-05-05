const cloud = require('wx-server-sdk')
const db = require('./db')
const constant = require('./constant')
const moment = require('moment')
const funcs = require('./utils/funcs')

const _ = db.command

async function getOrder(orderId) {
  let order = await db.collection('order').doc(orderId).get()
  console.log('order:', order)
  if (order && order.errMsg == 'document.get:ok' && order.data && order.data.is_enable) {
    return order
  }
}


// 搜索用户
const getUsers = async (event, wxContext, user) => {
  console.log(user)
  let result = null
  let page = event.page || 1;
  page = parseInt(page)
  let page_size = event.page_size || 20;
  page_size = parseInt(page_size)
  let skip = (page - 1) * page_size
  try {
    if (event.search_text) {
      result = await db.collection('user').orderBy('create_at', 'desc').where(_.or([{
        _id: _.eq(event.search_text)
      }, {
        nickName: _.eq(event.search_text)
      }, {
        realName: _.eq(event.search_text)
      }, {
        mobile_phone: _.eq(event.search_text)
      }])).where({
        is_enable: true
      }).skip(skip).limit(page_size).get()
    } else {
      result = await db.collection('user').orderBy('update_at', 'desc').where({
        is_enable: true
      }).skip(skip).limit(page_size).get()
    }

    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'get_users_error'
    }
  }
  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data,
      page: page,
      page_size: page_size
    }
  }
}


// 搜索用户
const getUserOrders = async (event, wxContext, user) => {
  console.log(user)
  console.log('event:', event)
  let result = null
  try {
    if (event.user_id) {
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        openid: event.user_id,
        is_enable: true
      }).get()
    } else if (event.orderid) {
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        is_enable: true,
        _id: event.orderid
      }).get()
    } else if (event.start_at && !event.start_at) {
      var start_at = moment(event.start_at).toDate()
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        is_enable: true,
        create_at: _.gte(start_at)
      }).get()
    } else if (event.end_at && !event.end_at) {
      var end_at = moment(event.end_at).toDate()
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        is_enable: true,
        create_at: _.lte(end_at)
      }).get()
    } else if (event.start_at && event.end_at) {
      var start_at = moment(event.start_at).toDate()
      var end_at = moment(event.end_at).toDate()
      console.log('start', start_at)
      console.log('end', end_at)
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        is_enable: true,
        create_at: _.and(_.gte(start_at), _.lt(end_at))
      }).get()
    } else {
      result = await db.collection('order').orderBy('create_at', 'desc').where({
        is_enable: true
      }).get()
    }

    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'get_user_orders_error'
    }
  }
  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }
}


// 是否是管理员
const getIsAdmin = async (event, wxContext, user) => {
  let admin = await db.collection('admin').doc(user._id)
  if (admin && admin.errMsg == 'document.get:ok' && admin.data) {
    return {
      status: true,
      message: 'ok',
      data: {
        entity: admin.data
      }
    }
  } else {
    return {
      status: false,
      message: 'not_admin'
    }
  }
}


// 修改订单地址
const updateOrderAddress = async (event, wxContext, user) => {
  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if (!event.addressInfo.cityName || !event.addressInfo.detailInfo || !event.addressInfo.provinceName || !event.addressInfo.telNumber || !event.addressInfo.userName) {
    return {
      status: false,
      message: 'addressInfo_detail_error'
    }
  }

  let updateResult = null
  try {
    updateResult = await db.collection('order').doc(event.orderId).update({
      data: {
        addressInfo: event.addressInfo,
        admin_update_at: new Date()
      }
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_update'
      }
    }
  } catch (e) {
    console.error(e)
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}


// 修改订单状态
const updateOrderStatus = async (event, wxContext, user) => {

  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if (!constant.PayStatus[event.status]) {
    return {
      status: false,
      message: 'pay_status_error'
    }
  }


  let updateResult = null
  try {
    updateResult = await db.collection('order').doc(event.orderId).update({
      data: {
        status: event.status,
        admin_update_at: new Date()
      }
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_update_order_status'
      }
    }
  } catch (e) {
    console.error(e)
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }

}

// 修改发货状态
const updateDeliveryStatus = async (event, wxContext, user) => {

  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if (!constant.DeliveryStatus[event.status]) {
    return {
      status: false,
      message: 'delivery_status_error'
    }
  }

  let updateResult = null
  try {
    let updateData = {
      delivery_status: event.status,
      admin_update_at: new Date()
    }

    if (event.status == 'shipping' || event.status == 'delivering') {
      updateData.deliveryInfo = event.deliveryInfo
    }

    updateResult = await db.collection('order').doc(event.orderId).update({
      data: updateData
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_update_delivery_status'
      }
    }
  } catch (e) {
    console.error(e)
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }
}

// 修改订单金额
const updateOrderTotal = async (event, wxContext, user) => {

  if (!event.total) {
    return {
      status: false,
      message: 'total_required'
    }
  }

  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  let order = result.data;
  console.log('user:', user)
  let total = parseFloat(event.total)
  console.log('total:', total)
  let order_total = parseFloat(order.orderInfo.total)
  console.log('order_total:', order_total)
  let balance = parseFloat(user.balance)
  let difference = total - order_total

  if ((balance + difference) < 0) {
    return {
      status: false,
      message: 'update_order_total_error'
    }
  }

  let updateLogs = order.updateLogs || []
  updateLogs.push({
    total: total,
    order_total: order_total,
    balance: user.balance,
    user_id: user._id,
    create_at: new Date()
  })

  let orderInfo = order.orderInfo
  orderInfo.total = total

  let updateResult = null
  try {
    let updateData = {
      admin_update_at: new Date(),
      updateLogs: updateLogs,
      amount: total,
      orderInfo: orderInfo
    }

    updateResult = await db.collection('order').doc(event.orderId).update({
      data: updateData
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_update_total'
      }
    }
  } catch (e) {
    console.error(e)
  }

  let updateBalanceResult = null
  console.log('difference:', difference)
  try {
    updateBalanceResult = await db.collection('user').doc(order.openid).update({
      data: {
        balance: db.command.inc(-difference),
        update_at: new Date(),
        update_by: user._id
      }
    })
    console.log('updateBalanceResult:', updateBalanceResult)
  } catch (e) {
    console.error(e)
  }
  if (!updateBalanceResult || updateBalanceResult.errMsg !== 'document.update:ok') {
    return {
      status: false,
      message: 'update_balance_error_when_update_total'
    }
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }


}

// 修改订单备注
const updateOrderRemarks = async (event, wxContext, user) => {

  if (!event.remarks && !event.admin_remarks) {
    return {
      status: false,
      message: 'remarks_required'
    }
  }

  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  let updateResult = null
  try {

    updateResult = await db.collection('order').doc(event.orderId).update({
      data: {
        admin_remarks: event.admin_remarks,
        remarks: event.remarks,
        admin_update_at: new Date()
      }
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_update_delivery_status'
      }
    }
  } catch (e) {
    console.error(e)
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }

}



// 取消订单
const cancelOrder = async (event, wxContext, user) => {

  let result = null
  try {
    result = await getOrder(event.orderId)
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result || !result.data) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  let order = result.data;

  let updateResult = null
  try {
    let updateData = {
      is_cancel: true,
      admin_update_at: new Date()
    }

    if (event.refund_amount) {
      status: 'refund'
    }
    if (parseFloat(event.refund_amount) > parseFloat(order.total)) {
      return {
        status: false,
        message: 'refund_amount_error'
      }
    }

    updateData.refund_amount = event.refund_amount

    updateResult = await db.collection('order').doc(event.orderId).update({
      data: updateData
    })
    if (updateResult.stats && updateResult.stats.updated !== 1) {
      return {
        status: false,
        message: 'order_not_found_when_cancel'
      }
    }
  } catch (e) {
    console.error(e)
  }


  if (event.refund_amount) {
    let updateUserResult = null
    try {
      updateUserResult = await db.collection('user').doc(order.openid).update({
        data: {
          balance: db.command.inc(parseFloat(event.refund_amount))
        }
      })
      console.log('updateUserResult:', updateUserResult)
    } catch (e) {
      console.error(e)
    }
    if (!updateUserResult || updateUserResult.errMsg !== 'document.update:ok') {
      return {
        status: false,
        message: 'update_balance_error_when_cancel_order'
      }
    }
  }

  result = await getOrder(event.orderId)

  return {
    status: true,
    message: 'ok',
    data: {
      entities: result.data
    }
  }
}

// 接单
const acceptOrder = async (event, wxContext, user, admin) => {

  let result = null;
  try {
    result = await db.collection('order').doc(event.orderId).get()
  } catch (e) {
    console.error(e)
    return
  }

  if (!result || result.errMsg != 'collection.get:ok' || !result.data) {
    return {
      status: false,
      message: 'fail_get_order'
    }
  }

  let order = result.data

  let buyResult = null
  try {
    buyResult = await db.collection('user').doc(order.openid).update({
      data: {
        balance: db.command.inc(-parseInt(order.orderInfo.total)),
        update_at: new Date()
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
    payResult = await db.collection('order').doc(event.orderId).update({
      data: {
        status: constant.PayStatus.pay,
        update: new Date(),
        accept_by: admin._id
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

  if (result.stats && result.stats.updated !== 1) {
    return {
      status: false,
      message: 'order_not_found_when_accept'
    }
  }

  try {
    let goodsName = funcs.getOrderSummary(order)
    await Notification.paySuccessNotification([{
      openid: order.openid
    }], goodsName, order.orderInfo.total, "支付成功，商户已接单")
  } catch (e) {
    console.error(e)
  }

  return {
    status: true,
    message: 'ok',
    data: {
      orderNo: orderNo,
    }
  }
}


const getSubscribeMessageTpls = async (event, wxContext, user, admin) => {
  let result = null;
  let templates = [];
  try {
    result = await db.collection('templateMsg').get()
  } catch (e) {
    console.error(e)
    return
  }

  if (!result || result.errMsg != 'collection.get:ok') {
    return {
      status: false,
      message: 'fail_message_tpls'
    }
  }

  if(result.data) {
    result.data.map((item) => {
      if(item.type.includes('admin')) {
        templates.push(item)
      }
    })
  }

  return {
    status: true,
    message: 'ok',
    data: {
      templates: templates,
    }
  }
}

module.exports = {
  getUsers: getUsers,
  getUserOrders: getUserOrders,
  updateOrderAddress: updateOrderAddress,
  updateOrderStatus: updateOrderStatus,
  updateDeliveryStatus: updateDeliveryStatus,
  updateOrderTotal: updateOrderTotal,
  updateOrderRemarks: updateOrderRemarks,
  cancelOrder: cancelOrder,
  acceptOrder: acceptOrder,
  getSubscribeMessageTpls: getSubscribeMessageTpls
}