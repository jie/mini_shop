import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import settings from '../../settings/index'
import moment from '../../utils/moment.min.js'
import message from './message'
import { $wuxDialog } from '../../components/wux-weapp/index'
const app = getApp()

module.exports = {
  data: {
    pageName: null,
    language: {},
    locale: null,
    systemInfo: null,
    settings: settings.config
  },
  checkSession() {
    let sessionid = wx.getStorageSync('sessionid')
    if (!sessionid) {
      let current_url = this.getCurrentPath()
      if (!current_url.includes('home/home')) {
        wx.reLaunch({
          url: `${settings.config.HomePage}?nextpage=${encodeURIComponent(current_url)}`,
        })
      } else {
        wx.reLaunch({
          url: settings.config.HomePage,
        })
      }
    }
  },
  showToast(options) {
    console.log('options:', options)
    let title = message[options.title]
    console.log('message:',  message)
    console.log(title)
    if(!title) {
      title = '系统内部错误'
    }
    let myOptions = {
      icon: 'none',
      duration: settings.config.shortTipDuration,
      ...options
    }
    myOptions.title = title
    console.log(myOptions)
    wx.showToast(myOptions)
  },
  hideToast() {
    wx.hideToast()
  },
  showDialog(newConfig, isConfirm = false) {
    let config = Object.assign({},
      {
        resetOnClose: true,
        title: '',
        content: ''
      },
      newConfig
    )
    if (isConfirm) {
      $wuxDialog().confirm(config)
    } else {
      $wuxDialog().alert(config)
    }
  },
  onReachBottom: function () {
    wx.stopPullDownRefresh();
  },

  showLoading(message) {
    wx.showLoading({
      title: message || '加载中...',
    })
  },
  hideLoading() {
    wx.hideLoading()
  },
  onLoad: function (options) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    console.log('systemInfo:', this.data.systemInfo)
    if (options.invite_code) {
      wx.setStorage({
        key: 'invite_code',
        data: options.invite_code,
      })
    }

    if (this.onInited) {
      this.onInited(options)
    }
  },
  getCurrentPath: function () {
    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    if (currPage.options) {
      let queryStr = this.joinUrlKey(currPage.options);
      return `/${currPage.route}?${queryStr}`
    } else {
      return `/${currPage.route}`
    }
  },
  joinUrlKey: function (keys) {
    return Object.keys(keys).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(keys[k]);
    }).join('&')
  },
  isTab: function (url) {
    let flag = false;
    for (let item of settings.config.TAB_URLS) {
      if (url.includes(item)) {
        return true
      }
    }
    return flag
  },
  goToURL: function (url) {
    if (this.isTab(url)) {
      wx.switchTab({
        url: url
      })
    } else {
      wx.redirectTo({
        url: url
      })
    }
  },
  formatEventDate(s1, e1) {
    let startDate = moment(s1)
    let endDate = moment(e1)
    if (startDate.format('YYYY-MM-DD') == endDate.format('YYYY-MM-DD')) {
      return `${startDate.format('YYYY-MM-DD HH:mm')}-${endDate.format('HH:mm')}`
    } else {
      return `${startDate.format('YYYY-MM-DD HH:mm')}-${endDate.format('YYYY-MM-DD HH:mm')}`
    }
  },
  onShareAppMessage: function () {

  }
}