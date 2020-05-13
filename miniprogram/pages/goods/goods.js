
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'

const PageObject = mergePages({}, BaseMixin, BuycartMixin, {

  data: {
    navbarData: {
      showCapsule: 1,
      title: "商城",
      isPage: false
    },
    entities: [],
    colors: {
      one: '#ffc0d0',
      two: '#ffe0e0',
      three: '#ffedff'
    },
    buycart: null
  },

  onInited: function (options) {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: async function () {
    await this.getGoods()
    wx.stopPullDownRefresh()
  },
  async getGoods () {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('main', {
        apiName: 'goodsAPI.getGoods'
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

    this.setData({
      entities: result.result.data.entities
    })
    this.hideLoading()
  },
  ontapCard(e) {
    console.log('ontapCard')
  },
  onCatchTap(e) {
    let index = e.currentTarget.dataset.index
    this.addGoodsToCart(this.data.entities[index])
  },
  ontapBuycart() {
    wx.navigateTo({
      url: '/pages/buycart/buycart'
    })
  }
})


Page(PageObject)