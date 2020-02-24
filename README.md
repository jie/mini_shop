# mini_shop

### 配置文件说明
```javascript
const settings = {
  app_id: '', // 微信小程序appid
  app_secret: '' // 微信小程序appsecret,
  enviroment: 'pro' // 当前环境,
  cloudenv: 'cake-dev-rlbcr' // 云开发环境名称,
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
