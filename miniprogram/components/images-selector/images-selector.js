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

Component({

  properties: {
    images: {
      type: Array,
      value: []
    },
    bucket: {
      type: String,
      value: ""
    },
    size: {
      type: Number,
      value: 0
    }
  },

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
      let that = this
      let curIndex = e.currentTarget.dataset.imageindex
      let curImage = that.data._images[curIndex]
      
      $wuxActionSheet().showSheet({
        theme: 'wx',
        titleText: '操作图片',
        buttons: [{
            text: '预览图片',
            key: '1'
          },
          {
            text: '删除图片',
            key: '2'
          },
          {
            text: '设置封面',
            key: '3'
          },
        ],
        buttonClicked(index, item) {
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
      let maxSize = 5
      if(this.data.size !== 0) {
        maxSize = this.data.size
      }
      try {
        result = await asyncCallFunc("chooseImage", {
          count: maxSize,
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
        images.splice(0, 0, uploadResult.fileID)
      }
      if(this.data.size === 0) {
        console.log('1')
        this.setData({
          _images: images
        })
      } else {
        console.log('2')
        let __images = []
        images.forEach((value, index) => {
          if(index < this.data.size) {
            __images.splice(0, 0, value)
          }
          
        })
        this.setData({_images:__images})
      }

      this.triggerEvent('selectorUpdateImages', {images: this.data._images})
    },
    removeImage: function (curImage) {
      let images = this.data._images
      images.map((item, index) => {
        if (item == curImage) {
          images.splice(index, 1)
        }
      })
      this.setData({
        _images: images
      })
      this.triggerEvent('selectorUpdateImages', {images: this.data._images})
    },
    setImages(images) {
      this.setData({
        _images: images
      })
    },
    setGoodsCover: function(image) {
      this.triggerEvent('selectorSetCover', {cover: image})
    }
  }
})