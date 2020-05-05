const settings = require('./cloud_settings.json')
const db = require('./db')
const moment = require('moment')
const userAPI = require('./user')
const orderAPI = require('./orders')
const loginAPI = require('./login')
const registAPI = require('./regist')
const goodsAPI = require('./goods')
const depositAPI = require('./deposit')
const payAPI = require('./pay')
const adminAPI = require('./admin_funcs')
const wechat_triggers = require('./wechat_triggers')
const constant = require('./constant')
const cloud = require('wx-server-sdk')


const getCards = async () => {
  let cards = []
  try {
    const result = await db.collection('deposit_card').where({
      is_enable: true
    }).get()
    cards = result.data
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }

  try {
    const result = await db.collection('slide').where({
      is_enable: true
    }).get()
    return {
      status: true,
      data: {
        entities: cards,
        images: result.data
      }
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }
}




const getUser = async (openid) => {
  try {
    return await db.collection('user').doc(openid).get()
  } catch (e) {
    // console.error(e)
    return null
  }
}


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


const getProfile = async (event, wxContext, user) => {


  let data = {
    status: true,
    data: {
      user: {
        id: user._id,
        avatar: user.avatar,
        balance: user.balance,
        nickName: user.nickName,
        realName: user.realName,
        status: user.status,
        gender: user.gender,
        birthday: user.birthday,
        address: user.address,
        update_at: user.update_at,
        create_at: user.create_at
      }
    }
  }

  let result = await db.collection('admin').where({
    user_id: user._id
  }).limit(1).get()
  console.log(result)
  if (result && result.errMsg == 'collection.get:ok' && result.data && result.data.length === 1) {
    if (result.data[0].is_enable) {
      data.data.admin = {
        id: result.data[0]._id,
        name: result.data[0].name
      }
    }
  }

  return data
}


const getNotificationAdmins = async () => {
  console.log('start get getNotificationAdmins')
  let result = null
  constant.currentAdministrators.timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    result = await db.collection('admin').where({
      order_notification: true,
      is_enable: true
    }).get()
  } catch (e) {
    console.error(e)
  }

  if (result && result.errMsg == 'collection.get:ok') {
    constant.currentAdministrators.admins = result.data
  }
  console.log('constant.currentAdministrators:', constant.currentAdministrators)
}

// 启动前刷新管理员

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:', event)
  console.log(context)
  const wxContext = cloud.getWXContext()

  let user = await getUser(wxContext.OPENID)
  switch (event.apiName) {
    case 'getCards':
      return await getCards()
    case 'depositAPI.deposit':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await depositAPI.deposit(event, wxContext, user.data)
    case 'depositAPI.depositSuccess':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await depositAPI.depositSuccess(event, wxContext, user.data)
    case 'payAPI.orderPay':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await payAPI.orderPay(event, wxContext, user.data)
    case 'getProfile':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await getProfile(event, wxContext, user.data)
    case 'userAPI.updateBirthday':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await userAPI.updateBirthday(event, wxContext, user.data)
    case 'userAPI.updateUserName':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await userAPI.updateUserName(event, wxContext, user.data)
    case 'userAPI.updateGender':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await userAPI.updateGender(event, wxContext, user.data)
    case 'userAPI.updateAddress':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await userAPI.updateAddress(event, wxContext, user.data)
    case 'orderAPI.getOrders':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await orderAPI.getOrders(event, wxContext, user.data)

      // admin API start
    case 'adminAPI.getUsers':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }

      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }

      return await adminAPI.getUsers(event, wxContext, user.data)
    case 'adminAPI.getUserOrders':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }

      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.getUserOrders(event, wxContext, user.data)
    case 'adminAPI.updateOrderAddress':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.updateOrderAddress(event, wxContext, user.data)
    case 'adminAPI.updateOrderStatus':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.updateOrderStatus(event, wxContext, user.data)
    case 'adminAPI.updateDeliveryStatus':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.updateDeliveryStatus(event, wxContext, user.data)
    case 'adminAPI.updateOrderTotal':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.updateOrderTotal(event, wxContext, user.data)
    case 'adminAPI.updateOrderRemarks':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.updateOrderRemarks(event, wxContext, user.data)
    case 'adminAPI.cancelOrder':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.cancelOrder(event, wxContext, user.data)

    case 'adminAPI.acceptOrder':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      await getNotificationAdmins()
      return await adminAPI.acceptOrder(event, wxContext, user.data, admin)

    case 'adminAPI.increasePushToken':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      var admin = await getAdmin(wxContext.OPENID)
      if (!admin || !admin._id) {
        return {
          status: false,
          message: 'admin_required'
        }
      }
      return await adminAPI.increasePushToken(event, wxContext, user.data)
    case 'adminAPI.getSubscribeMessageTpls':
      if (!user || user.errMsg !== 'document.get:ok') {
        return {
          status: false,
          message: 'user_not_found'
        }
      }
      return await adminAPI.getSubscribeMessageTpls(event, wxContext, user.data)
      // admin api end
    case 'loginAPI.login':
      return await loginAPI.login(event, wxContext)
    case 'registAPI.regist':
      return await registAPI.regist(event, wxContext)
    case 'registAPI.registByCloudID':
      return await registAPI.registByCloudID(event, wxContext)
    case 'goodsAPI.getGoods':
      return await goodsAPI.getGoods(event, wxContext)
    default:
      return {
        status: false,
          message: 'api_not_found'
      }
  }
}