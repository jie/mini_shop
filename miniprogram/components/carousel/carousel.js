Component({
  properties: {
    autoplay: {
      type: Boolean,
      value: true
    },
    indicatorColor: {
      type: String,
      value: '#666666'
    },
    indicatorActiveColor: {
      type: String,
      value: '#000000'
    },
    interval: {
      type: Number,
      value: 3000
    },
    duration: {
      type: Number,
      value: 600
    },
    height: {
      type: Number,
      value: 200
    },
    circular: {
      type: Boolean,
      value: true
    },
    images: {
      type: Array,
      value: [
        {
          'id': '11',
          'url': 'http://qnstatic.explorium.cn/11.png'
        },
        {
          'id': '12',
          'url': 'http://qnstatic.explorium.cn/12.png'
        },
        {
          'id': '13',
          'url': 'http://qnstatic.explorium.cn/13.png'
        }
      ]
    }
  },

  methods: {
    ontapItem: function(e) {
      console.log(e)
      let url = '/pages/event_detail/event_detail' + '?actvtId=' + e.target.dataset.itemid
      console.log(url)
      wx.navigateTo({
        url: url,
      })
    } 
  }
})
