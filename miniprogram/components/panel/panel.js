// components/panel/panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String
    },
    height: {
      type: Number
    },
    blankheight: {
      type: Number
    },
    init_status: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isShowCloseIcon: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    'init_status': function(init_status) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      if (init_status) {
        this.setData({
          animate_class: 'slideInUp',
          panel_animate_class: "fadeIn",
          isShowPanel: init_status
        })
      } else {
        this.setData({
          animate_class: 'slideOutDown',
          panel_animate_class: 'fadeOut'
        })
        // setTimeout(()=>{
        //   this.setData({
        //     isShowPanel: init_status
        //   })
        // }, 2000)

      }
    }
  },
  data: {
    isShowPanel: false,
    animate_class: null
  },
  ready() {
    this.setData({
      isShowPanel: this.data.init_status
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closePanel: function() {

      this.setData({
        animate_class: 'slideOutDown',
        panel_animate_class: 'fadeOut'
      })
      setTimeout(() => {
        this.setData({
          isShowPanel: false
        })
        this.triggerEvent('PanelHide', {})
      }, 500)

    },
    showPanel: function() {
      this.setData({
        isShowPanel: true
      })
    },
    onTapPanel: function(e) {
      console.log('==== event catched ====')
      console.log(e)
    }
  }
})