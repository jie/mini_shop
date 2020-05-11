import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import { ApiRequest } from '../../utils/async_api'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'
export default {
  data: {
    entities: [],
    entityIdField: 'id',
    lastId: null,
    reqData: {
      page: 1,
      pagesize: 10
    }
  },
  getEntities: async function () {
    this.showLoading()
    try {
      await this._getEntitiesAPI()
    } catch (e) {
      console.error(e)
    }
    this.hideLoading()
  },
  updateOldEntities: function (newItem) {
    for (let i = 0; i < this.data.entities.length; i++) {
      if (this.data.entities[i][this.data.entityIdField] == newItem[this.data.entityIdField]) {
        this.data.entities[i] = newItem
      }
    }
  },
  refreshNewEntities: async function () {
    this.showLoading()
    try {
      let newReqData = { ...this.data.reqData }
      newReqData.page = 1
      let result = await this.callEntitiesAPI(newReqData)
      if (!this.data.isCloudFunc && !result.code) {
        this.showToast({title: result.message})
        return
      } else if (this.data.isCloudFunc && result.result.status === false) {
        this.showToast({title: result.result.message})
        return
      }

      if (this.data.isCloudFunc) {
        result = result.result
      }
    
      let entities = []
      let newEntities = []
      let oldEntities = this._getEntitiyIds()

      if (result.data && result.data.entities) {
        if (this.formatEntities) {
          let formatedData = await this.formatEntities(result.data)
          entities = formatedData.entities
        } else {
          entities = result.data.entities
        }
      }

      for (let item of result.data.entities) {
        if (!oldEntities.includes(item[this.data.entityIdField])) {
          newEntities.push(item)
        } else {
          this.updateOldEntities(item)
        }
      }

      if (newEntities.length != 0) {
        this.setData({
          entities: [...newEntities, ...this.data.entities]
        })
      } else {
        this.setData({
          entities: this.data.entities
        })
      }

      if (this.data.lastId === null && this.data.entities.length !== 0) {
        this.setData({
          lastId: this.data.entities[this.data.entities.length - 1][this.data.entityIdField],
          'reqData.page': this.data.reqData.page + 1
        })
      }
    } catch (e) {
      console.error(e)
    }
    this.hideLoading()
  },
  getEntitiesApiUrl: function () {
    return null
  },

  callEntitiesAPI: async function (reqData) {
    if(!this.data.isCloudFunc) {
      return await ApiRequest(this.getEntitiesApiUrl(), reqData)
    } else {
      return await CallCloudFuncAPI(this.getEntitiesApiUrl(), {
        apiName: this.data.apiName,
        ...reqData
      })
    }
  },
  _getEntitiesAPI: async function () {
    let result;
    let reqData = this.data.reqData
    result = await this.callEntitiesAPI(reqData)
    if (!this.data.isCloudFunc && !result.code) {
      this.showToast({title: result.message})
      return
    } else if(this.data.isCloudFunc && result.result.status === false) {
      this.showToast({
        message: result.result.message
      })
      return
    }

    if(this.data.isCloudFunc) {
      result = result.result
    }

    let entities = []
    if (result.data && result.data.entities) {
      if (this.formatEntities) {
        let formatedData = await this.formatEntities(result.data)
        entities = formatedData.entities
      } else {
        entities = result.data.entities
      }
    }

    if (entities.length === 0) {
      this.showToast({
        message: '没有更多数据了'
      })
      return
    }

    let all_entities = []
    let lastId = entities[entities.length - 1][this.data.entityIdField]
    if (this.data.lastId != lastId) {
      all_entities = [...this.data.entities, ...entities]
      this.setData({
        entities: all_entities,
        lastId: lastId,
        'reqData.page': this.data.reqData.page + 1
      })
    }
  },
  _getEntitiyIds: function () {
    let entityIds = []
    for (let entity of this.data.entities) {
      entityIds.push(entity[this.data.entityIdField])
    }
    return entityIds
  },
  onReachBottom: async function () {
    await this.getEntities()
  },
  onPullDownRefresh: async function () {
    await this.refreshNewEntities()
    wx.stopPullDownRefresh()
  },
}