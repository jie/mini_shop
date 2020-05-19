const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')



const getCourier = async (user) => {
  let result = null;
  try {
    result = await db.collection('courier').where({user_id: user._id, is_enable: true}).limit(1).get()
  } catch(e) {
    console.error(e)
  }
  if(!result) {
    return {
      status: false,
      message: 'fail_to_get_courier'
    }
  }
  if(!result.data) {
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
  } catch(e) {
    console.error(e)
  }

  if(courierResult.status && courierResult.data) {
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
  if(event.invite_by) {
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
  } catch(e) {
    console.error(e)
  }

  if(!courierResult.status) {
    return courierResult
  }

  if(!courierResult.data) {
    return {
      status: false,
      message: 'courier_not_found'
    }
  }

  let courier = courierResult.data
  if(courier.is_verified) {
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

  if(!updateResult) {
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

// 获取快递单详情
const getOrderDetail  = async (event, wxContext, user) => {
  console.log('user:', user)
}

// 获取已接单列表
const getOrders  = async (event, wxContext, user) => {
  console.log('user:', user)
}

// 更新快递单状态
const updateOrder  = async (event, wxContext, user) => {
  console.log('user:', user)
}

// 快递员抢单
const grabOrder = async (event, wxContext, user) => {
  console.log('user:', user)
}

module.exports = {
  regist: regist,
  updateCourier: updateCourier,
  getOrderDetail: getOrderDetail,
  getOrders: getOrders,
  updateOrder: updateOrder,
  grabOrder: grabOrder
}