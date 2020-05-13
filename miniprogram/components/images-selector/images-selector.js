import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import {
  asyncCallFunc
} from '../../utils/async_tools/async_wx'
import {
  getGoodsImageName
} from '../../utils/util'
import {
  cloudUploadAPI
} from '../../utils/async_tools/async_cloud_upload'

import { $wuxActionSheet } from '../../components/wux-weapp/index'
// import { $wuxDialog } from '../../components/wux-weapp/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images: {
      type: Array,
      value: true
    },
    bucket: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _images: []
  },

  ready() {
    this.setData({
      _images: this.data.images
    })
  },
  methods: {
    onClickImage(e) {
      console.log('clickImage:', e)
      let that = this
      let curIndex = e.currentTarget.dataset.imageindex
      let curImage = that.data._images[curIndex]
      
      $wuxActionSheet().showSheet({
        theme: 'wx',
        titleText: '操作图片',
        buttons: [{
            text: '预览图片'
          },
          {
            text: '删除图片'
          },
          {
            text: '设置封面'
          },
        ],
        buttonClicked(index, item) {
          console.log('index:', index)
          console.log('item:', item)
          if(index === 0) {
            wx.previewImage({
              urls: [curImage],
            })
          }

          if(index === 1) {
            that.removeImage(curImage)
          }

          if(index === 2) {
            that.setGoodsCover(curImage)
          }
          return true
        },
      })
    },
    async addImage() {
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

      let images = this.data._images
      for (let item of result.tempFiles) {
        let cloudPath = getGoodsImageName(item.path, this.data.bucket)
        var uploadResult = await cloudUploadAPI(cloudPath, item.path)
        images.push(uploadResult.fileID)
      }
      this.setData({
        _images: images
      })
      this.triggerEvent('selectorUpdateImages', {images: this.data._images})
    },
    removeImage: function (curImage) {
      console.log('currImage:', curImage)
      let images = this.data._images
      images.map((item, index) => {
        if (item == curImage) {
          images.splice(index, 1)
        }
      })
      console.log('_images:', this.data._images)
      this.setData({
        _images: images
      })
      this.triggerEvent('selectorUpdateImages', {images: this.data._images})
    },
    setGoodsCover: function(image) {
      this.triggerEvent('selectorSetCover', {cover: image})
    }
  }
})