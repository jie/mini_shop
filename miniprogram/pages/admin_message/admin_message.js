import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
import {asyncSubscribeMsg} from '../../utils/async_tools/async_subscribe_msg.js'
const moment = require('../../utils/moment.min.js')
import {
  CallCloudFuncAPI
} from '../../utils/async_cloudfunc.js'
import {
  $wuxDialog
} from '../../components/wux-weapp/index'

const PageObject = mergePages({}, BaseMixin, {
  data: {
    total: 0,
    templates: []
  },
  onInited(options) {
    this.getTemplates()
  },
  async getTemplates() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main", {
          apiName: "adminAPI.getSubscribeMessageTpls",
        }
      )
    } catch (e) {
      console.error(e)
      this.hideLoading()
      return
    }

    this.hideLoading()
    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
    } else {
      this.setData({
        templates: res.result.data.templates
      })
    }

  },
  async submitForm(e) {
    console.log(e)
    let tpl = this.data.templates[parseInt(e.detail.value.index)]
    wx.requestSubscribeMessage({
      tmplIds: [tpl.templateId],
      success: (res) => {
        this.showToast({
          title: 'subscribe_success'
        })
      }, 
      fail: (err)=>{
        console.log(err)
      }
    })
  }
})

Page(PageObject)