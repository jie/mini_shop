const db = require('./db')

const getGoods = async (event, wxContext) => {
  try {
    const result = await db.collection('goods').where({
      is_enable: true,
      on_shelve: true
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


module.exports = {
  getGoods: getGoods
}