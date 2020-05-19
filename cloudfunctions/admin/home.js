const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


// 设置首页
const setProperties = async (event, wxContext, admin) => {

  let entityResult = null
  try {
    entityResult = await db.collection('home').get()
  } catch (e) {
    console.error(e)
  }
  if (!entityResult || !entityResult.result) {
    return {
      status: false,
      message: 'fail_get_home'
    }
  }

  let result = null
  if (entityResult.result.data) {
    let entity = entityResult.result.data[0]
    try {
      result = await db.collection('home').doc(entity._id).set({
        data: {
          sections: event.sections,
          slide: event.slide,
          update_at: new Date()
        }
      })
      console.log('result:', result)
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      result = await db.collection('home').add({
        data: {
          sections: event.sections,
          slide: event.slide,
          update_at: new Date(),
          create_at: new Date(),
          is_enable: true
        }
      })
      console.log('result:', result)
    } catch (e) {
      console.error(e)
    }
  }

  if(!result) {
    return {
      status: false,
      message: 'fail_to_set_home'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: {}
    }
  }
}




module.exports = {
  setProperties: setProperties,
}