const idTypes = [{
  label: '身份证',
  value: '0'
},
{
  label: '护照',
  value: '1'
},
{
  label: '港澳居民来往内地通行证',
  value: '2'
},
{
  label: '台湾居民来往大陆通行证',
  value: '3'
}]

const genderTypes = [
  {
    label: '男',
    value: 'M'
  },
  {
    label: '女',
    value: 'F'
  },
]

const PayStatus = {
  'submit': 'submit',
  'recevied': 'received',
  'pay': 'pay',
  'refund': 'refund',
  'complete': 'complete'
}
const PayType = {
  'pay': 'pay',
  'deposit': 'deposit'
}

const StatusLabel = {
  'submit': {
    'name': '未支付',
    'name_en': 'Submit'
  },
  'pay': {
    'name': '已付款',
    'name_en': 'Paid'
  },
  'recevied': {
    'name': '已接单',
    'name_en': 'recevied'
  },
  'refund': {
    'name': '已退款',
    'name_en': 'refund'
  },
  'complete': {
    'name': '已完成',
    'name_en': 'Complete'
  }
}

const DeliveryStatusLabel = {
  'preparing': {
    'name': '备货中',
    'name_en': 'Paid'
  },
  'shipping': {
    'name': '已发货',
    'name_en': 'Shipping'
  },
  'delivering': {
    'name': '正在送货',
    'name_en': 'Delivering'
  },
  'received': {
    'name': '已签收',
    'name_en': 'Received'
  }
}

module.exports = {
  idTypes,
  genderTypes,
  PayStatus,
  PayType,
  StatusLabel,
  DeliveryStatusLabel
}