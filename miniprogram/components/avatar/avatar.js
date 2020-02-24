// components/avatar/avatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 60
    },
    isCube: {
      type: Boolean,
      value: false
    },
    bordered: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarInfo: null
  },

  attached: function() {
    let avatarInfo = wx.getStorageSync('avatarInfo')
    this.setData({
      avatarInfo: avatarInfo
    })
  },
  methods: {
  }
})
