const cloud = require('wx-server-sdk')
const db = require('./db')
const axios = require('axios');
const settings = require('./cloud_settings.json')
const moment = require('moment')
const APPID = settings.app_id;
const APPSECRET = settings.app_secret;
const COLLNAME = 'wechat_token';
const FIELDNAME = settings.wechat_access_token_record_id


const updateWechatAccessToken = async (event, context) => {
  console.log('===== start get wechat token =====')
  let res = null
  let tokenResult = null
  let resUpdate = null
  try {
    res = await axios.get(
      "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET
    )
    console.log('get_token_result:', res)
    if (!res.data || !res.data.access_token) {
      console.log('wechat:', res)
      return
    }
    
    tokenResult = await db.collection(COLLNAME).where({slug: "access_token"}).limit(1).get()
    console.log('tokenResult:', tokenResult)
    if(!tokenResult || tokenResult.data.length === 0) {
      await db.collection(COLLNAME).add({
        data: {
          slug: "access_token",
          update_at: new Date()
        }
      })
    }
    
    let resUpdate = await db.collection(COLLNAME).where({slug: "access_token"}).limit(1).update({
      data: {
        token: res.data.access_token,
        update_at: new Date()
      }
    })
    console.log('resUpdate:', resUpdate)
    if (!resUpdate || resUpdate.errMsg !== 'document.update:ok') {
      return
    }

    if(resUpdate.stats && resUpdate.stats.updated === 0) {
      let resAdd = await db.collection(COLLNAME).add({
        slug: "access_token",
        token: res.data.access_token,
        update_at: new Date()
      })
    }

  } catch (e) {
    console.error(e)
  }
}


module.exports = {
  updateWechatAccessToken: updateWechatAccessToken
}
