// components/list/list.js

// entity = {
  // key: 1
  // isLink: true  
  // title: '个人资料'
  // value: '完成度100%',
  // color: #333
  // arrowColor: #999,
    //  openType
    // isPicker
    // useSlot
// }

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    entities: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickItem: function(e) {
      let currentItem = this.data.entities[e.currentTarget.dataset.index]
      if (currentItem.isLink && currentItem.url) {
        wx.navigateTo({
          url: currentItem.url,
        })
      }
      this.triggerEvent('onTapListItem', {'index': e.currentTarget.dataset.index})
    }
  }
})
