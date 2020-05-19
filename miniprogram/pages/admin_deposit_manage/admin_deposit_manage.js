import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import {
  CallCloudFuncAPI
} from '../../utils/async_cloudfunc.js'


const PageObject = mergePages({}, BaseMixin, {
  data: {
    navbarData: {
      showCapsule: 1,
      title: "充值管理",
      isPage: true
    },
    userInfo: null,
    entity: {
      name: '',
      name_en: '',
      value: '',
      real_value: '',
      style: '',
      is_enable: true,
      image: '',
      remark: '',
      summary: '',
      _id: null
    },
    cardStyle: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'
    ]
  },
  onInited(options) {
    this.setData({
      'entity._id': options.entity_id
    })
    this.getEntity(options.entity_id)
  },
  async getEntity(entityId) {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'deposit.getEntity',
        entity_id: entityId
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
    let entity = result.result.data.entities[0]
    this.setData({
      entity: entity
    })
    if(entity.image) {
      this.selectComponent('#imageSelector').setImages([entity.image])
    }
    
  },
  async submitForm() {
    this.showLoading()
    let res = null
    let apiName;
    if (this.data.entity._id) {
      apiName = "deposit.updateEntity"
    } else {
      apiName = "deposit.createEntity"
    }
    try {
      res = await CallCloudFuncAPI(
        "admin", {
          apiName: apiName,
          entity: this.data.entity
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
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/admin_deposit/admin_deposit',
        })
      }, this.data.settings.shortTipDuration)
    }
  },
  bindInputValue(e) {
    let field = e.currentTarget.dataset.field
    let entity = this.data.entity
    entity[field] = e.detail.value
    this.setData({
      entity: entity
    })
  },
  selectorSetCover(e) {
    this.setData({
      "entity.image": e.detail.cover
    })
  },
  selectorUpdateImages(e) {
    console.log(e)
    if(e.detail.images && e.detail.images.length !== 0) {
      this.setData({
        "entity.image": e.detail.images[0]
      })
    } else {
      this.setData({
        "entity.image": ""
      })
    }

  }

})

Page(PageObject)