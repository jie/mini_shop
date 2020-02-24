const cloud = require('wx-server-sdk')
const db = require('./db')

const getOrders = async (event, wxContext, user) => {
  console.log(user)
  let result = null
  try {
    result = await db.collection('order').orderBy('create_at', 'desc').where({ openid: user._id, is_enable: true }).get()
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'get_orders_error'
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

module.exports = {
  getOrders: getOrders
}
