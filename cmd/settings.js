const depositCards = [{
    "is_enable": true,
    "name": "100元",
    "value": "100",
    "real_value": "100",
    "style": "e",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  },
  {
    "is_enable": true,
    "name": "200元",
    "value": "200",
    "real_value": "200",
    "style": "d",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  },
  {
    "is_enable": true,
    "name": "500元",
    "value": "500",
    "real_value": "550",
    "style": "f",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  },
  {
    "is_enable": true,
    "name": "1000元",
    "value": "1000",
    "real_value": "1150",
    "style": "b",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  },
  {
    "is_enable": true,
    "name": "2000元",
    "value": "2000",
    "real_value": "2400",
    "style": "c",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  },
  {
    "is_enable": true,
    "name": "5000元",
    "value": "5000",
    "real_value": "6500",
    "style": "a",
    "remark": "",
    "create_at": new Date(),
    "update_at": new Date(),
    "image": ""
  }
]


const projectSettings = {
  "miniprogramRoot": "miniprogram/",
  "cloudfunctionRoot": "cloudfunctions/",
  "setting": {
    "urlCheck": true,
    "es6": true,
    "postcss": true,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "nodeModules": true,
    "autoAudits": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    }
  },
  "appid": "",
  "projectname": "",
  "libVersion": "2.10.2",
  "simulatorType": "wechat",
  "simulatorPluginLibVersion": {},
  "cloudfunctionTemplateRoot": "cloudfunctionTemplate",
  "condition": {
    "search": {
      "current": -1,
      "list": []
    },
    "conversation": {
      "current": -1,
      "list": []
    },
    "plugin": {
      "current": -1,
      "list": []
    },
    "game": {
      "list": []
    },
    "miniprogram": {}
  }
}


const slide = [{
  "url": "cloud://cake-dev-rlbcr.6361-cake-dev-rlbcr-1259778713/home_production/IMG_4286.JPG",
  "name": "",
  "seq": 0,
  "is_enable": true
}]

const goods = [{
    "create_at": new Date(),
    "name": "蒜香芝士软欧",
    "name_en": "Garlic Cheese Soft Europe",
    "cover": "cloud://cake-dev-rlbcr.6361-cake-dev-rlbcr-1259778713/goods_production/蒜香芝士软欧.jpg",
    "is_enable": true,
    "parameters": [{
      "summary": "",
      "summary_en": "",
      "key": "",
      "value": [{
        "name": "220克",
        "name_en": "220kg"
      }],
      "name": "面粉",
      "name_en": ""
    }, {
      "summary": "",
      "summary_en": "",
      "key": "",
      "value": [{
        "name": "33克",
        "name_en": "3kg"
      }],
      "name": "大蒜",
      "name_en": ""
    }, {
      "summary": "",
      "summary_en": "",
      "key": "",
      "value": [{
        "name": "60克",
        "name_en": "60kg"
      }],
      "name": "芝士",
      "name_en": ""
    }],
    "content": "",
    "update_at": new Date(),
    "price": "20.00",
    "display_price": "20.00",
    "num": 10.0,
    "sell_num": 0.0,
    "related": [{
      "cover": "",
      "display_price": "",
      "price": "",
      "id": "",
      "name": "",
      "name_en": ""
    }],
    "tags": [{
      "name": "吐司",
      "name_en": "toast"
    }],
    "category": {
      "name_en": "Low sugar low fat whole wheat series",
      "id": "",
      "name": "低糖低脂全麦系列",
      "cover": ""
    },
    "media": [{
      "type": "image",
      "url": "",
      "summary": "",
      "summary_en": ""
    }]
  }

]

module.exports = {
  depositCards: depositCards,
  projectSettings: projectSettings,
  slide: slide,
  goods: goods
}