const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


const deliveryMethod = {
  takeaway: 'takeway',
  delivery: 'delivery',
  shipping: 'shipping'
}

const deliveryStatus = {
  // 快递接单
  accepted: 'accepted',
  // 商户下单
  created: 'created',
  // 快递送达
  deliveried: 'deliveried',
  // 用户确认
  received: 'received',

}

const getCourier = async (user) => {
  let result = null;
  try {
    result = await db.collection('courier').where({
      user_id: user._id,
      is_enable: true
    }).limit(1).get()
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'fail_to_get_courier'
    }
  }
  if (!result.data) {
    return {
      status: true,
      data: null
    }
  }

  return {
    status: true,
    data: result.data
  }

}


// 注册成为快递员
const regist = async (event, wxContext, user) => {
  console.log('user:', user)
  let courierResult = null
  try {
    courierResult = await getCourier(user)
  } catch (e) {
    console.error(e)
  }

  if (courierResult.status && courierResult.data) {
    return {
      status: false,
      message: 'courier_exists'
    }
  }

  let courier = {}
  courier.create_at = new Date()
  courier.update_at = new Date()
  courier.is_enable = true
  courier.user_id = user._id
  if (event.invite_by) {
    courier.invite_by = event.invite_by
    courier.is_verified = true
  } else {
    courier.is_verified = false
  }

  let result = null
  courier.id_no = event.courier.id_no
  courier.id_type = '1'
  courier.id_image_front = event.courier.id_image_front
  courier.id_image_back = event.courier.id_image_back
  courier.mobile_phone = event.courier.mobile_phone
  courier.name = event.courier.name
  try {
    result = await db.collection('courier').add({
      data: courier
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result) {
    return {
      status: false,
      message: 'fail_create_goods'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}

// 更新资料
const updateCourier = async (event, wxContext, user) => {
  let courierResult = null
  try {
    courierResult = await getCourier(user)
  } catch (e) {
    console.error(e)
  }

  if (!courierResult.status) {
    return courierResult
  }

  if (!courierResult.data) {
    return {
      status: false,
      message: 'courier_not_found'
    }
  }

  let courier = courierResult.data
  if (courier.is_verified) {
    return {
      status: false,
      message: 'courier_verified'
    }
  }

  courier.update_at = new Date()
  let _courier = Object.assign({}, courier, event.courier)
  let courier_id = courier._id
  let updateResult = null
  delete _courier._id
  try {
    updateResult = await db.collection('courier').doc(courier_id).set({
      data: _courier
    })
    console.log('updateResult:', updateResult)
  } catch (e) {
    console.error(e)
  }

  if (!updateResult) {
    return {
      status: false,
      message: 'fail_to_update_courier'
    }
  }
  return {
    status: true,
    data: updateResult
  }
}

// 获取外送单详情
const getDeliveryOrderDetail = async (event, wxContext, user) => {
  console.log('user:', user)
  if (!event.order_id) {
    return {
      status: false,
      message: 'order_id_required'
    }
  }

  let result;
  try {
    result = db.collection('order').doc(event.order_id).get()
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if(!result.data.courier_id || !result.data.courier_id != user._id) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if (!result.data.delivery_method || result.data.delivery_method != deliveryMethod.delivery) {
    return {
      status: false,
      message: 'delivery_method_error'
    }
  }

  return {
    orderInfo: result.data.orderInfo,
    addressInfo: result.data.addressInfo
  }
}

// 获取已接单列表
const getDeliveryOrders = async (event, wxContext, user) => {
  let result;
  try {
    result = db.collection('order').where({
      courier_id: user._id,
      is_enable: true
    }).get()
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'fail_to_get_orders'
    }
  }

  return {
    status: true,
    data: {
      entities: result.data
    }
  }

}

// 更新外送单状态
const updateDeliveryOrderInfo = async (event, wxContext, user) => {
  if (!event.order_id) {
    return {
      status: false,
      message: 'order_id_required'
    }
  }

  let result = null
  try {
    result = db.collection('order').doc(event.order_id).get()
  } catch (e) {
    console.error(e)
  }

  if (!result) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if(result.data.delivery_method != deliveryMethod.delivery) {
    return {
      status: false,
      message: 'delivery_method_error'
    }
  }

  // 外送码校验错误
  if(result.data.deliveryInfo.delivery_code != event.delivery_code) {
    return {
      status: false,
      message: 'delivery_code_error'
    }
  }

  let updateResult = null;
  try {
    updateResult = db.collection('order').where({
      _id: event.order_id,
      is_enable: true
    }).set({
      'deliveryInfo.status': event.delivery_status
    })
  } catch (e) {
    console.error(e)
  }

  if (!updateResult) {
    return {
      status: false,
      message: 'fail_to_update_delivery_status'
    }
  }

  return {
    status: true,
    data: updateResult.data
  }
}

// 快递员抢单
const grabDeliveryOrder = async (event, wxContext, user) => {
  if (!event.order_id) {
    return {
      status: false,
      message: 'order_id_required'
    }
  }

  let result = null
  try {
    result = db.collection('order').doc(event.order_id).get()
  } catch (e) {
    console.error(e)
  }

  if (!result) {
    return {
      status: false,
      message: 'order_not_found'
    }
  }

  if(!result.data.delivery_method || result.data.delivery_method != deliveryMethod.delivery) {
    return {
      status: false,
      message: 'delivery_method_error'
    }
  }

  if(result.data.deliveryInfo.status == deliveryStatus.accepted) {
    return {
      status: false,
      message: 'order_grabed'
    }
  }

  if(result.data.deliveryInfo.status != deliveryStatus.created) {
    return {
      status: false,
      message: 'delivery_status_error'
    }
  }

  let updateResult = null;
  try {
    updateResult = db.collection('order').where({
      _id: event.order_id,
      is_enable: true
    }).set({
      'deliveryInfo.status': deliveryStatus.accepted,
      'courier_id': user._id
    })
  } catch (e) {
    console.error(e)
  }

  if (!updateResult) {
    return {
      status: false,
      message: 'fail_to_update_delivery_status'
    }
  }

  return {
    status: true,
    data: updateResult.data
  }
}

module.exports = {
  regist: regist,
  updateCourier: updateCourier,
  getDeliveryOrderDetail: getDeliveryOrderDetail,
  getDeliveryOrders: getDeliveryOrders,
  updateDeliveryOrderInfo: updateDeliveryOrderInfo,
  grabDeliveryOrder: grabDeliveryOrder
}