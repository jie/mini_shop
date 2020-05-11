
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
      sell_num: ''
    },
    formatedImages: []
  },
  onInited(options) {
    let images = [];
    if(options.images) {
      images = JSON.parse(options.images)
    }
    let formatedImages = []
    images.map((item, index) => {
      formatedImages.push({
        id: index,
        url: item
      })
    })
    this.setData({
      formatedImages: formatedImages
    })
  },
  async getProfile() {
    this.showLoading()
  },
  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "adminAPI.createGoods"
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