const cloud = require('wx-server-sdk')
const db = require('./db')

const getGroupons = async (event, wxContext, user) => {
  console.log(user)
  let result = null
  try {
    result = await db.collection('groupon').orderBy('create_at', 'desc').where({ is_enable: true, on_shelve: true }).get()
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'fail_to_get_groupons'
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
  getGroupons: getGroupons
}
