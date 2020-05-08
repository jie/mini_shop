const cloud = require('wx-server-sdk')
const db = require('./db')

const updateBirthday = async (event, wxContext, user) => {
  let result = null
  try {
    result = await db.collection('user').doc(user._id).update({
      data: {
        birthday: event.birthday
      }
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'update_birthday_error'
    }
  }
  return {
    status: true,
    message: 'ok'
  }
}

const updateGender = async (event, wxContext, user) => {
  let result = null
  try {
    result = await db.collection('user').doc(user._id).update({
      data: {
        gender: event.gender
      }
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'update_gender_error'
    }
  }
  return {
    status: true,
    message: 'ok'
  }
}

const updateUserName = async (event, wxContext, user) => {
  let result = null
  try {
    result = await db.collection('user').doc(user._id).update({
      data: {
        realName: event.realName,
        nickName: event.nickName
      }
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'update_name_error'
    }
  }
  return {
    status: true,
    message: 'ok'
  }
}




const updateAddress = async (event, wxContext, user) => {
  let result = null
  try {
    result = await db.collection('user').doc(user._id).update({
      data: {
        address: event.address
      }
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'update_address_error'
    }
  }
  return {
    status: true,
    message: 'ok'
  }
}


const getSubscribeMsg = async (event, wxContext, user) => {
  try {
    result = await db.collection('templateMsg').where({
      slug: db.command.in(event.slugs)
    }).get()
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'get_subscribe_msg_error'
    }
  }

  if(result.errCode !== 0) {
    return {
      status: false,
      message: result.errMsg
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
  updateBirthday: updateBirthday,
  updateGender: updateGender,
  updateUserName: updateUserName,
  updateAddress: updateAddress,
  getSubscribeMsg: getSubscribeMsg
}
