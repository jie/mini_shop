
const cloud = require('wx-server-sdk')
const db = require('./db')
const cryptoMO = require('crypto');
const request = require('request');
const xml2js = require('xml2js');
const uuid = require('./uuid.js')
const constant = require('./constant')
const shortid = require('./utils/shortid')
var settings = require('./cloud_settings.json')
const wechat = settings.wechat

function non_str_random() {
  return new uuid.UUID();
}

function create_deposit_orderid(length) {
  let s = shortid(length)
  return `D${s}`
}

function bodyData(wechat, payBody, nonce_str, openid, out_trade_no, total_fee, sign) {
  return `<xml>
    <appid>${wechat.appid}</appid>
    <body>${payBody}</body>
    <mch_id>${wechat.mch_id}</mch_id>
    <nonce_str>${nonce_str}</nonce_str>
    <openid>${openid}</openid>
    <notify_url>${wechat.notify_url}</notify_url>
    <out_trade_no>${out_trade_no}</out_trade_no>
    <spbill_create_ip>${wechat.ip}</spbill_create_ip>
    <total_fee>${total_fee}</total_fee>
    <trade_type>JSAPI</trade_type>
    <sign>${sign.toUpperCase()}</sign>
  </xml>`
}


const wxPaymentSubmit = async (data) => {
  let result = await new Promise((resolve, reject) => {
    request({ url: wechat.url, method: 'POST', body: data.body }, (err, res, body) => {
      const xmlParser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true })
      console.log(err)
      console.log(res)
      xmlParser.parseString(body, (err, res) => {
        var prepay_id = res.xml.prepay_id;
        var str = `appId=${data.appid}&nonceStr=${data.non_str}&package=prepay_id=${prepay_id}&signType=MD5&timeStamp=${data.timestamp}&key=${data.key}`;
        var paySign = cryptoMO.createHash('md5').update(str).digest('hex');
        resolve({ status: true, data: { timeStamp: data.timestamp, nonceStr: data.non_str, package: `prepay_id=${prepay_id}`, paySign: paySign, outTradeNo: data.out_trade_no, signType: 'MD5' } });
      })
    })
  })
  return result
}


const deposit = async (event, wxContext, user) => {
  console.log('event:', event)
  console.log('user', user)

  let cardResult = null
  try {
    cardResult = await db.collection('deposit_card').doc(event.cardId).get()
    console.log('cardResult:', cardResult)
  } catch (e) {
    console.error(e)
  }
  if (!cardResult || cardResult.errMsg !== 'document.get:ok') {
    return {
      status: false,
      message: 'card_not_found'
    }
  }
  console.log('card:', cardResult.data)
  console.log('cardId:', cardResult.data._id)
  let balance = 0;
  if (user.balance !== undefined || user.balance !== null) {
    balance = user.balance
  }

  const out_trade_no = create_deposit_orderid(5)
  const non_str = non_str_random().id;
  console.log('non_str:', non_str)
  console.log(non_str.length)
  var payBody = `Deposit-${cardResult.data.real_value}-${event.cardId}`;
  var total_fee = parseInt(parseFloat(cardResult.data.value) * 100)
  // var total_fee = 1
  var str = `appid=${wechat.appid}&body=${payBody}&mch_id=${wechat.mch_id}&nonce_str=${non_str}&notify_url=${wechat.notify_url}&openid=${wxContext.OPENID}&out_trade_no=${out_trade_no}&spbill_create_ip=${wechat.ip}&total_fee=${total_fee}&trade_type=JSAPI&key=${wechat.key}`;
  console.log({ 'str': str })
  var sign = cryptoMO.createHash('md5').update(str).digest('hex');
  console.log('sign:', sign)
  var temp_body_data = bodyData(wechat, payBody, non_str, wxContext.OPENID, out_trade_no, total_fee, sign);
  console.log({ xml: temp_body_data })

  var payData = {
    body: temp_body_data,
    appid: wechat.appid,
    non_str: non_str,
    out_trade_no: out_trade_no,
    key: wechat.key,
    timestamp: new Date().getTime().toString()
  }

  let depositSubmitResult = await wxPaymentSubmit(payData)

  if (!depositSubmitResult.status) {
    return {
      status: false,
      message: 'paysubmit_error'
    }
  }

  let order = {
    orderNo: out_trade_no,
    userName: user.nickName,
    mobile_phone: user.mobile_phone,
    is_admin_notified: false,
    orderInfo: {
      total: cardResult.data.real_value,
      count: 1,
      entities: [
        {
          id: cardResult.data._id,
          name: cardResult.data.name,
          name_en: cardResult.data.name_en,
          price: cardResult.data.real_value,
          display_price: cardResult.data.value,
          count: 1,
          total: cardResult.data.real_value,
          display_total: cardResult.data.value,
          cover: cardResult.data.image
        }
      ]
    },
    create_at: new Date(),
    update_at: new Date(),
    is_enable: true,
    openid: user._id,
    unionid: user.unionid,
    status: constant.PayStatus.submit,
    amount: cardResult.data.real_value,
    type: constant.PayType.deposit
    // balance: balance + parseFloat(cardResult.data.real_value)
  }
  console.log('orderInfo:', order)



  let orderResult = null
  try {
    orderResult = await db.collection('order').add({
      data: order
    })
    console.log('orderResult:', orderResult)
  } catch (e) {
    console.error(e)
  }
  if (!orderResult) {
    return {
      status: false,
      message: 'create_deposit_order_error'
    }
  }


  return {
    status: true,
    message: 'ok',
    data: {
      orderNo: out_trade_no,
      payData: depositSubmitResult.data
    }
  }
}


async function depositSuccess(event, wxContext, user) {

  let orderResult = null
  try {
    orderResult = await db.collection('order').where({ orderNo: event.orderNo }).limit(1).get()
    console.log('orderResult:', orderResult)
  } catch (e) {
    console.error(e)
  }
  if (!orderResult || !orderResult.data || orderResult.data.length !== 1) {
    return {
      status: false,
      message: 'get_deposit_order_error'
    }
  }
  orderResult = orderResult.data[0]
  if (orderResult.status !== constant.PayStatus.submit) {
    return {
      status: false,
      message: 'deposit_order_status_error'
    }
  }

  let updateOrderStatusRes = null
  try {
    updateOrderStatusRes = await db.collection('order').doc(orderResult._id).update({
      data: {
        balance: db.command.inc(parseFloat(orderResult.orderInfo.total)),
        status: constant.PayStatus.complete
      }
    })
    console.log('updateOrderStatusRes:', updateOrderStatusRes)
  } catch (e) {
    console.error(e)
  }
  if (!updateOrderStatusRes || updateOrderStatusRes.errMsg !== 'document.update:ok') {
    return {
      status: false,
      message: 'update_order_status_error'
    }
  }

  let depositResult = null
  try {
    depositResult = await db.collection('user').doc(wxContext.OPENID).update({
      data: {
        balance: db.command.inc(parseFloat(orderResult.orderInfo.total)),
        update_at: new Date()
      }
    })
    console.log('depositResult:', depositResult)
  } catch (e) {
    console.error(e)
  }
  if (!depositResult || depositResult.errMsg !== 'document.update:ok') {
    return {
      status: false,
      message: 'update_balance_error'
    }
  }
  return {
    status: true,
    message: 'ok'
  }
}



module.exports = {
  deposit: deposit,
  depositSuccess: depositSuccess
}
