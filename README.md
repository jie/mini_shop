# Miniprogram Shop

使用微信云开发制作的微信小程序商城，无需单独部署接口，支持微信支付

## 主要功能
1. 商品管理

当前仅支持在微信云数据库里直接管理商品

2. 微信支付

3. 用户分享

小程序在微信用户分享时会记录用户关系

## 使用说明

1. **使用git下载项目到本地或直接下载文件到本地**

git下载
```
git clone https://github.com/jie/mini_shop.git
cd mini_shop
```
文件下载
```
wget https://github.com/jie/mini_shop/releases/latest
```
2. **按照下面说明修改小程序配置**

创建文件: miniprogram/settings/settings.pro.js
```javascript
const settings = {
  app_id: '', // 微信小程序appid
  enviroment: 'pro' // 当前环境,
  cloudenv: '' // 云开发环境名称,
  HomePage: '/pages/home/home' // 首页路径,
  // tabs页面
  TAB_URLS: [
    '/pages/home/home',
    '/pages/me/me',
    '/pages/goods/goods',
  ],
  // 主题颜色
  Theme: {
    BgColor: '#d9262f',
    lightColor: '#F0f0f2',
    lightColor2: '#f4f4f2',
    blueColor: '#7dd3da',
    redColor: '#e67774',
    greenColor: '#8dbb6a'
  },
  // 提示信息固定时间（短）
  shortTipDuration: 2000,
  // 提示信息固定时间（长）
  longTipDuration: 4000
}
export default settings;
```

3. **按照下面说明修改微信云开发配置**

创建文件: cloudfunction/main/settings.js

```javascript
const settings = {
  cloudenv: '', // 微信云开发环境名称
  app_id: '', // 微信小程序appid
  app_secret: '', // 微信小程序appsecret
  wechat_access_token_record_id: '', // 在微信云数据库里配置的wechat_token表第一条记录的id
  // 微信支付
  wechat_pay: {
    appid: "", // 微信支付appid
    mch_id: "", // 微信支付商户号
    ip: "", // 填写任意ip地址
    notify_url: "", // 微信支付通知Url
    key: "", 微信支付Key
    url: "https://api.mch.weixin.qq.com/pay/unifiedorder" // 微信统一下单接口地址
  }
}

module.exports = settings
```
