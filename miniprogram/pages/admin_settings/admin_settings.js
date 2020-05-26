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
      title: "系统设置",
      isPage: true
    },
    entity: {},
    slideTitle: '',
    cardTitle: '',
    sectionTypes: [
      'slide', 'deposit_card'
    ]
  },
  onInited(options) {
    this.getEntity(options.entity_id)
  },
  async getEntity(entityId) {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI('main', {
        apiName: 'getSystemSettings'
      })
    } catch (e) {
      console.error(e)
      this.showToast({
        title: e.message
      })
      this.hideLoading()
      wx.stopPullDownRefresh()
      return
    }
    this.hideLoading()
    console.log(res)
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
    } else {
      if (res.result.data.entity) {

        this.setData({
          entity: res.result.data.entity
        })

        if (res.result.data.entity.sections) {
          let slideTitle = ''
          let cardTitle = ''
          res.result.data.entity.sections.map((item, index) => {
            if (item.type == 'slide') {
              slideTitle = item.title
            }
            if (item.type == 'deposit_card') {
              cardTitle = item.title
            }
          })
          this.setData({
            slideTitle: slideTitle,
            cardTitle: cardTitle
          })
        }
      }

    }
    wx.stopPullDownRefresh()
    let images = []
    if (this.data.entity.slide) {
      this.data.entity.slide.map((item, index) => {
        images.push(item)
      })
    }
    console.log('images:', images)
    if (images) {
      this.selectComponent('#imageSelector').setImages(images)
    }

  },
  async submitForm() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "admin", {
          apiName: 'home.setProperties',
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
        wx.navigateBack({
          complete: (res) => {},
        })
      }, this.data.settings.shortTipDuration)
    }
  },
  bindSlideInputValue(e) {
    let targetItem = null
    if (this.data.entity.sections) {
      this.data.entity.sections.map((item, index) => {
        if (item.type == 'slide') {
          targetItem = item
          targetItem.title = e.detail.value
        }
      })
    }
    if (!targetItem) {
      if (!this.data.entity.sections) {
        this.setData({
          'entity.sections': []
        })

        this.data.entity.sections.push({
          title: e.detail.value,
          type: 'slide'
        })
      } else {
        this.data.entity.sections.push({
          title: e.detail.value,
          type: 'slide'
        })
      }
    }
    this.setData({
      entity: this.data.entity
    })
  },
  bindCardInputValue(e) {
    let targetItem = null
    if (this.data.entity.sections) {
      this.data.entity.sections.map((item, index) => {
        if (item.type == 'deposit_card') {
          targetItem = item
          targetItem.title = e.detail.value
        }
      })
    }
    if (!targetItem) {
      if (!this.data.entity.sections) {
        this.setData({
          'entity.sections': []
        })
        this.data.entity.sections.push({
          title: e.detail.value,
          type: 'deposit_card'
        })
      } else {
        this.data.entity.sections.push({
          title: e.detail.value,
          type: 'deposit_card'
        })
      }
    }
    this.setData({
      entity: this.data.entity
    })
  },
  selectorSetCover(e) {
    console.log(e)
  },
  selectorUpdateImages(e) {
    console.log(e)
    if (e.detail.images && e.detail.images.length !== 0) {
      this.setData({
        "entity.slide": e.detail.images
      })
    } else {
      this.setData({
        "entity.slide": []
      })
    }

  }

})

Page(PageObject)