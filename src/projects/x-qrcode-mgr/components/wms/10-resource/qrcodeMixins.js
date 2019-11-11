import proType from 'projects/x-publish-mgr/components/3-digitalProductLibrary/qrcode/qrcodeType'
import * as services from 'services/x-qrcode/resource'
// import Detail from './detail'
import Detail from 'projects/common/readOnlyDetail'

export const qrcodeMixins = {
  components: {
    Detail,
  },
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      detailVisible: false, // 详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      publishDialog: false, //发布dialog
      searchQuery: {},
      proType,
    }
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = null
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          product_type: this.product_type,
          ...query,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        })
    },
    saveOk(data) {
      if (!this.detailData.id) {
        this.detailData = data
      }
      this.getList()
    },
  },
}
