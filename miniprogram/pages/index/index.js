import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
const app = getApp()


const PageObject = mergePages({}, BaseMixin, {
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    nextpage: null
  },

  onInited: function(options) {
    // 获取用户信息
    this.showLoading()
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      },
      complete: () => {
        this.hideLoading()
      }
    })
  },

  onGetUserInfo: function(e) {
    console.log(e)
    let that = this
    this.showLoading()
    wx.cloud.callFunction({
      name: 'main',
      data: {
        apiName: 'loginAPI.login',
        userinfo: e.detail.userInfo
      },
      success: res => {
        console.log('onlogin')
        console.log(res)
        if (res.result.status) {
          app.globalData.openid = res.result.data.openid
          if (res.result.data.registed) {
            wx.setStorageSync('sessionid', res.result.data.openid)
          }

          if (res.result.status) {
            that.goToURL(res.result.data.nextpage)
          }
        } else if (res.result.status === false && res.result.message == 'user_not_found') {
          wx.navigateTo({
            url: '/pages/regist/regist'
          })
        }

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      },
      complete: () => {
        console.log(this)
        this.hideLoading()
      }
    })
  },


  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})


Page(PageObject)