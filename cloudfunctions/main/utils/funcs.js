import { constants } from "crypto"



function getOrderSummary(order) {
  let summary = ''
  if(order.type == constants.PayType.deposit) {
    return '充值'
  }

  if(order.type == constants.PayType.pay) {
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
