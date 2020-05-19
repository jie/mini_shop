const settings = require('./cloud_settings.json')
const db = require('./db')
// const constant = require('./constant')
const courier = require('./courier')
const cloud = require('wx-server-sdk')


const getCourier = async (openid) => {
  let result = null
  try {
    result = await db.collection('user').where({
      user_id: openid,
      is_enable: true,
      is_courier: true
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

  var user = await getCourier(wxContext.OPENID)
  if (!user || !user._id) {
    return {
      status: false,
      message: 'courier_required'
    }
  }

  switch (event.apiName) {
    case 'courier.regist':
      console.log('courier.regist')
      return await courier.regist(event, wxContext, user)
    default:
      return {
        status: false,
        message: 'api_not_found'
      }
  }
}