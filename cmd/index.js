const inquirer = require('inquirer');
const program = require('commander');
const wechat = require('./wechat')
const writeFile = require('./libs').writeFile
const settings = require('./settings')
var appConfigPath = '../miniprogram/settings/config.txt';
var apiConfigPath = '../cloudfunctions/main/cloud_settings.json';
var projectConfigPath = '../project.config.json';

var questions2 = [{
  type: 'input',
  name: 'cloudenv',
  message: "微信云开发环境ID",
  validate: function (value) {
    if (value) {
      return true;
    }

    return '请填写小程序云开发环境ID';
  }
}]
var questions = [{
    type: 'input',
    name: 'projectname',
    message: "微信小程序项目名称，请使用英文",
    validate: function (value) {
      if (value) {
        return true;
      }

      return '请填写小程序项目名称，将配置到小程序项目设置中';
    }
  }, {
    type: 'input',
    name: 'title',
    message: "微信小程序标题",
    validate: function (value) {
      if (value) {
        return true;
      }

      return '请填写小程序标题，将显示在小程序顶部';
    }
  },
  {
    type: 'input',
    name: 'appid',
    message: "微信小程序appid",
    validate: function (value) {
      if (value) {
        return true;
      }

      return '请填写小程序appid';
    }
  },
  {
    type: 'input',
    name: 'appsecret',
    message: "微信小程序appsecret",
    validate: function (value) {
      if (value) {
        return true;
      }

      return '请填写小程序appsecret';
    }
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
  }
]

async function initProject() {
  inquirer.prompt(questions).then(async function (answers) {
    settings.projectSettings.appid = answers.appid
    settings.projectSettings.projectname = answers.projectname
    await writeFile(projectConfigPath, JSON.stringify(settings.projectSettings, null, 2))
    console.log('项目创建成功， 请打开微信开发者工具导入本项目')
    console.log('然后在微信开发者工具里点击>云开发>设置>环境名称>创建新环境')
    console.log('记录生成的环境ID，然后开始生成小程序配置')
    initApp(answers)
  })
}



async function initApp(config) {
  inquirer.prompt(questions2).then(async function (answers) {
    var appConfig = {
      app_id: config.appid, // 微信小程序appid
      enviroment: 'pro', // 当前环境
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
        greenColor: "#8wechatb6a"
      },
      // 提示信息固定时间（短）
      shortTipDuration: 2000,
      // 提示信息固定时间（长）
      longTipDuration: 4000
    }

    var apiConfig = {
      cloudenv: answers.cloudenv, // 微信云开发环境名称
      app_id: config.appid, // 微信小程序appid
      app_secret: config.appsecret, // 微信小程序appsecret
      wechat_access_token_record_id: '', // 在微信云数据库里配置的wechat_token表第一条记录的id
      // 微信支付
      wechat_pay: {
        appid: config.wxpay_appid, // 微信支付appid
        mch_id: config.wxpay_mch_id, // 微信支付商户号
        ip: "", // 填写任意ip地址
        notify_url: config.wxpay_notify_url, // 微信支付通知Url
        key: config.wxpay_key, // 微信支付Key
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder" // 微信统一下单接口地址
      }
    }

    await writeFile(appConfigPath, JSON.stringify(appConfig, null, 2))
    await writeFile(apiConfigPath, JSON.stringify(apiConfig, null, 2))

    console.log('正在从微信获取accessToken')
    var result = await wechat.getAccessToken(config.appid, config.appsecret)
    if (!result.status) {
      console.log(`[FAIL]${result.code}, ${result.message}`)
      return
    }
    var accessToken = result.data.data.access_token
    console.log('开始初始化云数据库')
    await initDatabase(accessToken, config.cloudenv)
  })
}

async function initDatabase(accessToken, cloudenv) {
  var result = await wechat.createCollections(accessToken, "goods", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "orders", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "slide", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "user", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "depositCard", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "delivery", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  var result = await wechat.createCollections(accessToken, "admin", cloudenv)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }

  var depositRecordsQuery = `db.collection(\"depositCard\").add({
      data: ${JSON.stringify(settings.depositCards)}
    })`
  var result = await wechat.addRecords(accessToken, cloudenv, depositRecordsQuery)
  console.log(result)
  if (!result.status) {
    console.error(`[FAIL]${result.code}, ${result.message}`)
    return
  }
  console.log('项目创建成功')
}

async function main() {
  program.command('init').action(initProject);
  await program.parseAsync(process.argv);
}

main()