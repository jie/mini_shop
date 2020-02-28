const settings = require('./cloud_settings.json')

const cloud = require('wx-server-sdk')
cloud.init({
  env: settings.cloudenv
})
const db = cloud.database()



module.exports = db

