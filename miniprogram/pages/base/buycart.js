import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import moment from '../../utils/moment.min.js'


module.exports = {
  onShow() {
    this.loadBuycart()
  },
  loadBuycart() {
    let buycart = wx.getStorageSync('buycart')
    if (buycart) {
      this.setData({
        buycart: buycart
      })
    } else {
      this.setData({
        buycart: {
          total: 0,
          display_total: 0,
          count: 0,
          entities: []
        }
      })
    }
  },
  addGoodsToCart(item) {
    console.log('item:', item)
    let flag = false
    for (let entity of this.data.buycart.entities) {
      if (entity.id == item._id) {
        entity.count += 1
        entity.total = entity.count * parseFloat(entity.price)
        entity.display_total = entity.count * parseFloat(entity.display_price)
        flag = true
      }
    }
    console.log('flag:', flag)
    if (flag === false) {
      this.data.buycart.entities.push({
        id: item._id,
        name: item.name,
        name_en: item.name_en,
        count: 1,
        price: item.price,
        display_price: item.display_price,
        cover: item.cover,
        total: item.price,
        display_total: item.display_price
      })
    }
    this.setData({
      'buycart.entities': this.data.buycart.entities
    })
    let total = 0;
    let count = 0;
    let display_total = 0;
    for (let entity of this.data.buycart.entities) {
      total += parseFloat(entity.total)
      display_total += parseFloat(entity.display_total)
      count += entity.count
    }
    this.setData({
      'buycart.total': total,
      'buycart.display_total': display_total,
      'buycart.count': count
    })
    wx.setStorageSync('buycart', this.data.buycart)
  },
  updateGoodsCount(id, count) {
    for (let item of this.data.buycart.entities) {
      if (id === item.id) {
        let itemTotal = parseFloat(item.total)
        let itemDisplayTotal = parseFloat(item.display_total)
        let itemCount = item.count
        let countVal = count - itemCount
        let totalVal = countVal * parseFloat(item.price)
        let displayTotalVal = countVal * parseFloat(item.display_price)
        let currentTotal = itemTotal + totalVal
        let currentDisplayTotal = itemDisplayTotal + displayTotalVal
        item.count = count
        item.total = currentTotal
        item.display_total = currentDisplayTotal
      }
    }
    let totalAll = 0;
    let displayTotalAll = 0;
    let countAll = 0;
    for (let item of this.data.buycart.entities) {
      totalAll += parseFloat(item.total)
      displayTotalAll += parseFloat(item.display_total)
      countAll += item.count
    }
    this.data.buycart.total = totalAll
    this.data.buycart.display_total = displayTotalAll
    this.data.buycart.count = countAll

    let entities = []
    for (let item of this.data.buycart.entities) {
      if (item.count !== 0) {
        entities.push(item)
      }
    }
    this.data.buycart.entities = entities

    this.setData({
      buycart: this.data.buycart
    })
    wx.setStorageSync('buycart', this.data.buycart)
  },
  _clearBuyCart() {
    this.setData({
      buycart: {
        total: 0,
        display_total: 0,
        count: 0,
        entities: []
      }
    })
    wx.setStorageSync('buycart', this.data.buycart)
  }
}