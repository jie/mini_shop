
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'


const PageObject = mergePages({}, BaseMixin, {
  data: {
    userInfo: null,
    goods: {
      name: '',
      name_en: '',
      display_price: '',
      price: '',
      num: '',
      sell_num: '',
      images: [],
      cover: "",
      media: []
    }
  },
  onInited(options) {
    if(options.goods_id) {
      this.getGoods(options.goods_id)
    } else {
      let images = [];
      if(options.images) {
        images = JSON.parse(options.images)
      }
      this.setData({
        "goods.images": images
      })

      if(images.length === 1) {
        this.setData({
          "goods.cover": images[0]
        })
      }
      console.log(this.data.goods)
    }
  },
  async getGoods (goodsId) {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'goods.getGoods',
        goods_id: goodsId
      })
    } catch(e) {
      console.error(e)
      this.showToast({
        title: e.message
      })
      this.hideLoading()
      return
    }

    if (result.result.status !== true) {
      this.showToast({
        title: result.result.message
      })
      this.hideLoading()
      return
    }
    let goods = result.result.data.entities[0]
    let images = []
    if(goods.media) {
      goods.media.map((item) => {
        images.push(item.url)
      })
    }
    goods.images = images
    console.log('images:', images)
    console.log('goods:', goods)
    this.setData({
      goods: goods
    })
    this.hideLoading()
  },
  async getProfile() {
    this.showLoading()
  },
  async submitForm() {
    this.showLoading()
    console.log('goods:', this.data.goods)
    let res = null
    let apiName;
    if(this.data.goods._id) {
      apiName = "goods.updateGoods"
    } else {
      apiName = "goods.createGoods"
    }
    try {
      res = await CallCloudFuncAPI(
        "admin",
        {
          apiName: apiName,
          goods: this.data.goods
        }
      )
    } catch (e) {
      console.error(e)
      this.hideLoading()
      this.showToast({
        title: e.message
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)
      return
    }

    this.hideLoading()
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
    } else {
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
    }
  },
  selectorSetCover: function(e) {
    console.log(e)
    this.setData({
      "goods.cover": e.detail.cover
    })
  },
  selectorUpdateImages: function(e) {
    console.log(e)
    let media = []
    e.detail.images.map((item)=>{
      media.push({
        url: item,
        type: "image",
        summary: "",
        summary_en: ""
      })
    })
    this.setData({
      "goods.media": media
    })
  },
  bindInputGoodsName(e) {
    this.setData({
      'goods.name': e.detail.value
    })
  },
  bindInputGoodsNameEn(e) {
    this.setData({
      'goods.name_en': e.detail.value
    })
  },
  bindInputDisplayPrice(e) {
    this.setData({
      'goods.display_price': e.detail.value
    })
  },
  bindInputPrice(e) {
    this.setData({
      'goods.price': e.detail.value
    })
  },
  bindInputNickName(e) {
    this.setData({
      'goods.num': e.detail.value
    })
  },
  bindInputSellNum(e) {
    this.setData({
      'goods.sell_num': e.detail.value
    })
  },
})

Page(PageObject)