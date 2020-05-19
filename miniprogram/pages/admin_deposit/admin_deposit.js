import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
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
    navbarData: {
      showCapsule: 1,
      title: "团购列表",
      isPage: true
    },
    entities: [],
    colors: {
      one: '#ffc0d0',
      two: '#ffe0e0',
      three: '#ffedff'
    },
    images: [],
    operations: [
      {
        text: '编辑充值'
      },
      {
        text: '移除充值'
      }
    ]
  },

  onInited: function (options) {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: async function () {
    await this.getEntities()
    wx.stopPullDownRefresh()
  },
  onTapListItem(e) {
    let entity = this.data.entities[e.detail.index]
    console.log('entity:', entity)
    let that = this;
    let operations = this.data.operations

    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '操作',
      buttons: operations,
      buttonClicked(index, item) {
        if(index === 0) {
          wx.navigateTo({
            url: `/pages/admin_deposit_manage/admin_deposit_manage?entity_id=${entity._id}`,
          })
        }
        if (index === 1) {
          $wuxDialog().confirm({
            resetOnClose: true,
            title: '',
            content: '请确定是否删除',
            onConfirm: (e, response) => {
              that.deleteEntity(entity)
            }
          })
        }
        return true
      },
    })
  },
  showEditPanel(entity) {
    console.log(entity)
  },
  async getEntities() {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'deposit.getEntity'
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

    let entities = []
    result.result.data.entities.map((item, index) => {
      entities.push({
        _id: item._id,
        title: item.name,
        isLink: true
      })
    })

    this.setData({
      entities: entities
    })
    this.hideLoading()
  },
  async goCreate() {
    wx.navigateTo({
      url: '/pages/admin_deposit_manage/admin_deposit_manage',
    })
  },
  async deleteEntity(item) {
    this.showLoading()
    let result = null;

    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "deposit.deleteEntity",
        entity_id: item._id
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
    await this.getEntities()
  }
})


Page(PageObject)