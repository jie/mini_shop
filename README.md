# mini_shop

使用微信云开发制作的微信小程序商城，无需单独部署接口，支持微信支付

## 安装说明

* 使用git下载项目到本地或直接下载文件到本地

git下载
```
git clone https://github.com/jie/mini_shop.git
cd mini_shop
```
文件下载
```
wget https://github.com/jie/mini_shop/releases/latest
```
* 按照下面说明修改小程序配置

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
```
