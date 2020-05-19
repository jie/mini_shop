const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


// 新增充值卡
const createEntity = async (event, wxContext, admin) => {
  let entity = event.entity
  entity.create_at = new Date()
  entity.update_at = new Date()

  let result = null
  try {
    result = await db.collection('deposit_card').add({
      data: entity
    })
  } catch (e) {
    console.error(e)
  }

  if (!result) {
    return {
      status: false,
      message: 'fail_create_deposit_card'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}

// 更新充值卡
const updateEntity = async (event, wxContext, admin) => {
  let entityResult = null
  try {
    entityResult = await db.collection('deposit_card').doc(event.entity._id).get()
  } catch (e) {
    console.error(e)
  }
  if (!entityResult) {
    return {
      status: false,
      message: 'fail_get_deposit_card'
    }
  }

  let entity = entityResult.data
  entity = Object.assign({}, entity, event.entity)
  entity.update_at = new Date()
  delete entity._id
  let result = null
  console.log('entity:', entity)
  try {
    result = await db.collection('deposit_card').doc(event.entity._id).set({
      data: entity
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }

  if (!result) {
    return {
      status: false,
      message: 'fail_update_deposit_card'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}

// 更新卡属性
const setEntity = async (event, wxContext, admin) => {
  let properties = event.properties
  properties.update_at = new Date()
  let result = null
  try {
    result = await db.collection('deposit_card').doc(event.entity_id).update({
      data: properties
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}


// 删除卡
const deleteEntity = async (event, wxContext, admin) => {
  let result = null
  try {
    result = await db.collection('deposit_card').doc(event.entity_id).update({
      data: {
        is_enable: false,
        update_at: new Date()
      }
    })
    console.log('result:', result)
  } catch (e) {
    console.error(e)
  }
  return {
    status: true,
    message: 'ok',
    data: {
      entity: result.data
    }
  }
}


const getEntity = async (event, wxContext, admin) => {
  let result = null
  let entities = []
  try {
    if (!event.entity_id) {
      result = await db.collection('deposit_card').where({
        is_enable: true
      }).get()
      entities = result.data
    } else {
      result = await db.collection('deposit_card').doc(event.entity_id).get()
      entities = [result.data]
    }
  } catch (e) {
    console.error(e)
  }
  if (!result) {
    return {
      status: false,
      message: 'fail_get_deposit_card'
    }
  }
  return {
    status: true,
    data: {
      entities: entities
    }
  }

}


module.exports = {
  createEntity: createEntity,
  updateEntity: updateEntity,
  setEntity: setEntity,
  deleteEntity: deleteEntity,
  getEntity: getEntity
}