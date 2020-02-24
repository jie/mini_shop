
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'

const genderTypes = [
  {
    label: '男',
    value: '0'
  },
  {
    label: '女',
    value: '1'
  },
]


const PageObject = mergePages({}, BaseMixin, {
  data: {
    userInfo: null,
    genderTypes: genderTypes,
    genderName: '',
    birthEndDay: null
  },
  onInited(options) {
    this.setData({
      birthEndDay: moment().format('YYYY-MM-DD')
    })
    wx.startPullDownRefresh()
  },
  async getProfile() {
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "getProfile"
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

    }

    if (!res.result.status) {
      this.showToast({
        title: res.result.message
      })
      this.hideLoading()
      wx.stopPullDownRefresh()
      return
    }

    this.setData({
      userInfo: res.result.data.user,
      genderName: genderTypes[parseInt(res.result.data.user.gender)].label
    })

    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  async bindGenderChange(e) {
    this.showLoading()
    this.setData({
      'userInfo.gender': this.data.genderTypes[e.detail.value].value,
      genderName: this.data.genderTypes[e.detail.value].label
    })
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "userAPI.updateGender",
          gender: this.data.userInfo.gender
        }
      )
    } catch (e) {
      this.hideLoading()
      this.showToast({
        title: e.message
      })
      console.error(e)
      return
    }

    if (res.result.status) {
      console.log(res)
      this.hideLoading()
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)

    }
  },
  async bindDateChange(e) {
    console.log(e)
    this.showLoading()
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "userAPI.updateBirthday",
          birthday: e.detail.value
        }
      )
    } catch (e) {
      this.hideLoading()
      this.showToast({
        title: e.message
      })
      console.error(e)
      return
    }

    if (res.result.status) {
      console.log(res)
      this.hideLoading()
      this.showToast({
        icon: 'success',
        title: 'ok'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, this.data.settings.shortTipDuration)

    }
  },
  onPullDownRefresh: function () {
    this.getProfile()
  },
})

Page(PageObject)