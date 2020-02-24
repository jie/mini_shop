const cloud = require('wx-server-sdk')
const db = require('./db')


const getUser = async (openid) => {
  try {
    return await db.collection('user').doc(openid).get()
  } catch (e) {
    // console.error(e)
    return null
  }
}



const createUser = async (openid, unionid, nickName, gender, avatar, balance = 0, inviteBy = null, inviteFrom = null, userinfo = {}) => {
  try {
    return await db.collection('user').add({
      data: {
        _id: openid,
        unionid: unionid,
        gender: gender,
        nickName: nickName,
        avatar: avatar,
        raw: userinfo,
        mobile_phone: "",
        balance: balance,
        inviteBy: inviteBy,
        inviteFrom: inviteFrom,
        status: 'regist',
        is_enable: true
      }
    })
  } catch (e) {
    // console.error(e)
    return null
  }
}

const login = async (event, wxContext) => {
  const result = await getUser(wxContext.OPENID)
  console.log('getUser:')
  console.log(result)
  if (!result) {
    const userInfo = event.userinfo
    const createResult = await createUser(
      wxContext.OPENID,
      wxContext.UNIONID,
      userInfo.nickName,
      userInfo.gender,
      userInfo.avatarUrl,
      0,
      event.inviteBy || null,
      event.inviteFrom || null,
      userInfo
    )
    if (!createResult) {
      return {
        status: false,
        message: 'fail_create_user'
      }
    } else {
      return {
        status: true,
        message: 'ok',
        data: {
          registed: false,
          nextpage: '/pages/regist/regist',
          openid: wxContext.OPENID
        }
      }
    }
  } else {
    if (result.data.mobile_phone) {
      return {
        status: true,
        message: 'ok',
        data: {
          registed: true,
          nextpage: '/pages/home/home',
          openid: wxContext.OPENID
        }
      }
    } else {
      return {
        status: true,
        message: 'ok',
        data: {
          registed: false,
          nextpage: '/pages/regist/regist',
          openid: wxContext.OPENID
        }
      }
    }
  }
}


module.exports = {
  login: login
}
