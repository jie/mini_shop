import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import moment from '../../utils/moment.min.js'

module.exports = {
  data: {
    hideCount: true, //角标初始是隐藏的
    count: 0, //角标数
    hide_good_box: true,
    feiBox: ""
  },

  onShow() {
    this.loadBuycart()
  },
  getBusPos() {
    var that = this;
    //可视窗口x,y坐标
    this.busPos = {};
    this.busPos['x'] = 20;
    this.busPos['y'] = this.data.systemInfo.windowHeight - 20;
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
  //点击商品触发的事件
  touchOnGoods: function (e) {
    //把点击每一项的对应的商品图保存下来，就是飞向购物车的图片
    this.setData({
      feiBox: this.data.entity.goods[e.currentTarget.dataset.idx].cover
    })
    // 如果good_box正在运动
    if (!this.data.hide_good_box) return;
    //当前点击位置的x，y坐标
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;
    console.log(this.finger)
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }

    if (this.finger['x'] < this.busPos['x']) {
      topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
    } else {
      topPoint['x'] = this.busPos['x'];
      this.finger['x'] = this.busPos['x']
    }

    console.log('finger:', this.finger)
    console.log('topPoint:', topPoint)
    console.log('busPos:', this.busPos)
    this.linePos = this.bezier([this.finger, topPoint, this.busPos], 30);
    this.startAnimation();

  },
  //开始动画
  startAnimation: function () {
    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    this.timer = setInterval(function () {
      index++;
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index >= 28) {
        clearInterval(that.timer);
        that.setData({
          hide_good_box: true,
          hideCount: false,
          count: that.data.count += 1
        })
      }
    }, 33);
  },
  bezier: function (points, times) {
    // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
    // 1、计算相邻控制点间距。
    // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
    // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
    // 4、根据DE的正余弦值和DE的值计算出F的坐标。
    // 邻控制AB点间距
    var bezier_points = [];
    var points_D = [];
    var points_E = [];
    const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
    // 邻控制BC点间距
    const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
    // D每次在AB方向上移动的距离
    const EACH_MOVE_AD = DIST_AB / times;
    // E每次在BC方向上移动的距离 
    const EACH_MOVE_BE = DIST_BC / times;
    // 点AB的正切
    const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
    // 点BC的正切
    const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
    // 点AB的弧度值
    const RADIUS_AB = Math.atan(TAN_AB);
    // 点BC的弧度值
    const RADIUS_BC = Math.atan(TAN_BC);
    // 每次执行
    for (var i = 1; i <= times; i++) {
      // AD的距离
      var dist_AD = EACH_MOVE_AD * i;
      // BE的距离
      var dist_BE = EACH_MOVE_BE * i;
      // D点的坐标
      var point_D = {};
      point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
      point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
      points_D.push(point_D);
      // E点的坐标
      var point_E = {};
      point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
      point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
      points_E.push(point_E);
      // 此时线段DE的正切值
      var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
      // tan_DE的弧度值
      var radius_DE = Math.atan(tan_DE);
      // 地市DE的间距
      var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
      // 此时DF的距离
      var dist_DF = (dist_AD / DIST_AB) * dist_DE;
      // 此时DF点的坐标
      var point_F = {};
      point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
      point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
      bezier_points.push(point_F);
    }
    return {
      'bezier_points': bezier_points
    };
  },
}