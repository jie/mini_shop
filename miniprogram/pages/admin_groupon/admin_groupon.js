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
    buycart: null,
    images: [],
    operations: [
      {
        text: '上架商品'
      },
      {
        text: '移除团购'
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
  async getEntities() {
    this.showLoading()
    let result = null
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: 'groupon.getGroupon'
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
  async goGrouponManage() {
    wx.navigateTo({
      url: '/pages/admin_groupon_manage/admin_groupon_manage',
    })
  },
  onClickEntity: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/admin_groupon_manage/admin_groupon_manage?entity_id=${e.currentTarget.dataset.entityid}`,
    })
  },
  async toggleShelveGroupon(item) {
    this.showLoading()
    let result = null;

    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "groupon.updateGrouponProperties",
        groupon_id: item._id,
        groupon: {
          on_shelve: !item.on_shelve
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
    await this.getEntities()

  },

  async deleteGroupon(item) {
    this.showLoading()
    let result = null;

    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "groupon.deleteGroupon",
        groupon_id: item._id
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

  },

  onLongTapEntity(e) {
    let that = this;
    let index = e.currentTarget.dataset.itemindex;
    let entity = this.data.entities[index]
    let operations = this.data.operations
    if(entity.on_shelve) {
      operations[0].text = '下架团购'
    } else {
      operations[0].text = '上架团购'
    }
    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '操作商品',
      buttons: operations,
      buttonClicked(index, item) {
        if(index === 0) {
          that.toggleShelveGroupon(entity)
        }
        if (index === 1) {
          $wuxDialog().confirm({
            resetOnClose: true,
            title: '',
            content: '请确定是否删除',
            onConfirm: (e, response) => {
              that.deleteGroupon(entity)
            }
          })
        }
        return true
      },
    })
  },
  async setEntitySeq(groupon, seq) {
    this.showLoading()
    let result = null;
    if(seq === '') {
      seq = 0
    }
    try {
      result = await CallCloudFuncAPI('admin', {
        apiName: "groupon.updateGrouponProperties",
        groupon_id: groupon._id,
        groupon: {
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
      this.getEntities()
    }, this.data.settings.shortTipDuration)
  },
  showSortDialog(entity) {
    let that = this
    console.log(entity)
    $wuxDialog().prompt({
      resetOnClose: true,
      title: '设置商品排序',
      content: '数字越小商品越靠前',
      fieldtype: 'number',
      defaultText: entity.seq || 0,
      placeholder: '请输入排序数字',
      maxlength: 8,
      onConfirm(e, response) {
        that.setEntitySeq(entity, response)
      },
    })
  },
})


Page(PageObject)