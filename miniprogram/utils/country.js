const countries = [
  {
    "en": "AFGHANISTAN",
    "abbr": "AF",
    "cn": "阿富汗",
    "id": 4
  },
  {
    "en": "ÅLAND ISLANDS",
    "abbr": "AX",
    "cn": "奥兰群岛(芬兰属)",
    "id": 248
  },
  {
    "en": "ALBANIA",
    "abbr": "AL",
    "cn": "阿尔巴尼亚",
    "id": 8
  },
  {
    "en": "ALGERIA",
    "abbr": "DZ",
    "cn": "阿尔及利亚",
    "id": 12
  },
  {
    "en": "AMERICAN SAMOA",
    "abbr": "AS",
    "cn": "美属萨摩亚",
    "id": 16
  },
  {
    "en": "ANDORRA",
    "abbr": "AD",
    "cn": "安道尔",
    "id": 20
  },
  {
    "en": "ANGOLA",
    "abbr": "AO",
    "cn": "安哥拉",
    "id": 24
  },
  {
    "en": "ANGUILLA",
    "abbr": "AI",
    "cn": "安圭拉岛",
    "id": 660
  },
  {
    "en": "ANTARCTICA",
    "abbr": "AQ",
    "cn": "南极洲",
    "id": 10
  },
  {
    "en": "ANTIGUA AND BARBUDA",
    "abbr": "AG",
    "cn": "安提瓜和巴布达",
    "id": 28
  },
  {
    "en": "ARGENTINA",
    "abbr": "AR",
    "cn": "阿根廷",
    "id": 32
  },
  {
    "en": "ARMENIA",
    "abbr": "AM",
    "cn": "亚美尼亚",
    "id": 51
  },
  {
    "en": "ARUBA",
    "abbr": "AW",
    "cn": "阿鲁巴",
    "id": 533
  },
  {
    "en": "AUSTRALIA",
    "abbr": "AU",
    "cn": "澳大利亚",
    "id": 36
  },
  {
    "en": "AUSTRIA",
    "abbr": "AT",
    "cn": "奥地利",
    "id": 40
  },
  {
    "en": "AZERBAIJAN",
    "abbr": "AZ",
    "cn": "阿塞拜疆",
    "id": 31
  },
  {
    "en": "BAHAMAS",
    "abbr": "BS",
    "cn": "巴哈马",
    "id": 44
  },
  {
    "en": "BAHRAIN",
    "abbr": "BH",
    "cn": "巴林",
    "id": 48
  },
  {
    "en": "BANGLADESH",
    "abbr": "BD",
    "cn": "孟加拉国",
    "id": 50
  },
  {
    "en": "BARBADOS",
    "abbr": "BB",
    "cn": "巴巴多斯",
    "id": 52
  },
  {
    "en": "BELARUS",
    "abbr": "BY",
    "cn": "白俄罗斯",
    "id": 112
  },
  {
    "en": "BELGIUM",
    "abbr": "BE",
    "cn": "比利时",
    "id": 56
  },
  {
    "en": "BELIZE",
    "abbr": "BZ",
    "cn": "伯利兹",
    "id": 84
  },
  {
    "en": "BENIN",
    "abbr": "BJ",
    "cn": "贝宁",
    "id": 204
  },
  {
    "en": "BERMUDA",
    "abbr": "BM",
    "cn": "百慕大群岛",
    "id": 60
  },
  {
    "en": "BHUTAN",
    "abbr": "BT",
    "cn": "不丹",
    "id": 64
  },
  {
    "en": "BOLIVIA, PLURINATIONAL STATE OF",
    "abbr": "BO",
    "cn": "玻利维亚",
    "id": 68
  },
  {
    "en": "BOSNIA AND HERZEGOVINA",
    "abbr": "BA",
    "cn": "波斯尼亚和黑塞哥维那",
    "id": 70
  },
  {
    "en": "BOTSWANA",
    "abbr": "BW",
    "cn": "博茨瓦纳",
    "id": 72
  },
  {
    "en": "BOUVET ISLAND",
    "abbr": "BV",
    "cn": "布韦岛",
    "id": 74
  },
  {
    "en": "BRAZIL",
    "abbr": "BR",
    "cn": "巴西",
    "id": 76
  },
  {
    "en": "BRITISH INDIAN OCEAN TERRITORY",
    "abbr": "IO",
    "cn": "英属印度洋领地",
    "id": 86
  },
  {
    "en": "BRUNEI DARUSSALAM",
    "abbr": "BN",
    "cn": "文莱",
    "id": 96
  },
  {
    "en": "BULGARIA",
    "abbr": "BG",
    "cn": "保加利亚",
    "id": 100
  },
  {
    "en": "BURKINA FASO",
    "abbr": "BF",
    "cn": "布基纳法索",
    "id": 854
  },
  {
    "en": "BURUNDI",
    "abbr": "BI",
    "cn": "布隆迪",
    "id": 108
  },
  {
    "en": "CAMBODIA",
    "abbr": "KH",
    "cn": "柬埔寨",
    "id": 116
  },
  {
    "en": "CAMEROON",
    "abbr": "CM",
    "cn": "喀麦隆",
    "id": 120
  },
  {
    "en": "CANADA",
    "abbr": "CA",
    "cn": "加拿大",
    "id": 124
  },
  {
    "en": "CAPE VERDE",
    "abbr": "CV",
    "cn": "佛得角",
    "id": 132
  },
  {
    "en": "CAYMAN ISLANDS",
    "abbr": "KY",
    "cn": "开曼群岛",
    "id": 136
  },
  {
    "en": "CENTRAL AFRICAN REPUBLIC",
    "abbr": "CF",
    "cn": "中非共和国",
    "id": 140
  },
  {
    "en": "CHAD",
    "abbr": "TD",
    "cn": "乍得",
    "id": 148
  },
  {
    "en": "CHILE",
    "abbr": "CL",
    "cn": "智利",
    "id": 152
  },
  {
    "en": "CHINA",
    "abbr": "CN",
    "cn": "中国",
    "id": 156
  },
  {
    "en": "CHRISTMAS ISLAND",
    "abbr": "CX",
    "cn": "圣诞岛",
    "id": 162
  },
  {
    "en": "COCOS (KEELING) ISLANDS",
    "abbr": "CC",
    "cn": "科科斯群岛（基灵群岛）",
    "id": 166
  },
  {
    "en": "COLOMBIA",
    "abbr": "CO",
    "cn": "哥伦比亚",
    "id": 170
  },
  {
    "en": "COMOROS",
    "abbr": "KM",
    "cn": "科摩罗",
    "id": 174
  },
  {
    "en": "CONGO",
    "abbr": "CG",
    "cn": "刚果",
    "id": 178
  },
  {
    "en": "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
    "abbr": "CD",
    "cn": "刚果民主共和国",
    "id": 180
  },
  {
    "en": "COOK ISLANDS",
    "abbr": "CK",
    "cn": "库克群岛",
    "id": 184
  },
  {
    "en": "COSTA RICA",
    "abbr": "CR",
    "cn": "哥斯达黎加",
    "id": 188
  },
  {
    "en": "CÔTE D'IVOIRE",
    "abbr": "CI",
    "cn": "科特迪瓦",
    "id": 384
  },
  {
    "en": "CROATIA",
    "abbr": "HR",
    "cn": "克罗地亚",
    "id": 191
  },
  {
    "en": "CUBA",
    "abbr": "CU",
    "cn": "古巴",
    "id": 192
  },
  {
    "en": "CYPRUS",
    "abbr": "CY",
    "cn": "塞浦路斯",
    "id": 196
  },
  {
    "en": "CZECH REPUBLIC",
    "abbr": "CZ",
    "cn": "捷克共和国",
    "id": 203
  },
  {
    "en": "DENMARK",
    "abbr": "DK",
    "cn": "丹麦",
    "id": 208
  },
  {
    "en": "DJIBOUTI",
    "abbr": "DJ",
    "cn": "吉布提",
    "id": 262
  },
  {
    "en": "DOMINICA",
    "abbr": "DM",
    "cn": "多米尼加",
    "id": 212
  },
  {
    "en": "DOMINICAN REPUBLIC",
    "abbr": "DO",
    "cn": "多米尼加共和国",
    "id": 214
  },
  {
    "en": "ECUADOR",
    "abbr": "EC",
    "cn": "厄瓜多尔",
    "id": 218
  },
  {
    "en": "EGYPT",
    "abbr": "EG",
    "cn": "埃及",
    "id": 818
  },
  {
    "en": "EL SALVADOR",
    "abbr": "SV",
    "cn": "萨尔瓦多",
    "id": 222
  },
  {
    "en": "EQUATORIAL GUINEA",
    "abbr": "GQ",
    "cn": "赤道几内亚",
    "id": 226
  },
  {
    "en": "ERITREA",
    "abbr": "ER",
    "cn": "厄立特里亚",
    "id": 232
  },
  {
    "en": "ESTONIA",
    "abbr": "EE",
    "cn": "爱沙尼亚",
    "id": 233
  },
  {
    "en": "ETHIOPIA",
    "abbr": "ET",
    "cn": "埃塞俄比亚",
    "id": 231
  },
  {
    "en": "FALKLAND ISLANDS (MALVINAS)",
    "abbr": "FK",
    "cn": "福克兰群岛(马尔维纳斯群岛)",
    "id": 238
  },
  {
    "en": "FAROE ISLANDS",
    "abbr": "FO",
    "cn": "法罗群岛",
    "id": 234
  },
  {
    "en": "FIJI",
    "abbr": "FJ",
    "cn": "斐济群岛",
    "id": 242
  },
  {
    "en": "FINLAND",
    "abbr": "FI",
    "cn": "芬兰",
    "id": 246
  },
  {
    "en": "FRANCE",
    "abbr": "FR",
    "cn": "法国",
    "id": 250
  },
  {
    "en": "FRENCH GUIANA",
    "abbr": "GF",
    "cn": "法属圭亚那",
    "id": 254
  },
  {
    "en": "FRENCH POLYNESIA",
    "abbr": "PF",
    "cn": "法属波利尼西亚",
    "id": 258
  },
  {
    "en": "FRENCH SOUTHERN TERRITORIES",
    "abbr": "TF",
    "cn": "法属南极地区",
    "id": 260
  },
  {
    "en": "GABON",
    "abbr": "GA",
    "cn": "加蓬",
    "id": 266
  },
  {
    "en": "GAMBIA",
    "abbr": "GM",
    "cn": "冈比亚",
    "id": 270
  },
  {
    "en": "GEORGIA",
    "abbr": "GE",
    "cn": "乔治亚",
    "id": 268
  },
  {
    "en": "GERMANY",
    "abbr": "DE",
    "cn": "德国",
    "id": 276
  },
  {
    "en": "GHANA",
    "abbr": "GH",
    "cn": "加纳",
    "id": 288
  },
  {
    "en": "GIBRALTAR",
    "abbr": "GI",
    "cn": "直布罗陀",
    "id": 292
  },
  {
    "en": "GREECE",
    "abbr": "GR",
    "cn": "希腊",
    "id": 300
  },
  {
    "en": "GREENLAND",
    "abbr": "GL",
    "cn": "格陵兰",
    "id": 304
  },
  {
    "en": "GRENADA",
    "abbr": "GD",
    "cn": "格林纳达",
    "id": 308
  },
  {
    "en": "GUADELOUPE",
    "abbr": "GP",
    "cn": "瓜德罗普岛",
    "id": 312
  },
  {
    "en": "GUAM",
    "abbr": "GU",
    "cn": "关岛",
    "id": 316
  },
  {
    "en": "GUATEMALA",
    "abbr": "GT",
    "cn": "危地马拉",
    "id": 320
  },
  {
    "en": "GUERNSEY",
    "abbr": "GG",
    "cn": "格恩西",
    "id": 831
  },
  {
    "en": "GUINEA",
    "abbr": "GN",
    "cn": "几内亚",
    "id": 324
  },
  {
    "en": "GUINEA-BISSAU",
    "abbr": "GW",
    "cn": "几内亚比绍",
    "id": 624
  },
  {
    "en": "GUYANA",
    "abbr": "GY",
    "cn": "圭亚那",
    "id": 328
  },
  {
    "en": "HAITI",
    "abbr": "HT",
    "cn": "海地",
    "id": 332
  },
  {
    "en": "HEARD ISLAND AND MCDONALD ISLANDS",
    "abbr": "HM",
    "cn": "赫德和麦克唐纳群岛",
    "id": 334
  },
  {
    "en": "HOLY SEE (VATICAN CITY STATE)",
    "abbr": "VA",
    "cn": "梵蒂冈城",
    "id": 336
  },
  {
    "en": "HONDURAS",
    "abbr": "HN",
    "cn": "洪都拉斯",
    "id": 340
  },
  {
    "en": "HONG KONG",
    "abbr": "HK",
    "cn": "中国香港",
    "id": 344
  },
  {
    "en": "HUNGARY",
    "abbr": "HU",
    "cn": "匈牙利",
    "id": 348
  },
  {
    "en": "ICELAND",
    "abbr": "IS",
    "cn": "冰岛",
    "id": 352
  },
  {
    "en": "INDIA",
    "abbr": "IN",
    "cn": "印度",
    "id": 356
  },
  {
    "en": "INDONESIA",
    "abbr": "ID",
    "cn": "印度尼西亚",
    "id": 360
  },
  {
    "en": "IRAN, ISLAMIC REPUBLIC OF",
    "abbr": "IR",
    "cn": "伊朗",
    "id": 364
  },
  {
    "en": "IRAQ",
    "abbr": "IQ",
    "cn": "伊拉克",
    "id": 368
  },
  {
    "en": "IRELAND",
    "abbr": "IE",
    "cn": "爱尔兰",
    "id": 372
  },
  {
    "en": "ISLE OF MAN",
    "abbr": "IM",
    "cn": "马恩岛",
    "id": 833
  },
  {
    "en": "ISRAEL",
    "abbr": "IL",
    "cn": "以色列",
    "id": 376
  },
  {
    "en": "ITALY",
    "abbr": "IT",
    "cn": "意大利",
    "id": 380
  },
  {
    "en": "JAMAICA",
    "abbr": "JM",
    "cn": "牙买加",
    "id": 388
  },
  {
    "en": "JAPAN",
    "abbr": "JP",
    "cn": "日本",
    "id": 392
  },
  {
    "en": "JERSEY",
    "abbr": "JE",
    "cn": "泽西",
    "id": 832
  },
  {
    "en": "JORDAN",
    "abbr": "JO",
    "cn": "约旦",
    "id": 400
  },
  {
    "en": "KAZAKHSTAN",
    "abbr": "KZ",
    "cn": "哈萨克斯坦",
    "id": 398
  },
  {
    "en": "KENYA",
    "abbr": "KE",
    "cn": "肯尼亚",
    "id": 404
  },
  {
    "en": "KIRIBATI",
    "abbr": "KI",
    "cn": "基里巴斯",
    "id": 296
  },
  {
    "en": "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
    "abbr": "KP",
    "cn": "朝鲜",
    "id": 408
  },
  {
    "en": "KOREA, REPUBLIC OF",
    "abbr": "KR",
    "cn": "韩国",
    "id": 410
  },
  {
    "en": "KUWAIT",
    "abbr": "KW",
    "cn": "科威特",
    "id": 414
  },
  {
    "en": "KYRGYZSTAN",
    "abbr": "KG",
    "cn": "吉尔吉斯斯坦",
    "id": 417
  },
  {
    "en": "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    "abbr": "LA",
    "cn": "老挝",
    "id": 418
  },
  {
    "en": "LATVIA",
    "abbr": "LV",
    "cn": "拉脱维亚",
    "id": 428
  },
  {
    "en": "LEBANON",
    "abbr": "LB",
    "cn": "黎巴嫩",
    "id": 422
  },
  {
    "en": "LESOTHO",
    "abbr": "LS",
    "cn": "莱索托",
    "id": 426
  },
  {
    "en": "LIBERIA",
    "abbr": "LR",
    "cn": "利比里亚",
    "id": 430
  },
  {
    "en": "LIBYAN ARAB JAMAHIRIYA",
    "abbr": "LY",
    "cn": "利比亚",
    "id": 434
  },
  {
    "en": "LIECHTENSTEIN",
    "abbr": "LI",
    "cn": "列支敦士登",
    "id": 438
  },
  {
    "en": "LITHUANIA",
    "abbr": "LT",
    "cn": "立陶宛",
    "id": 440
  },
  {
    "en": "LUXEMBOURG",
    "abbr": "LU",
    "cn": "卢森堡",
    "id": 442
  },
  {
    "en": "MACAO",
    "abbr": "MO",
    "cn": "中国澳门",
    "id": 446
  },
  {
    "en": "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
    "abbr": "MK",
    "cn": "马其顿,前南斯拉夫共和国",
    "id": 807
  },
  {
    "en": "MADAGASCAR",
    "abbr": "MG",
    "cn": "马达加斯加",
    "id": 450
  },
  {
    "en": "MALAWI",
    "abbr": "MW",
    "cn": "马拉维",
    "id": 454
  },
  {
    "en": "MALAYSIA",
    "abbr": "MY",
    "cn": "马来西亚",
    "id": 458
  },
  {
    "en": "MALDIVES",
    "abbr": "MV",
    "cn": "马尔代夫",
    "id": 462
  },
  {
    "en": "MALI",
    "abbr": "ML",
    "cn": "马里",
    "id": 466
  },
  {
    "en": "MALTA",
    "abbr": "MT",
    "cn": "马耳他",
    "id": 470
  },
  {
    "en": "MARSHALL ISLANDS",
    "abbr": "MH",
    "cn": "马绍尔群岛",
    "id": 584
  },
  {
    "en": "MARTINIQUE",
    "abbr": "MQ",
    "cn": "马提尼克岛",
    "id": 474
  },
  {
    "en": "MAURITANIA",
    "abbr": "MR",
    "cn": "毛里塔尼亚",
    "id": 478
  },
  {
    "en": "MAURITIUS",
    "abbr": "MU",
    "cn": "毛里求斯",
    "id": 480
  },
  {
    "en": "MAYOTTE",
    "abbr": "YT",
    "cn": "马约特岛",
    "id": 175
  },
  {
    "en": "MEXICO",
    "abbr": "MX",
    "cn": "墨西哥",
    "id": 484
  },
  {
    "en": "MICRONESIA, FEDERATED STATES OF",
    "abbr": "FM",
    "cn": "密克罗尼西亚",
    "id": 583
  },
  {
    "en": "MOLDOVA, REPUBLIC OF",
    "abbr": "MD",
    "cn": "摩尔多瓦",
    "id": 498
  },
  {
    "en": "MONACO",
    "abbr": "MC",
    "cn": "摩纳哥",
    "id": 492
  },
  {
    "en": "MONGOLIA",
    "abbr": "MN",
    "cn": "蒙古",
    "id": 496
  },
  {
    "en": "MONTENEGRO",
    "abbr": "ME",
    "cn": "门的内哥罗(黑山)",
    "id": 499
  },
  {
    "en": "MONTSERRAT",
    "abbr": "MS",
    "cn": "蒙特塞拉特",
    "id": 500
  },
  {
    "en": "MOROCCO",
    "abbr": "MA",
    "cn": "摩洛哥",
    "id": 504
  },
  {
    "en": "MOZAMBIQUE",
    "abbr": "MZ",
    "cn": "莫桑比克",
    "id": 508
  },
  {
    "en": "MYANMAR",
    "abbr": "MM",
    "cn": "缅甸",
    "id": 104
  },
  {
    "en": "NAMIBIA",
    "abbr": "NA",
    "cn": "纳米比亚",
    "id": 516
  },
  {
    "en": "NAURU",
    "abbr": "NR",
    "cn": "瑙鲁",
    "id": 520
  },
  {
    "en": "NEPAL",
    "abbr": "NP",
    "cn": "尼泊尔",
    "id": 524
  },
  {
    "en": "NETHERLANDS",
    "abbr": "NL",
    "cn": "荷兰",
    "id": 528
  },
  {
    "en": "NETHERLANDS ANTILLES",
    "abbr": "AN",
    "cn": "荷属安的列斯群岛",
    "id": 530
  },
  {
    "en": "NEW CALEDONIA",
    "abbr": "NC",
    "cn": "新喀里多尼亚",
    "id": 540
  },
  {
    "en": "NEW ZEALAND",
    "abbr": "NZ",
    "cn": "新西兰",
    "id": 554
  },
  {
    "en": "NICARAGUA",
    "abbr": "NI",
    "cn": "尼加拉瓜",
    "id": 558
  },
  {
    "en": "NIGER",
    "abbr": "NE",
    "cn": "尼日尔",
    "id": 562
  },
  {
    "en": "NIGERIA",
    "abbr": "NG",
    "cn": "尼日利亚",
    "id": 566
  },
  {
    "en": "NIUE",
    "abbr": "NU",
    "cn": "纽埃",
    "id": 570
  },
  {
    "en": "NORFOLK ISLAND",
    "abbr": "NF",
    "cn": "诺福克岛",
    "id": 574
  },
  {
    "en": "NORTHERN MARIANA ISLANDS",
    "abbr": "MP",
    "cn": "北马里亚纳群岛",
    "id": 580
  },
  {
    "en": "NORWAY",
    "abbr": "NO",
    "cn": "挪威",
    "id": 578
  },
  {
    "en": "OMAN",
    "abbr": "OM",
    "cn": "阿曼",
    "id": 512
  },
  {
    "en": "PAKISTAN",
    "abbr": "PK",
    "cn": "巴基斯坦",
    "id": 586
  },
  {
    "en": "PALAU",
    "abbr": "PW",
    "cn": "帕劳群岛",
    "id": 585
  },
  {
    "en": "PALESTINIAN TERRITORY, OCCUPIED",
    "abbr": "PS",
    "cn": "巴勒斯坦当局",
    "id": 275
  },
  {
    "en": "PANAMA",
    "abbr": "PA",
    "cn": "巴拿马",
    "id": 591
  },
  {
    "en": "PAPUA NEW GUINEA",
    "abbr": "PG",
    "cn": "巴布亚新几内亚",
    "id": 598
  },
  {
    "en": "PARAGUAY",
    "abbr": "PY",
    "cn": "巴拉圭",
    "id": 600
  },
  {
    "en": "PERU",
    "abbr": "PE",
    "cn": "秘鲁",
    "id": 604
  },
  {
    "en": "PHILIPPINES",
    "abbr": "PH",
    "cn": "菲律宾",
    "id": 608
  },
  {
    "en": "PITCAIRN",
    "abbr": "PN",
    "cn": "皮特克恩群岛",
    "id": 612
  },
  {
    "en": "POLAND",
    "abbr": "PL",
    "cn": "波兰",
    "id": 616
  },
  {
    "en": "PORTUGAL",
    "abbr": "PT",
    "cn": "葡萄牙",
    "id": 620
  },
  {
    "en": "PUERTO RICO",
    "abbr": "PR",
    "cn": "波多黎各",
    "id": 630
  },
  {
    "en": "QATAR",
    "abbr": "QA",
    "cn": "卡塔尔",
    "id": 634
  },
  {
    "en": "REUNION",
    "abbr": "RE",
    "cn": "留尼汪岛",
    "id": 638
  },
  {
    "en": "ROMANIA",
    "abbr": "RO",
    "cn": "罗马尼亚",
    "id": 642
  },
  {
    "en": "RUSSIAN FEDERATION",
    "abbr": "RU",
    "cn": "俄罗斯",
    "id": 643
  },
  {
    "en": "RWANDA",
    "abbr": "RW",
    "cn": "卢旺达",
    "id": 646
  },
  {
    "en": "SAINT BARTHÉLEMY",
    "abbr": "BL",
    "cn": "圣巴泰勒米",
    "id": 652
  },
  {
    "en": "SAINT HELENA",
    "abbr": "SH",
    "cn": "圣赫勒拿岛",
    "id": 654
  },
  {
    "en": "SAINT KITTS AND NEVIS",
    "abbr": "KN",
    "cn": "圣基茨和尼维斯",
    "id": 659
  },
  {
    "en": "SAINT LUCIA",
    "abbr": "LC",
    "cn": "圣卢西亚",
    "id": 662
  },
  {
    "en": "SAINT MARTIN",
    "abbr": "MF",
    "cn": "圣马丁",
    "id": 663
  },
  {
    "en": "SAINT PIERRE AND MIQUELON",
    "abbr": "PM",
    "cn": "圣皮埃尔岛和密克隆岛",
    "id": 666
  },
  {
    "en": "SAINT VINCENT AND THE GRENADINES",
    "abbr": "VC",
    "cn": "圣文森特和格林纳丁斯",
    "id": 670
  },
  {
    "en": "SAMOA",
    "abbr": "WS",
    "cn": "萨摩亚",
    "id": 882
  },
  {
    "en": "SAN MARINO",
    "abbr": "SM",
    "cn": "圣马力诺",
    "id": 674
  },
  {
    "en": "SAO TOME AND PRINCIPE",
    "abbr": "ST",
    "cn": "圣多美和普林西比",
    "id": 678
  },
  {
    "en": "SAUDI ARABIA",
    "abbr": "SA",
    "cn": "沙特阿拉伯",
    "id": 682
  },
  {
    "en": "SENEGAL",
    "abbr": "SN",
    "cn": "塞内加尔",
    "id": 686
  },
  {
    "en": "SERBIA",
    "abbr": "RS",
    "cn": "塞尔维亚",
    "id": 688
  },
  {
    "en": "SEYCHELLES",
    "abbr": "SC",
    "cn": "塞舌尔",
    "id": 690
  },
  {
    "en": "SIERRA LEONE",
    "abbr": "SL",
    "cn": "塞拉利昂",
    "id": 694
  },
  {
    "en": "SINGAPORE",
    "abbr": "SG",
    "cn": "新加坡",
    "id": 702
  },
  {
    "en": "SLOVAKIA",
    "abbr": "SK",
    "cn": "斯洛伐克",
    "id": 703
  },
  {
    "en": "SLOVENIA",
    "abbr": "SI",
    "cn": "斯洛文尼亚",
    "id": 705
  },
  {
    "en": "SOLOMON ISLANDS",
    "abbr": "SB",
    "cn": "所罗门群岛",
    "id": 90
  },
  {
    "en": "SOMALIA",
    "abbr": "SO",
    "cn": "索马里",
    "id": 706
  },
  {
    "en": "SOUTH AFRICA",
    "abbr": "ZA",
    "cn": "南非",
    "id": 710
  },
  {
    "en": "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
    "abbr": "GS",
    "cn": "南乔治亚和南桑德威奇群岛",
    "id": 239
  },
  {
    "en": "SPAIN",
    "abbr": "ES",
    "cn": "西班牙",
    "id": 724
  },
  {
    "en": "SRI LANKA",
    "abbr": "LK",
    "cn": "斯里兰卡",
    "id": 144
  },
  {
    "en": "SUDAN",
    "abbr": "SD",
    "cn": "苏丹",
    "id": 736
  },
  {
    "en": "SURINAME",
    "abbr": "SR",
    "cn": "苏里南",
    "id": 740
  },
  {
    "en": "SVALBARD AND JAN MAYEN",
    "abbr": "SJ",
    "cn": "斯瓦尔巴群岛和扬马延",
    "id": 744
  },
  {
    "en": "SWAZILAND",
    "abbr": "SZ",
    "cn": "斯威士兰",
    "id": 748
  },
  {
    "en": "SWEDEN",
    "abbr": "SE",
    "cn": "瑞典",
    "id": 752
  },
  {
    "en": "SWITZERLAND",
    "abbr": "CH",
    "cn": "瑞士",
    "id": 756
  },
  {
    "en": "SYRIAN ARAB REPUBLIC",
    "abbr": "SY",
    "cn": "叙利亚",
    "id": 760
  },
  {
    "en": "TAIWAN, PROVINCE OF CHINA",
    "abbr": "TW",
    "cn": "中国台湾省",
    "id": 158
  },
  {
    "en": "TAJIKISTAN",
    "abbr": "TJ",
    "cn": "塔吉克斯坦",
    "id": 762
  },
  {
    "en": "TANZANIA, UNITED REPUBLIC OF",
    "abbr": "TZ",
    "cn": "坦桑尼亚",
    "id": 834
  },
  {
    "en": "THAILAND",
    "abbr": "TH",
    "cn": "泰国",
    "id": 764
  },
  {
    "en": "TIMOR-LESTE",
    "abbr": "TL",
    "cn": "东帝汶",
    "id": 626
  },
  {
    "en": "TOGO",
    "abbr": "TG",
    "cn": "多哥",
    "id": 768
  },
  {
    "en": "TOKELAU",
    "abbr": "TK",
    "cn": "托克劳",
    "id": 772
  },
  {
    "en": "TONGA",
    "abbr": "TO",
    "cn": "汤加",
    "id": 776
  },
  {
    "en": "TRINIDAD AND TOBAGO",
    "abbr": "TT",
    "cn": "特立尼达和多巴哥",
    "id": 780
  },
  {
    "en": "TUNISIA",
    "abbr": "TN",
    "cn": "突尼斯",
    "id": 788
  },
  {
    "en": "TURKEY",
    "abbr": "TR",
    "cn": "土耳其",
    "id": 792
  },
  {
    "en": "TURKMENISTAN",
    "abbr": "TM",
    "cn": "土库曼斯坦",
    "id": 795
  },
  {
    "en": "TURKS AND CAICOS ISLANDS",
    "abbr": "TC",
    "cn": "特克斯群岛和凯科斯群岛",
    "id": 796
  },
  {
    "en": "TUVALU",
    "abbr": "TV",
    "cn": "图瓦卢",
    "id": 798
  },
  {
    "en": "UGANDA",
    "abbr": "UG",
    "cn": "乌干达",
    "id": 800
  },
  {
    "en": "UKRAINE",
    "abbr": "UA",
    "cn": "乌克兰",
    "id": 804
  },
  {
    "en": "UNITED ARAB EMIRATES",
    "abbr": "AE",
    "cn": "阿拉伯联合酋长国",
    "id": 784
  },
  {
    "en": "UNITED KINGDOM",
    "abbr": "GB",
    "cn": "英国",
    "id": 826
  },
  {
    "en": "UNITED STATES",
    "abbr": "US",
    "cn": "美国",
    "id": 840
  },
  {
    "en": "UNITED STATES MINOR OUTLYING ISLANDS",
    "abbr": "UM",
    "cn": "美属小奥特兰群岛",
    "id": 581
  },
  {
    "en": "URUGUAY",
    "abbr": "UY",
    "cn": "乌拉圭",
    "id": 858
  },
  {
    "en": "UZBEKISTAN",
    "abbr": "UZ",
    "cn": "乌兹别克斯坦",
    "id": 860
  },
  {
    "en": "VANUATU",
    "abbr": "VU",
    "cn": "瓦努阿图",
    "id": 548
  },
  {
    "en": "VENEZUELA, BOLIVARIAN REPUBLIC OF",
    "abbr": "VE",
    "cn": "委内瑞拉",
    "id": 862
  },
  {
    "en": "VIET NAM",
    "abbr": "VN",
    "cn": "越南",
    "id": 704
  },
  {
    "en": "VIRGIN ISLANDS, BRITISH",
    "abbr": "VG",
    "cn": "维尔京群岛（英属）",
    "id": 92
  },
  {
    "en": "VIRGIN ISLANDS, U.S.",
    "abbr": "VI",
    "cn": "维尔京群岛",
    "id": 850
  },
  {
    "en": "WALLIS AND FUTUNA",
    "abbr": "WF",
    "cn": "瓦利斯群岛和富图纳群岛",
    "id": 876
  },
  {
    "en": "WESTERN SAHARA",
    "abbr": "EH",
    "cn": "西撒哈拉",
    "id": 732
  },
  {
    "en": "YEMEN",
    "abbr": "YE",
    "cn": "也门",
    "id": 887
  },
  {
    "en": "ZAMBIA",
    "abbr": "ZM",
    "cn": "赞比亚",
    "id": 894
  },
  {
    "en": "ZIMBABWE",
    "abbr": "ZW",
    "cn": "津巴布韦",
    "id": 716,
  },
  {
    "en": "SCOTLAND",
    "abbr": "SCOTLAND",
    "cn": "苏格兰",
    "id": 9001,
  }
]


const chinaAreas = [{
  "en": "HONG KONG",
  "abbr": "HK",
  "cn": "中国香港",
  "id": 344
},
{
  "en": "MACAO",
  "abbr": "MO",
  "cn": "中国澳门",
  "id": 446
}]


module.exports = {
  chinaAreas: chinaAreas,
  countries: countries
}
