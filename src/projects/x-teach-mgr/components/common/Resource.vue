<script>
import { getSourcesList } from 'services/x-teach/common'
import publishResource from 'projects/x-publish-mgr/components/common/Resource'

export default {
  extends: publishResource,
  data() {
    return {}
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10
    ) {
      getSourcesList({
        pageNum,
        pageOffset,
        type: this.currentType || this.type,
        ...this.parameter,
        ...this.query,
      }).then(res => {
        res.data.map(item => {
          item.name =
            item.course_name ||
            item.book_name ||
            item.resources_name ||
            item.name
          return item
        })
        this.dataList = res.data || []
        this.page = res.page
      })
    },
  },
}
</script>



