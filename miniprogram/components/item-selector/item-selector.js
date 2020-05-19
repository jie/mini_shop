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

import {
  $wuxActionSheet
} from '../../components/wux-weapp/index'

Component({

  properties: {
    selectedItems: {
      type: Array,
      value: []
    },
    bucket: {
      type: String,
      value: ""
    },
    height: {
      type: Number,
      value: 0
    },
    screenWidth: {
      type: Number,
      value: 0
    },
    entityNum: {
      type: Number,
      value: 4
    },
    helpTitle: {
      type: String,
      value: ''
    }
  },

  data: {
    entities: [],
    selectedEntities: [],
    isShowPanel: false
  },

  ready() {
    this.setData({
      entityWidth: this.data.screenWidth / this.data.entityNum,
      selectedEntities: this.data.selectedItems
    })
  },
  methods: {
    onClickImage(e) {
      console.log('onClickImage:', e)
      let that = this
      let curIndex = null;
      let currentItem =null;
      for(let item of this.data.selectedEntities) {
        if(item._id === e.currentTarget.dataset.entityid) {
          curIndex = item
        }
      }
      this.data.selectedEntities.map((item, index) => {
        curIndex = index
        currentItem = item
      })
      $wuxActionSheet().showSheet({
        theme: 'wx',
        titleText: '操作商品',
        buttons: [
          {
            text: '移除商品',
            key: '1'
          }
        ],
        buttonClicked(index, item) {
          if (index === 0) {
            that.removeEntity(currentItem)
          }
          return true
        },
      })
    },
    updateEntities(entities) {
      this.setData({
        entities: entities
      })
    },
    updateSelectedEntities(entities) {
      this.setData({
        selectedEntities: entities
      })
    },
    getSelectedEntities() {
      return this.data.selectedEntities
    },
    async onTapPlus() {
      this.triggerEvent('itemSelectorShowPanel')
      this.setData({
        isShowPanel: true
      })
    },
    removeEntity: function (currentItem) {
      let selectedEntities = this.data.selectedEntities
      let entities = this.data.entities
      let targetIndex = null;
      selectedEntities.map((item, index) => {
        if (item._id == currentItem._id) {
          targetIndex = index
        }
      })
      console.log('targetIndex:', targetIndex)
      if(targetIndex!== null) {
        selectedEntities.splice(targetIndex, 1)
        entities.splice(0, 0, currentItem)

        this.setData({
          selectedEntities: selectedEntities,
          entities: entities
        })
        this.triggerEvent('itemSelectorUpdateItems', {
          selectedEntities: this.data.selectedEntities
        })
      }
    },
    setImages(images) {
      this.setData({
        _images: images
      })
    },
    setGoodsCover: function (image) {
      this.triggerEvent('selectorSetCover', {
        cover: image
      })
    },
    showPanel() {
      this.setData({
        isShowPanel: true
      })
      console.log('hidePanel:', this.data.entities)
    },
    onPanelHide() {
      this.setData({
        isShowPanel: false
      })

      this.triggerEvent('itemSelectorClosePanel')
    },
    ontapEntity(e) {
      console.log(e)
      let entity_id = e.currentTarget.dataset.entityid
      let index = e.currentTarget.dataset.entityindex
      this.triggerEvent('itemSelectorPushItem', {
        entity_id: entity_id
      })
      let entities = this.data.entities
      let targetEntity = entities[index]
      entities.splice(index, 1)
      let selectedEntities = this.data.selectedEntities
      if (targetEntity) {
        selectedEntities.push(targetEntity)
        this.setData({
          selectedEntities: selectedEntities,
          entities: entities
        })
      }
    }
  }
})