const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


// 邀请快递员加入
const invite = async (event, wxContext, user) => {
  console.log('user:', user)
}


// 审核快递员申请
const acceptInvite = async (event, wxContext, user) => {
  console.log('user:', user)
}

// 移除快递员
const removeCourier = async (event, wxContext, user) => {
  console.log('user:', user)
}

module.exports = {
  invite: invite,
  acceptInvite: acceptInvite,
  removeCourier: removeCourier
}