// utils/forms/counter/counter.js
var tapInterval;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    counter: {
      type: Number,
      value: 0
    },
    maxCount: {
      type: Number,
      value: 0
    },
    price: {
      type: String,
      value: null
    },
    optId: {
      type: String,
      value: null
    },
    initvalue: {
      type: String,
      value: '0'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    console.log('counterd:', this.data.initvalue)
    this.setData({
      counter: this.data.initvalue
    })
  },
  methods: {
    onTapSub: function(e) {
      if((this.data.counter - 1) >= 0) {
        this.setData({
          counter: this.data.counter - 1
        })
        this.triggerEvent("action", {
          actionType: 'counterUpdate',
          counter: this.data.counter,
          optId: this.data.optId,
          price: this.data.price
        });
      } 
    },
    onTapAdd: function(e) {
      if((this.data.counter + 1) <= this.data.maxCount) {
        this.setData({
          counter: this.data.counter + 1
        })
        this.triggerEvent("action", {
          actionType: 'counterUpdate',
          counter: this.data.counter,
          optId: this.data.optId,
          price: this.data.price
        });
      }
    },
    onLongTapSub: function (e) {
      tapInterval = setInterval(()=>{this.onTapSub()}, 100)
    },
    onLongTapAdd: function (e) {
      tapInterval = setInterval(()=>{this.onTapAdd()}, 100)
    },
    onSubTapEnd: function() {
      if(tapInterval){
        clearInterval(tapInterval)
      }
    },
    onAddTapEnd: function() {
      if(tapInterval){
        clearInterval(tapInterval)
      }
    },
    onInputChange: function(e) {
      if(!e.detail.value) {
        this.triggerEvent("action", {
          actionType: 'AF_FORM_COUNTER_UPDATE',
          counter: '0',
          optId: this.data.optId,
          price: this.data.price
        })
        return '0'
      } else {
        let val = Math.abs(parseInt(e.detail.value))
        if (val <= this.data.maxCount) {
          this.triggerEvent("action", {
            actionType: 'AF_FORM_COUNTER_UPDATE',
            counter: val,
            optId: this.data.optId,
            price: this.data.price
          })
          return val.toString()
        } else {
          return this.data.maxCount.toString()
        }
      }
    }
  }
})
