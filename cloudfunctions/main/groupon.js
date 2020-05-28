const cloud = require('wx-server-sdk')
const db = require('./db')

const getGroupons = async (event, wxContext, user) => {
  let result = null
  if (event.groupon_id) {
    try {
      result = await db.collection('groupon').doc(event.groupon_id).get()
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
    let entity = result.data
    let goods = []
    let goodsIds = []
    if (result.data.goods) {
      result.data.goods.map((item, index) => {
        goodsIds.push(item._id)
      })
    }

    const _ = db.command
    let goodsResult = []
    try {
      goodsResult = await db.collection('goods').where({
        _id: _.in(goodsIds),
        is_enable: true,
        on_shelve: true
      })
    } catch (e) {
      console.error(e)
    }
    console.log('goodsResult:', goodsResult)
    if (!goodsResult) {
      return {
        status: false,
        message: 'fail_to_get_goods'
      }
    }

    for (let item of goodsIds) {
      for (let i of goodsResult.data) {
        if (i._id == item._id) {
          goods.push(item)
          continue
        }
      }
    }
    entity.goods = goods

    return {
      status: true,
      message: 'ok',
      data: {
        entities: [entity]
      }
    }
  } else {
    try {
      result = await db.collection('groupon').orderBy('create_at', 'desc').where({
        is_enable: true,
        on_shelve: true
      }).get()
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


}

module.exports = {
  getGroupons: getGroupons
}