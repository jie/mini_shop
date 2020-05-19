const cloud = require('wx-server-sdk')
const db = require('./db')
const moment = require('moment')
// const funcs = require('./utils/funcs')


function makeGoods(event, admin) {
  let goods = {
    is_enable: true,
    on_shelve: false
  }

  if (admin) {
    goods.admin_id = admin._id
  }

  if (!event.goods) {
    return {
      status: false,
      message: 'goods_required'
    }
  }

  if (!event.goods.name) {
    return {
      status: false,
      message: 'goods_name_required'
    }
  }
  goods.name = event.goods.name

  if (!event.goods.name_en) {
    goods.name_en = ''
  } else {
    goods.name_en = event.goods.name_en
  }

  if (!event.goods.price) {
    return {
      status: false,
      message: 'goods_price_required'
    }
  }
  goods.price = parseFloat(event.goods.price)

  if (!event.goods.display_price) {
    return {
      status: false,
      message: 'goods_display_price_required'
    }
  }
  goods.display_price = parseFloat(event.goods.display_price)

  if (!event.goods.num) {
    goods.num = 0
  } else {
    goods.num = parseInt(event.goods.num)
  }

  if (!event.goods.sell_num) {
    goods.sell_num = 0
  } else {
    goods.sell_num = parseInt(event.goods.sell_num)
  }

  let media = []
  if (event.goods.media) {
    event.goods.media.map((item) => {
      media.push({
        summary: item.summary,
        summary_en: item.summary_en,
        url: item.url,
        type: item.type
      })
    })
  }
  goods.media = event.goods.media

  if (event.goods.cover) {
    goods.cover = event.goods.cover
  }

  if (!event.goods.content) {
    goods.content = ""
  } else {
    goods.content = event.goods.content
  }

  let tags = []
  if (event.goods.tags) {
    tags.map((item) => {
      tags.push({
        name: item.name,
        name_en: item.name_en,
        slug: item.slug
      })
    })
  }
  goods.tags = tags

  if (event.goods.category) {
    goods.category = event.goods.category
  }

  let parameters = []
  if (event.goods.parameters) {
    event.goods.parameters.map((item) => {
      parameters.push({
        key: item.key,
        name: item.name,
        name_en: item.name_en,
        summary: item.summary,
        summary_en: item.sumary_en
      })
    })
  }
  goods.parameters = parameters

  if(event.goods.seq) {
    goods.seq = parseInt(event.goods.seq)
  } else {
    goods.seq = 0
  }

  // 团购设置
  goods.is_groupon = event.goods.is_groupon ? true : false
  return {
    status: true,
    data: goods
  }
}


// 创建商品
const createGoods = async (event, wxContext, admin) => {
  let result = makeGoods(event)
  if (!result.status) {
    return result
  }

  let goods = result.data
  goods.create_at = new Date()
  goods.update_at = new Date()

  let goodsResult = null
  try {
    goodsResult = await db.collection('goods').add({
      data: goods
    })
    console.log('goodsResult:', goodsResult)
  } catch (e) {
    console.error(e)
  }

  if (!goodsResult) {
    return {
      status: false,
      message: 'fail_create_goods'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: goodsResult.data
    }
  }
}



// 更新商品
const updateGoods = async (event, wxContext, admin) => {

  let getGoodsResult = null
  try {
    getGoodsResult = await db.collection('goods').doc(event.goods._id).get()
    console.log('getGoodsResult:', getGoodsResult)
  } catch (e) {
    console.error(e)
  }
  if (!getGoodsResult) {
    return {
      status: false,
      message: 'fail_to_get_goods'
    }
  }

  let result = makeGoods(event)
  if (!result.status) {
    return result
  }

  let goods = result.data
  goods.update_at = new Date()
  goods.is_enable = event.goods.is_enable

  let goodsResult = null
  console.log('goods:', goods)
  try {
    goodsResult = await db.collection('goods').doc(event.goods._id).set({
      data: goods
    })
    console.log('goodsResult:', goodsResult)
  } catch (e) {
    console.error(e)
  }

  if (!goodsResult) {
    return {
      status: false,
      message: 'fail_create_goods'
    }
  }

  return {
    status: true,
    message: 'ok',
    data: {
      entity: goodsResult.data
    }
  }
}


// 更新商品某个属性
const updateGoodsProperties = async (event, wxContext, admin) => {
  let properties = event.goods
  properties.update_at = new Date()
  let result = null
  try {
    result = await db.collection('goods').doc(event.goods_id).update({
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

// 上架商品
const upShelfGoods = async (event, wxContext, admin) => {
  let result = null
  try {
    result = await db.collection('goods').doc(event.goods_id).update({
      data: {
        on_shelve: true,
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


// 下架商品
const offShelfGoods = async (event, wxContext, admin) => {
  let result = null
  try {
    result = await db.collection('goods').doc(event.goods_id).update({
      data: {
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
    message: 'setting_success',
    data: {
      entity: result.data
    }
  }
}

const getGoods = async (event, wxContext, admin) => {
  let result = null

  if (event.goods_id) {
    try {
      result = await db.collection('goods').doc(event.goods_id).get()
      if (!result.data.is_enable) {
        return {
          status: false,
          message: 'goods_not_found'
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
    let query = {is_enable: true}
    if(event.query) {
      for(let item of event.query) {
        query[item.key] = item.value
      }
    }
    console.log('query:', query)
    try {
      result = await db.collection('goods').where(query).orderBy('seq', 'asc').get()
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


const deleteGoods = async (event, wxContext, admin) => {
  let result = null
  try {
    result = await db.collection('goods').doc(event.goods_id).update({
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
  createGoods: createGoods,
  updateGoods: updateGoods,
  updateGoodsProperties: updateGoodsProperties,
  offShelfGoods: offShelfGoods,
  upShelfGoods: upShelfGoods,
  getGoods: getGoods,
  deleteGoods: deleteGoods
}