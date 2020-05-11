const settings = require('./cloud_settings.json')
const db = require('./db')
// const constant = require('./constant')
const goods = require('./goods')
const cloud = require('wx-server-sdk')


const getAdmin = async (openid) => {
  let result = null
  try {
    result = await db.collection('admin').where({
      user_id: openid,
      is_enable: true
    }).get()
  } catch (e) {
    // console.error(e)
    return null
  }
  console.log(result)
  if (result && result.errMsg == 'collection.get:ok' && result.data) {
    return result.data[0]
  }
  return null
}


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()

  var admin = await getAdmin(wxContext.OPENID)
  if (!admin || !admin._id) {
    return {
      status: false,
      message: 'admin_required'
    }
  }

  switch (event.TriggerName) {
    case 'goods.createGoods':
      console.log('goods.createGoods')
      await goods.createGoods(event, wxContext, admin)
    case 'goods.updateGoods':
      console.log('goods.updateGoods')
      await goods.updateGoods(event, wxContext, admin)
    case 'goods.offShelfGoods':
      console.log('goods.offShelfGoods')
      await goods.offShelfGoods(event, wxContext, admin)
    case 'goods.upShelfGoods':
      console.log('goods.upShelfGoods')
      await goods.upShelfGoods(event, wxContext, admin)
    default:
      return {
        status: false,
        message: 'task_not_found'
      }
  }
}