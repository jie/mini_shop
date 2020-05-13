import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
import {
  CallCloudFuncAPI
} from '../../utils/async_cloudfunc'
import {
  cloudUploadAPI
} from '../../utils/async_tools/async_cloud_upload'
import {
  asyncCallFunc
} from '../../utils/async_tools/async_wx'
import {
  getGoodsImageName
} from '../../utils/util'
import {
  $wuxActionSheet
} from '../../components/wux-weapp/index'
import {
  $wuxDialog
} from '../../components/wux-weapp/index'
const PageObject = mergePages({}, BaseMixin, {

  data: {
    entities: [],
    colors: {
      one: '#ffc0d0',
      two: '#ffe0e0',
      three: '#ffedff'
    },
    buycart: null,
    images: [],
    goodsOperations: [{
        text: '设置排序'
      },
      {
        text: '上架商品'
      },
      {
        text: '删除商品'
      }
    ]
  },

  onInited: function (options) {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: async function () {
    await this.getGoods()
    wx.stopPullDownRefresh()
  },
  async getGoods() {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'goods.getGoods'
      })
    } catch (e) {
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
    } catch (e) {
      console.error(e)
    }
    if (!result) {
      return
    }

    let imagesUpload = []
    for (let item of result.tempFiles) {
      let cloudPath = getGoodsImageName(item.path, this.data.settings.cloud_goods_image_base_path)
      var uploadResult = await cloudUploadAPI(cloudPath, item.path)
      imagesUpload.push(uploadResult.fileID)
    }
    console.log('imagesUpload:', imagesUpload)
    if (imagesUpload.length !== 0) {
      wx.navigateTo({
        url: `/pages/admin_goods_manage/admin_goods_manage?images=${JSON.stringify(imagesUpload)}`,
      })
    }
  },
  onClickGoods: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/admin_goods_manage/admin_goods_manage?goods_id=${e.currentTarget.dataset.goodsid}`,
    })
  },
  async toggleShelveGoods(item) {
    this.showLoading()
    let result = null;
    let apiName;
    if(item.on_shelve) {
      apiName = "goods.offShelfGoods"
    } else {
      apiName = "goods.upShelfGoods"
    }

    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: apiName,
        goods_id: item._id
      })
    } catch (e) {
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

    this.hideLoading()
    await this.getGoods()

  },

  async deleteGoods(item) {
    this.showLoading()
    let result = null;

    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "goods.deleteGoods",
        goods_id: item._id
      })
    } catch (e) {
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

    this.hideLoading()
    await this.getGoods()

  },

  onLongTapGoods(e) {
    let that = this;
    let index = e.currentTarget.dataset.itemindex;
    let goods = this.data.entities[index]
    let goodsOperations = this.data.goodsOperations
    if(goods.on_shelve) {
      goodsOperations[goodsOperations.length - 2].text = '下架商品'
    } else {
      goodsOperations[goodsOperations.length - 2].text = '上架商品'
    }
    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '操作商品',
      buttons: goodsOperations,
      buttonClicked(index, item) {
        if (index === 0) {
          that.showSortDialog(goods)
        }
        if(index === (goodsOperations.length - 2)) {
          that.toggleShelveGoods(goods)
        }
        if (index === (goodsOperations.length -1)) {
          $wuxDialog().confirm({
            resetOnClose: true,
            title: '',
            content: '请确定是否删除该商品',
            onConfirm: (e, response) => {
              that.deleteGoods(goods)
            }
          })
        }
        return true
      },
    })
  },
  async setGoodsSeq(goods, seq) {
    this.showLoading()
    let result = null;
    if(seq === '') {
      seq = 0
    }
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "goods.updateGoodsProperties",
        goods_id: goods._id,
        goods: {
          seq: parseInt(seq)
        }
      })
    } catch (e) {
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

    this.hideLoading()
    setTimeout(() => {
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
      this.getGoods()
    }, this.data.settings.shortTipDuration)
  },
  showSortDialog(goods) {
    let that = this
    console.log(goods)
    $wuxDialog().prompt({
      resetOnClose: true,
      title: '设置商品排序',
      content: '数字越小商品越靠前',
      fieldtype: 'number',
      defaultText: goods.seq || 0,
      placeholder: '请输入排序数字',
      maxlength: 8,
      onConfirm(e, response) {
        that.setGoodsSeq(goods, response)
      },
    })
  },
})


Page(PageObject)