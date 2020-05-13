import moment from './utils/moment.min.js'
import settings from './settings/index'
import appConfig from './settings/appConfig'
moment.locale('zh-cn');

App({
  onLaunch: function (e) {
    console.log('onLaunch:', e)
    if (e.scene == 1007 || e.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    let menuButtonObject = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: (res) => {
        let statusBarHeight = res.statusBarHeight
        let navTop = menuButtonObject.top
        let navHeight = statusBarHeight + menuButtonObject.height + (navTop - statusBarHeight) * 2
        this.globalData.navHeight = navHeight
        this.globalData.navTop = navTop
      }
    })

    this.loadSettings()

    this.globalData.systemInfo = wx.getSystemInfoSync()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: settings.config.cloudenv,
        traceUser: true,
      })
    }


    if(e.query.invite_by) {
      wx.setStorageSync('invite_by', invite_by)
    }

    if (e.query.invite_from) {
      wx.setStorageSync('invite_from', invite_from)
    }

    const sessionid = wx.getStorageSync('sessionid')
    if (sessionid) {
      console.log('sessionid:', sessionid)
      this.goToURL(e.query.nextpage || settings.config.HomePage)
    } else {
      if(e.query.nextpage) {
        wx.setStorageSync('nextpage_registed', e.query.nextpage)
      }
    }
  },
  isTab: function (url) {
    let flag = false;
    console.log('settings:', settings.config)
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
  loadSettings() {
      settings.loadConfig(appConfig)
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    share: false,  // 分享默认为false
    navTop: 0,
    navHeight: 0
  }
})
