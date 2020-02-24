const PayStatus = {
  'submit': 'submit',
  'pay': 'pay',
  'received': 'received',
  'refund': 'refund',
  'complete': 'complete'
}
const PayType = {
  'pay': 'pay',
  'deposit': 'deposit'
}

const DeliveryStatus = {
  'preparing': 'preparing',
  'shipping': 'shipping',
  'delivering': 'delivering',
  'received': 'received'
}

module.exports = {
  PayType: PayType,
  PayStatus: PayStatus,
  DeliveryStatus: DeliveryStatus
}