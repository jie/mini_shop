const settings = require('../cloud_settings.json')
const libs = require('./libs')
const httpRequestCloudAPI = libs.httpRequestCloudAPI
const getAccessToken = libs.getAccessToken


test('getOrders success', async () => {
  var result = await getAccessToken(settings.app_id, settings.app_secret)
  expect(result.status).toBe(true)
  result = await httpRequestCloudAPI(result.data.data.access_token, settings.cloudenv, 'main', {
    apiName: 'orderAPI.getOrders'
  })
  expect(result.status).toBe(true)
  expect(result.data.entities.length).toBe(0)
});


