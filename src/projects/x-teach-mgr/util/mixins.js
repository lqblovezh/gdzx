//共用方法
import formSerialize from 'form-serialize'
const main = {
  data() {
    return {
      tableData: [],
      total: 0,
      page: {
        pageOffset: 10,
        pageNum: 1,
      },
      ids: [],
      isTeacher: '',
      dialogVisible: false,
      detailVisible: false,
      detailData: [],
      productType: null,
    }
  },
  created() {
    this.isTeacher = this.$config.isTeacher
    this.getList({ ...this.query, ...this.page })
  },
  methods: {
    seareHandeler() {
      //搜索
      this.page.pageNum = 1
      this.getList({ ...this.query })
    },
    getList(obj) {
      if (this.service) {
        this.service
          .getList({ ...this.page, ...this.query, ...obj })
          .then(res => {
            if (res && res.status) {
              this.tableData = res.data
              this.total = res.page.total
            }
          })
      }
    },
    //获取选中值 el-table 内置方法
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val
    },
    update(e, dom) {
      this.$refs[dom].src = URL.createObjectURL(e.target.files[0])
    },
    //获取搜索时间
    getTime(time) {
      if (!time) {
        time = ['', '']
      }
      this.query.time_start = time[0]
      this.query.time_end = time[1]
      this.query.start_time = time[0]
      this.query.end_time = time[1]
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.pageOffset = val
      this.getList({ ...this.page, ...this.query })
    },
    handleCurrentChange(val) {
      //处理页码变化
      this.page.pageNum = val
      this.getList({ ...this.page, ...this.query })
    },
    handleClose() {
      //关闭模态框时初始化form
      //this.$refs.detailDialog.resetFields()
      this.detailVisible = false
      this.dialogVisible = false
    },
    del(ids) {
      // if(!(ids instanceof Array)){
      //   ids = [ids]
      // }
      if (!ids) {
        if (!this.ids.length) return this.$message.warning('请先选中')
        ids = this.ids
      }
      this.$confirm('你真的要删除该数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.service.del({ id: ids, _ids: ids }).then(
            res => {
              if (res && res.status) {
                this.getList({ ...this.page, ...this.query })
                this.$message.success('删除成功')
              }
            },
            ({ payload }) => {
              this.$message.error(payload.message)
            }
          )
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        })
    },
    save(data) {
      if (!data) {
        data = this.form || this.detailData
      }
      this.service.save(data).then(
        res => {
          if (res.status) {
            this.$message.success('保存成功')
            this.getList(this.query)
          }
          this.dialogVisible = false
          if (this.$refs.child) {
            this.$refs.child.dialogVisible = false
          }
        },
        err => {
          this.$message.error(err.payload.message)
        }
      )
    },
    educe(id) {
      // 导出
      this.service.educe({ id, ...this.query }).then(res => {
        window.location.href = res.data.url
      })
    },
    detail(id) {
      if (id) {
        this.service.detail({ id }).then(res => {
          this.detailData = res.data
        })
      } else {
        this.detailData = {}
      }
      this.$refs.child.dialogVisible = true
    },
    showDetail(id, type) {
      // 查看详情
      this.service.detail({ id }).then(res => {
        log(res, 'detailInfo')
        this.detailData = res.data
        this.productType = type
        this.detailVisible = true
      })
    },
    async previewImg(e, type) {
      let node = e.target
      let file = node.files[0]
      const { url, path } = await this.$globalUpdateFile(file)
      if (type) {
        this.$set(this.detailData, type, path)
      } else {
        this.$set(this.detailData, 'img_src', url)
        this.$set(this.detailData, 'img', path)
        this.$set(this.detailData, 'cover_absolute', url)
        this.$set(this.detailData, 'cover', path)
      }
    },
  },
}
export { main }
