const db = require('../db.js')
const goodsAPI = require('../goods.js')
const settings = require('../cloud_settings.json')
const libs = require('./libs')
const httpRequestCloudAPI = libs.httpRequestCloudAPI
const getAccessToken = libs.getAccessToken


test('get goods success', async () => {
  var result = await getAccessToken(settings.app_id, settings.app_secret)
  expect(result.status).toBe(true)
  result = await httpRequestCloudAPI(result.data.data.access_token, settings.cloudenv, 'main', {
    apiName: 'goodsAPI.getGoods'
  })
  expect(result.status).toBe(true)
  expect(result.data.entities.length).not.toBe(0)
});