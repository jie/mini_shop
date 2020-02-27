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

module.exports = {
  depositCards: depositCards,
  projectSettings: projectSettings
}