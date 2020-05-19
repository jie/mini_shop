const settings = require('./cloud_settings.json')
const db = require('./db')
// const constant = require('./constant')
const goods = require('./goods')
const groupon = require('./groupon')
const deposit = require('./deposit')
const home = require('./home')
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

  console.log(event)
  switch (event.apiName) {
    // goods api start
    case 'goods.createGoods':
      console.log('goods.createGoods')
      return await goods.createGoods(event, wxContext, admin)
    case 'goods.updateGoods':
      console.log('goods.updateGoods')
      return await goods.updateGoods(event, wxContext, admin)
    case 'goods.updateGoodsProperties':
      console.log('goods.updateGoodsProperties')
      return await goods.updateGoodsProperties(event, wxContext, admin)
    case 'goods.offShelfGoods':
      console.log('goods.offShelfGoods')
      return await goods.offShelfGoods(event, wxContext, admin)
    case 'goods.upShelfGoods':
      console.log('goods.upShelfGoods')
      return await goods.upShelfGoods(event, wxContext, admin)
    case 'goods.getGoods':
      console.log('goods.getGoods')
      return await goods.getGoods(event, wxContext, admin)
    case 'goods.deleteGoods':
      console.log('goods.deleteGoods')
      return await goods.deleteGoods(event, wxContext, admin)
      // goods api end
      // groupon api start
    case 'groupon.createGroupon':
      console.log('groupon.createGroupon')
      return await groupon.createGroupon(event, wxContext, admin)
    case 'groupon.updateGroupon':
      console.log('groupon.updateGroupon')
      return await groupon.updateGroupon(event, wxContext, admin)
    case 'groupon.updateGrouponProperties':
      console.log('groupon.updateGrouponProperties')
      return await groupon.updateGrouponProperties(event, wxContext, admin)
    case 'groupon.getGroupon':
      console.log('groupon.getGroupon')
      return await groupon.getGroupon(event, wxContext, admin)
    case 'groupon.deleteGroupon':
      console.log('groupon.deleteGroupon')
      return await groupon.deleteGroupon(event, wxContext, admin)
      // groupon api end
      // deposit card start
    case 'deposit.createEntity':
      console.log('deposit.createEntity')
      return await deposit.createEntity(event, wxContext, admin)
    case 'deposit.updateEntity':
      console.log('deposit.updateEntity')
      return await deposit.updateEntity(event, wxContext, admin)
    case 'deposit.setEntity':
      console.log('deposit.setEntity')
      return await deposit.setEntity(event, wxContext, admin)
    case 'deposit.deleteEntity':
      console.log('deposit.deleteEntity')
      return await deposit.deleteEntity(event, wxContext, admin)
    case 'deposit.getEntity':
      console.log('deposit.getEntity')
      return await deposit.getEntity(event, wxContext, admin)
      // deposit card end
      // home start
    case 'home.setProperties':
      console.log('home.setProperties')
      return await home.setProperties(event, wxContext, admin)
      // home end
    default:
      return {
        status: false,
          message: 'api_not_found'
      }
  }
}