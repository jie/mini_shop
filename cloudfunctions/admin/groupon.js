const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


function makeGroupon(event, admin) {
  let groupon = {
    is_enable: true,
    on_shelve: false
  }

  if (admin) {
    groupon.admin_id = admin._id
  }

  if (!event.groupon) {
    return {
      status: false,
      message: 'groupon_required'
    }
  }

  if (!event.groupon.name) {
    return {
      status: false,
      message: 'groupon_name_required'
    }
  }
  groupon.name = event.groupon.name

  if (!event.groupon.sell_num) {
    groupon.sell_num = 0
  } else {
    groupon.sell_num = parseInt(event.groupon.sell_num)
  }

  let media = []
  if (event.groupon.media) {
    event.groupon.media.map((item) => {
      media.push({
        summary: item.summary,
        summary_en: item.summary_en,
        url: item.url,
        type: item.type
      })
    })
  }
  groupon.media = event.groupon.media

  if (event.groupon.cover) {
    groupon.cover = event.groupon.cover
  }

  if (!event.groupon.content) {
    groupon.content = ""
  } else {
    groupon.content = event.groupon.content
  }

  if(event.groupon.seq) {
    groupon.seq = parseInt(event.groupon.seq)
  } else {
    groupon.seq = 0
  }


  if (event.groupon.groupon_start_at) {
    groupon.groupon_start_at = event.groupon.groupon_start_at
  }
  if (event.groupon.groupon_end_at) {
    groupon.groupon_end_at = event.groupon.groupon_end_at
  }
  if (event.groupon.groupon_regulation) {
    groupon.groupon_regulation = event.groupon.groupon_regulation
  }
}


// 创建商品
const createGroupon = async (event, wxContext, admin) => {
  let result = makeGroupon(event)
  if (!result.status) {
    return result
  }

  let groupon = result.data
  groupon.create_at = new Date()
  groupon.update_at = new Date()

  let grouponResult = null
  try {
    grouponResult = await db.collection('groupon').add({
      data: groupon
    })
    console.log('grouponResult:', grouponResult)
  } catch (e) {
    console.error(e)
  }

  if (!grouponResult) {
    return {
      status: false,
      message: 'fail_create_groupon'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: grouponResult.data
    }
  }
}



// 更新商品
const updateGroupon = async (event, wxContext, admin) => {

  let getGrouponResult = null
  try {
    getGrouponResult = await db.collection('groupon').doc(event.goods._id).get()
    console.log('getGrouponResult:', getGrouponResult)
  } catch (e) {
    console.error(e)
  }
  if (!getGrouponResult) {
    return {
      status: false,
      message: 'fail_to_get_groupon'
    }
  }

  let result = makeGroupon(event)
  if (!result.status) {
    return result
  }

  let groupon = result.data
  groupon.update_at = new Date()
  groupon.is_enable = event.groupon.is_enable

  let grouponResult = null
  console.log('groupon:', groupon)
  try {
    grouponResult = await db.collection('groupon').doc(event.groupon._id).set({
      data: groupon
    })
    console.log('grouponResult:', grouponResult)
  } catch (e) {
    console.error(e)
  }

  if (!grouponResult) {
    return {
      status: false,
      message: 'fail_create_groupon'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: grouponResult.data
    }
  }
}


// 更新商品某个属性
const updateGrouponProperties = async (event, wxContext, admin) => {
  let properties = event.groupon
  properties.update_at = new Date()
  let result = null
  try {
    result = await db.collection('groupon').doc(event.groupon_id).update({
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

const getGroupon = async (event, wxContext, admin) => {
  let result = null

  if (event.groupon_id) {
    try {
      result = await db.collection('groupon').doc(event.groupon_id).get()
      if (!result.data.is_enable) {
        return {
          status: false,
          message: 'groupon_not_found'
        }
      }
      return {
        status: true,
        data: {
          entities: [result.data]
        }
      }
    } catch (e) {
      console.error(e)
      return {
        status: false,
        message: e.message
      }
    }
  } else {
    try {
      result = await db.collection('groupon').where({
        is_enable: true
      }).orderBy('seq', 'asc').get()
      return {
        status: true,
        data: {
          entities: result.data
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
}


const deleteGroupon = async (event, wxContext, admin) => {
  let result = null
  try {
    result = await db.collection('groupon').doc(event.groupon_id).update({
      data: {
        is_enable: false,
        on_shelve: false,
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

module.exports = {
  createGroupon: createGroupon,
  updateGroupon: updateGroupon,
  updateGrouponProperties: updateGrouponProperties,
  getGroupon: getGroupon,
  deleteGroupon: deleteGroupon
}