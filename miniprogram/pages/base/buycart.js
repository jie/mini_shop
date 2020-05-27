import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import moment from '../../utils/moment.min.js'

module.exports = {
  data: {
    hide_good_box: true,
    feiBox: ""
  },

  onShow() {
    this.loadBuycart()
  },
  getBusPos() {
    this.busPos = {};
    this.busPos['x'] = 30;
    this.busPos['y'] = this.data.systemInfo.windowHeight - 80;
  },
  ontapBuycart() {
    wx.navigateTo({
      url: '/pages/buycart/buycart'
    })
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
  },

  touchOnGoods: function (e) {
    this.setData({
      feiBox: this.data.entity.goods[e.currentTarget.dataset.idx].cover
    })

    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX; //点击的位置
    this.finger['y'] = e.touches["0"].clientY;

    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else { //
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    this.linePos = this.bezier([this.busPos, topPoint, this.finger], 30);
    this.startAnimation(e);
  },
  startAnimation(e) {
    let bezier_points = this.linePos['bezier_points'],
      len = bezier_points.length,
      index = len;
    this.setData({
      hide_good_box: false,
      bus_x: this.finger['x'],
      bus_y: this.finger['y']
    })
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      index--;
      if (index < 0) {
        clearInterval(this.timer);
        this.setData({
          hide_good_box: true
        })
      } else {
        this.setData({
          bus_x: bezier_points[index]['x'],
          bus_y: bezier_points[index]['y']
        })
      }
    }, 20)
  },

  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    }
  }
}