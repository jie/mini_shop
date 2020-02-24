
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import BaseMixin from '../base/base'
import mergePages from '../../utils/objectUtils'
const moment = require('../../utils/moment.min.js')
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc.js'
import { $wuxDialog } from '../../components/wux-weapp/index'


const PageObject = mergePages({}, BaseMixin, {
  data: {
    sessionid: '',
    action: '',
    imagePath: null,
    userInfo: null,
    admin: null,
    myList: [
      {
        key: 'userinfo',
        isLink: true,
        title: '个人资料',
        value: '',
        color: '#666',
        iconColor: '#F56C6C',
        titleColor: '#999',
        // icon: 'ios-contact',
        url: "/pages/profile/profile"
      },
      {
        key: 'balance',
        isLink: true,
        title: '查询余额',
        value: '',
        color: '#666',
        iconColor: '#F56C6C',
        titleColor: '#999',
        // icon: 'ios-contact'
      },
      {
        key: 'orders',
        isLink: true,
        title: '我的订单',
        value: '',
        color: '#666',
        iconColor: '#F56C6C',
        titleColor: '#999',
        // icon: 'ios-list-box',
        url: "/pages/orders/orders"
      },
      {
        key: 'logout',
        isLink: true,
        title: '退出登录',
        value: '',
        color: '#666',
        iconColor: '#F56C6C',
        titleColor: '#999',
        // icon: 'ios-log-out'
      }
    ],
    staffList: [
      {
        key: 'users',
        isLink: true,
        title: '客户',
        value: '',
        color: '#07C160',
        iconColor: '#07C160',
        titleColor: '#07C160',
        // icon: 'ios-log-out'
        url: "/pages/users/users"
      },
      {
        key: 'all_orders',
        isLink: true,
        title: '订单',
        value: '',
        color: '#07C160',
        iconColor: '#07C160',
        titleColor: '#07C160',
        // icon: 'ios-log-out'
        url: "/pages/all_orders/all_orders"
      },
      {
        key: 'admin_message',
        isLink: true,
        title: '消息推送',
        value: '',
        color: '#07C160',
        iconColor: '#07C160',
        titleColor: '#07C160',
        // icon: 'ios-log-out'
        url: "/pages/admin_message/admin_message"
      }
    ]
  },
  onPullDownRefresh: function () {
    this.getProfile()
  },
  getHeaderCanvas: function () {
    var ctx = wx.createCanvasContext('canvas')
    // Draw quadratic curve
    ctx.beginPath()
    ctx.moveTo(0, 60)
    ctx.bezierCurveTo(20, 100, 200, 80, this.data.systemInfo.windowWidth, -30)
    ctx.lineTo(this.data.systemInfo.windowWidth, 0)
    ctx.lineTo(0, 0)
    ctx.lineTo(0, 60)
    ctx.setFillStyle('#fde2e2')
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, 45)
    ctx.bezierCurveTo(20, 100, 200, 90, this.data.systemInfo.windowWidth, -50)
    ctx.lineTo(this.data.systemInfo.windowWidth, 0)
    ctx.lineTo(0, 0)
    ctx.lineTo(0, 45)
    ctx.setFillStyle('#f56c6c')
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, 30)
    ctx.bezierCurveTo(20, 60, 160, 130, this.data.systemInfo.windowWidth, -60)
    ctx.lineTo(this.data.systemInfo.windowWidth, 0)
    ctx.lineTo(0, 0)
    ctx.lineTo(0, 30)
    ctx.setFillStyle(this.data.settings.Theme.redColor)
    ctx.fill()

    ctx.draw(false, () => {
      this.canvasToTempImage();
    })
  },

  canvasToTempImage: function () {
    wx.canvasToTempFilePath({
      canvasId: "canvas",
      success: (res) => {
        let tempFilePath = res.tempFilePath;
        this.setData({
          imagePath: tempFilePath,
        });
      }
    }, this);
  },
  onInited: function (options) {
    this.getHeaderCanvas()
    wx.startPullDownRefresh()
  },
  onTapListItem: async function (e) {
    console.log('onTapListItem:', e)
    let index = e.detail.index;
    let item = this.data.myList[index]
    if (item.key == 'logout') {
      this.showDialog({
        title: '',
        content: '确定是否退出登录',
        onConfirm: (e) => {
          this.logout()
        },
        onCancel(e) {

        },
      }, true)
    } else if (item.key == 'balance') {
      await this.getProfile()
      let balance = this.data.userInfo.balance ? this.data.userInfo.balance : 0
      $wuxDialog().alert({
        title: '您当前的余额为',
        content: `${balance}元`
      })
    }

  },
  onTapStaffListItem: async function (e) {
    console.log('onTapListItem:', e)
    let index = e.detail.index;
    let item = this.data.staffList[index]
  },
  onGotUserInfo: function (res) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        this.getRegistKey(res.code)
      },
      fail: () => {
      }
    })

  },
  logout: function (res) {
    wx.clearStorageSync()
  },
  async getProfile() {
    this.showLoading()
    let that = this
    let res = null
    try {
      res = await CallCloudFuncAPI(
        "main",
        {
          apiName: "getProfile"
        }
      )
    } catch (e) {
      this.hideLoading()
      console.error(e)
      return
    }


    if (res) {
      this.setData({
        userInfo: res.result.data.user
      })

      if(res.result.data.admin && res.result.data.admin.id) {
        this.setData({admin: res.result.data.admin})
        wx.setStorageSync('admin', res.result.data.admin)
      }
    }
    this.hideLoading()
    wx.stopPullDownRefresh()
  }
})

Page(PageObject)