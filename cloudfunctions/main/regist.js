const cloud = require('wx-server-sdk')
const db = require('./db')
const WXBizDataCrypt = require('./utils/WXBizDataCrypt')
// var settings = require('./cloud_settings.json')

const getUser = async (openid) => {
  try {
    return await db.collection('user').doc(openid).get()
  } catch (e) {
    // console.error(e)
    return null
  }
}


const updateUserMobilePhone = async (openid, mobile_phone) => {
  try {
    return await db.collection('user').doc(openid).update({
      data: {
        mobile_phone: mobile_phone,
        update_at: new Date()
      }
    })
  } catch (e) {
    // console.error(e)
    return null
  }
}

// 云函数入口函数
const regist = async (event, wxContext) => {
  console.log('regist:')
  console.log(event)
  console.log(wxContext)

  // var pc = new WXBizDataCrypt(appId, sessionKey)

  // var data = pc.decryptData(encryptedData, iv)


  const openid = wxContext.OPENID
  // const mobile_phone = event.mobile_phone.data.phoneNumber
  var pc = new WXBizDataCrypt(settings.app_id, event.sessionKey)
  let encryptData = JSON.parse(event.encryptData)
  console.log('encryptData:', encryptData)

  var data = null
  try {
    var data = pc.decryptData(encryptData.encryptedData, encryptData.iv)
  } catch(e) {
    console.error(e)
  }
  if(!data) {
    return {
      status :false,
      message: 'fail_parse_encryptdata'
    }
  }
  console.log('data:', data)
  // var data = pc.decryptData(encryptedData, iv)
  const result = await getUser(openid)
  if (!result) {
    return {
      status: false,
      message: 'user_not_found'
    }
  }

  const updateResult = await updateUserMobilePhone(openid, data.mobile_phone)
  if (!updateResult) {
    return {
      status: false,
      message: 'fail_update_user'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      nextpage: '/pages/home/home',
      openid: wxContext.OPENID
    }
  }
}



const registByCloudID = async (event, wxContext) => {
  console.log('registByCloudID:')
  console.log(event)
  console.log(wxContext)


  const openid = wxContext.OPENID
  var mobile_phone = null
  if (event.weRunData && event.weRunData.data && event.weRunData.data.purePhoneNumber) {
    mobile_phone = event.weRunData.data.purePhoneNumber
  } else {
    return {
      status: false,
      message: 'fail_to_get_mobile_phone',
      data: event
    }
  }

  const updateResult = await updateUserMobilePhone(openid, mobile_phone)
  if (!updateResult) {
    return {
      status: false,
      message: 'fail_update_user',
      data: event
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      nextpage: '/pages/home/home',
      openid: wxContext.OPENID,
      data: event
    }
  }
}




module.exports = {
  regist: regist,
  registByCloudID: registByCloudID
}
