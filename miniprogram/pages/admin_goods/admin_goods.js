
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'
import {cloudUploadAPI} from '../../utils/async_tools/async_cloud_upload'
import {asyncCallFunc} from '../../utils/async_tools/async_wx'
import {getGoodsImageName} from '../../utils/util'
const PageObject = mergePages({}, BaseMixin, {

  data: {
    entities: [],
    colors: {
      one: '#ffc0d0',
      two: '#ffe0e0',
      three: '#ffedff'
    },
    buycart: null,
    images: []
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
      result = await CallCloudFuncAPI('admin', {
        apiName: 'goods.getGoods'
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
  async goGoodsManage() {
    // wx.navigateTo({
    //   url: '/pages/admin_goods_manage/admin_goods_manage',
    // })
    let result = null
    try {
      result = await asyncCallFunc("chooseImage", {
        count: 5,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      })
    } catch(e) {
      console.error(e)
    }
    if(!result) {
      return
    }

    let imagesUpload = []
    for(let item of result.tempFiles) {
      let cloudPath = getGoodsImageName(item.path, this.data.settings.cloud_goods_image_base_path)
      var uploadResult = await cloudUploadAPI(cloudPath, item.path)
      imagesUpload.push(uploadResult.fileID)
    }
    console.log('imagesUpload:', imagesUpload)
    if(imagesUpload.length !== 0) {
      wx.navigateTo({
        url: `/pages/admin_goods_manage/admin_goods_manage?images=${JSON.stringify(imagesUpload)}`,
      })
    }
  },
  onClickGoods: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/admin_goods_manage/admin_goods_manage?goods_id=${e.currentTarget.dataset.goodsid}`,
    })
  }
})


Page(PageObject)