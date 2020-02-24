Component({

  properties: {
    key: {
      type: String,
      value: null
    },
    icon: {
      type: String,
      value: null
    },
    isLink: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: null
    },
    color: {
      type: String,
      value: '#666'
    },
    iconColor: {
      type: String,
      value: '#333'
    },
    titleColor: {
      type: String,
      value: '#999'
    },
    arrowColor: {
      type: String,
      value: '#999'
    },
    borderColor: {
      type: String,
      value: '#eee'
    },
    borderWidth: {
      type: String,
      value: '1'
    },
    url: {
      type: String,
      value: null
    },
    useSlot: {
      type: Boolean,
      value: false
    },
    openType: {
      type: String,
      value: null
    }
  },

  data: {

  },

  methods: {
    onClickItem: function (e) {
      if(this.data.url && this.data.url.startsWith('/pages')) {
        wx.navigateTo({
          url: this.data.url,
        })
      }
      this.triggerEvent('onTapItem', { 'key': this.data.key, 'value': this.data.value, 'url': this.data.url })
    }
  }
})
