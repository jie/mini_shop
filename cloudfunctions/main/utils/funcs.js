var constant = require('../constant')



function getOrderSummary(order) {
  let summary = ''
  if(order.type == constant.PayType.deposit) {
    return '充值'
  }

  if(order.type == constant.PayType.pay) {
    if(order.orderInfo && order.orderInfo.entities) {
      order.orderInfo.entities.map((value, index) => {
        if(index < 3) {
          summary += value.summary
        } else if(index === 3){
          summary += '...'
        }
      })
    }
  }
  return summary
}


module.exports = {
  getOrderSummary: getOrderSummary
}
