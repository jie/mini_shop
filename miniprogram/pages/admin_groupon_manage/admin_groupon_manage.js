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
      title: "团购管理",
      isPage: true
    },
    userInfo: null,
    entity: {
      name: '',
      images: [],
      cover: "",
      media: [],
      groupon_start_at: "",
      groupon_end_at: "",
      groupon_regulation: "",
      goods: []
    },
    editMode: 'page',
    goods: [],
    entity_id: null,
    isDatePickVisiable: false,
    selectedDateValue: '',
    currentDatetimePickerType: null
  },
  onInited(options) {
    this.setData({
      entity_id: options.entity_id
    })
    this.getGoods()
  },
  async getEntity(entityId) {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'groupon.getGroupon',
        groupon_id: entityId,

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
    let entity = result.result.data.entities[0]
    let images = []
    if (entity.media) {
      entity.media.map((item) => {
        images.push(item.url)
      })
    }
    entity.images = images

    this.setData({
      entity: entity
    })
    console.log('entity:', entity)
    setTimeout(() => {
      this.hideLoading()
      this.selectComponent('#imageSelector').setImages(this.data.entity.images)
      let selected = []
      this.data.entity.goods.map((item) => {
        selected.push(item._id)
      })
      let goods = []
      this.data.goods.map((item) => {
        if(!selected.includes(item._id)) {
          goods.push(item)
        }
      })
      this.selectComponent('#goodsSelector').updateSelectedEntities(this.data.entity.goods)
      this.selectComponent('#goodsSelector').updateEntities(goods)
    }, this.data.settings.shortTipDuration)
  },
  async getProfile() {
    this.showLoading()
  },
  async getGoods() {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'goods.getGoods',
        query: [
          {key: "is_groupon", value: true}
        ]
      })
      console.log('getGoods:', result)
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
      goods: result.result.data.entities,
    })

    
    this.hideLoading()
    if(this.data.entity_id) {
      this.getEntity()
    } else {
      this.selectComponent('#goodsSelector').updateEntities(result.result.data.entities)
    }
    
  },
  itemSelectorShowPanel() {
    this.setData({
      editMode: 'panel'
    })
  },
  itemSelectorClosePanel() {
    this.setData({
      editMode: 'page'
    })
  },
  async submitForm() {
    this.showLoading()
    console.log('entity:', this.data.entity)
    let goods = this.selectComponent('#goodsSelector').getSelectedEntities()
    console.log('submitgoodls:', goods)
    this.setData({
      "entity.goods": goods
    })
    let res = null
    let apiName;
    if (this.data.entity._id) {
      apiName = "groupon.updateGroupon"
    } else {
      apiName = "groupon.createGroupon"
    }
    try {
      res = await CallCloudFuncAPI(
        "admin", {
          apiName: apiName,
          groupon: this.data.entity
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
          url: '/pages/admin_groupon/admin_groupon',
        })
      }, this.data.settings.shortTipDuration)
    }
  },
  selectorSetCover: function (e) {
    console.log(e)
    this.setData({
      "entity.cover": e.detail.cover
    })
  },
  selectorUpdateImages: function (e) {
    console.log(e)
    let media = []
    e.detail.images.map((item) => {
      media.push({
        url: item,
        type: "image",
        summary: "",
        summary_en: ""
      })
    })
    this.setData({
      "entity.media": media
    })
  },
  bindInputGoodsName(e) {
    this.setData({
      'entity.name': e.detail.value
    })
  },
  bindInputGrouponStartAt(e) {
    console.log(e)
    this.setData({
      'entity.groupon_start_at': e.detail.value
    })
  },
  bindInputGrouponEndAt(e) {
    console.log(e)
    this.setData({
      'entity.groupon_end_at': e.detail.value
    })
  },
  bindInputGrouponRegulation(e) {
    console.log(e)
    this.setData({
      'entity.groupon_regulation': e.detail.value
    })
  },
  onConfirmDatePicker(e) {
    console.log(e)
    if(this.data.currentDatetimePickerType == 'startAt') {
      this.setData({
        'entity.groupon_start_at': e.detail.label,
        'isDatePickVisiable': false
      })
    } else {
      this.setData({
        'entity.groupon_end_at': e.detail.label,
        'isDatePickVisiable': false
      })
    }
  },
  onCancelDatePicker() {
    this.setData({
      isDatePickVisiable: false,
      currentDatetimePickerType: null
    })
  },
  onFocusStartAt(e) {
    let curDate = moment().format('YYYY-MM-DD HH:mm:ss')
    this.setData({
      isDatePickVisiable: true,
      currentDatetimePickerType: 'startAt',
      selectedDateValue: this.data.entity.groupon_start_at || curDate
    })
  },
  onFocusEndAt(e) {
    let curDate = moment().format('YYYY-MM-DD HH:mm:ss')
    this.setData({
      isDatePickVisiable: true,
      currentDatetimePickerType: 'endAt',
      selectedDateValue: this.data.entity.groupon_end_at || curDate
    })
  }
})

Page(PageObject)