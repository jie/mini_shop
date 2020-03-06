const cloud = require('wx-server-sdk')
const db = require('./db')


// 收到新订单(通知管理员)
const newOrderNotification = async (users,  orderNo) => {
  try {
    var createAt = new Date()
    var timestamp = moment().format("YYYY/MM/DD HH:mm")
    const result = await db.collection('notification').add({ 
      data: {
        users: users,
        slug: "new_order",
        data: {
          character_string1: {
            value: orderNo
          },
          date2: {
            value: timestamp
          }
        },
        create_at: createAt,
        status: "created"
      }
     })
    return {
      status: true,
      data: {}
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }
}



// 订单支付成功（通知用户）
const paySuccessNotification = async (users,  goodsName, amount, remark) => {
  try {
    var createAt = new Date()
    var timestamp = moment().format("YYYY/MM/DD HH:mm")
    const result = await db.collection('notification').add({ 
      data: {
        users: users,
        slug: "custom_pay_success",
        data: {
          thing1: goodsName,
          amount2: amount,
          date3: {
            value: timestamp
          },
          thing4: remark || ""
        },
        create_at: createAt,
        status: "created"
      }
     })
    return {
      status: true,
      data: {}
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }
}


// 订单支付成功（通知用户和商户）
const orderAcceptedNotification = async (rider,  orderNo, address) => {
  try {
    var createAt = new Date()
    var timestamp = moment().format("YYYY/MM/DD HH:mm")
    const result = await db.collection('notification').add({ 
      data: {
        users: users,
        slug: "order_accepted",
        data: {
          character_string2: {
            value: orderNo
          },
          time3: {
            value: timestamp
          },
          phone_number7: {
            value: rider.phone
          },
          thing4: {
            value: address
          }
        },
        create_at: createAt,
        status: "created"
      }
     })
    return {
      status: true,
      data: {}
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }
}


// 订单被拒绝（通知用户）
const orderRejectNotification = async (users, orderNo, reason, merchantName) => {
  try {
    var createAt = new Date()
    var timestamp = moment().format("YYYY/MM/DD HH:mm")
    const result = await db.collection('notification').add({ 
      data: {
        users: users,
        slug: "order_reject",
        data: {
          thing2: {
            value: reason
          },
          data3: {
            value: timestamp
          },
          character_string4: {
            value: orderNo
          },
          thing1: {
            value: merchantName
          }
        },
        create_at: createAt,
        status: "created"
      }
     })
    return {
      status: true,
      data: {}
    }
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: e.message
    }
  }
}




module.exports = {
  newOrderNotification: newOrderNotification,
  paySuccessNotification: paySuccessNotification,
  orderAcceptedNotification: orderAcceptedNotification,
  orderRejectNotification: orderRejectNotification
}
