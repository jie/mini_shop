const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')

// 创建团购
const createGroupon = async (event, wxContext, admin) => {
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


  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}



// 更新商品
const updateGroupon = async (event, wxContext, admin) => {
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


  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}


module.exports = {
  createGroupon: createGroupon,
  updateGroupon: updateGroupon
}