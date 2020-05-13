
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'
import mergePages from '../../utils/objectUtils'
import BaseMixin from '../base/base'
import BuycartMixin from '../base/buycart'
import { CallCloudFuncAPI } from '../../utils/async_cloudfunc'

const PageObject = mergePages({}, BaseMixin, BuycartMixin, {

  data: {
    navbarData: {
      showCapsule: 1,
      title: "拼团",
      isPage: false
    },
    entities: []
  },

  onInited: function (options) {
  },
  onPullDownRefresh: async function () {
  },
})


Page(PageObject)