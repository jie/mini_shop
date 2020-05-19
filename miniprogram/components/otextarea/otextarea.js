Component({
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    minheight: {
      type: String,
      value: "102"
    },
    initValue: {
      type: String,
      value: ''
    }
  },
  data: {
    content: '',
    isShowTextarea: false,
    autoFocus: false,
    viewText: ''
  },
  ready() {
    console.log('====== otextare ready =======')
    if(this.data.initValue) {
      this.setData({
        content: this.data.initValue
      })
    }
  },

  observers: {
    'initValue': function (initValue) {
      this.setData({
        content: initValue
      })
    },
    // 'content': function (content) {
    //   console.log('content:', content)
    //   this.setData({
    //     viewText: content.replace(new RegExp('\n', "gm"), '<br />')
    //   })
    // }
  },
  methods: {
    onInputChange: function(e) {
      this.setData({
        content: e.detail.value
      })
      console.log(e.detail.value)
      this.triggerEvent('valueChange', { value: this.data.content }, {})
    },
    onBlur: function(e) {
      console.log(e)
      this.setData({
        isShowTextarea: false,
        autoFocus: false
      })
    },
    bindfocus: function(e) {
      console.log(e)
      this.setData({
        isShowTextarea: true
      })
    },
    onTapFakeArea: function() {
      console.log('onTapFakeArea')
      this.setData({
        isShowTextarea: true,
        autoFocus: true
      })
    }
  }
})
