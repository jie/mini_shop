var inquirer = require('inquirer');
const program = require('commander');
var chalkPipe = require('chalk-pipe');
var writeFile = require('./libs').writeFile

var questions = [{
  type: 'input',
  name: 'title',
  message: "微信小程序标题"
},
{
  type: 'input',
  name: 'appid',
  message: "微信小程序appid"
},
{
  type: 'input',
  name: 'appsecret',
  message: "微信小程序appsecret"
},
{
  type: 'input',
  name: 'cloudenv',
  message: "微信云开发环境名称"
},
{
  type: 'input',
  name: 'wxpay_appid',
  message: "微信支付appid(选填)"
},
{
  type: 'input',
  name: 'wxpay_mch_id',
  message: "微信支付商户号(选填)"
},
{
  type: 'input',
  name: 'wxpay_notify_url',
  message: "微信支付回调地址(选填)"
},
{
  type: 'input',
  name: 'wxpay_key',
  message: "微信支付Key(选填)"
},
  // {
  //     type: 'input',
  //     name: 'phone',
  //     message: "What's your phone number",
  //     validate: function (value) {
  //         var pass = value.match(
  //             /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
  //         );
  //         if (pass) {
  //             return true;
  //         }

  //         return 'Please enter a valid phone number';
  //     }
  // }
];


async function initProject() {

  inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    var appConfig = {
      app_id: answers.appid, // 微信小程序appid
      enviroment: answers.env, // 当前环境
      cloudenv: answers.cloudenv, // 云开发环境名称
      HomePage: "/pages/home/home", // 首页路径
      // tabs页面
      TAB_URLS: [
        "/pages/home/home",
        "/pages/me/me",
        "/pages/goods/goods"
      ],
      // 主题颜色
      Theme: {
        BgColor: "#d9262f",
        lightColor: "#F0f0f2",
        lightColor2: "#f4f4f2",
        blueColor: "#7dd3da",
        redColor: "#e67774",
        greenColor: "#8dbb6a"
      },
      // 提示信息固定时间（短）
      shortTipDuration: 2000,
      // 提示信息固定时间（长）
      longTipDuration: 4000
    }

    var apiConfig = {
      cloudenv: answers.cloudenv, // 微信云开发环境名称
      app_id: answers.appid, // 微信小程序appid
      app_secret: answers.appsecret, // 微信小程序appsecret
      wechat_access_token_record_id: '', // 在微信云数据库里配置的wechat_token表第一条记录的id
      // 微信支付
      wechat_pay: {
        appid: answers.wxpay_appid, // 微信支付appid
        mch_id: answers.wxpay_mch_id, // 微信支付商户号
        ip: "", // 填写任意ip地址
        notify_url: answers.wxpay_notify_url, // 微信支付通知Url
        key: answers.wxpay_key, // 微信支付Key
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder" // 微信统一下单接口地址
      }
    }
    var appConfigPath = '../miniprogram/settings/config.txt';
    var apiConfigPath = '../cloudfunctions/main/config.txt';
    console.log(writeFile)
    writeFile(appConfigPath, JSON.stringify(appConfig), function () {
      writeFile(apiConfigPath, JSON.stringify(apiConfig), function () {
        console.log('finished job.')
      })
    })

  })


}

async function main() {
  program.command('init').action(initProject);
  await program.parseAsync(process.argv);
}

main()