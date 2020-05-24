const db = require('./db')

const getGoods = async (event, wxContext) => {
  let result = null
  let entities = []

  if (event.entity_id) {
    try {
      result = await db.collection('goods').doc(event.entity_id).get()
      entities = [result.data]
    } catch (e) {
      console.error(e)
    }

  } else {
    try {
      result = await db.collection('goods').where({
        is_enable: true,
        on_shelve: true
      }).orderBy('seq', 'asc').get()
      entities = result.data
    } catch (e) {
      console.error(e)
    }
  }

  if(!result) {
    return {
      status: false,
      message: 'fail_to_get_goods'
    }
  }

  return {
    status: true,
    data: {
      entities: entities
    }
  }

}

const getGoodsDetail = async (event, wxContext) => {
  let result = null
  try {
    result = await db.collection('goods').doc(event.entity_id).get()
  } catch (e) {
    console.error(e)
    return {
      status: false,
      message: 'fail_to_get_goods'
    }
  }
  return {
    status: true,
    data: {
      entities: result.data
    }
  }
}


module.exports = {
  getGoods: getGoods
}