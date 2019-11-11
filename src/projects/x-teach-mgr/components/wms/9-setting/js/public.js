import qs from 'qs'
import { getTask } from 'services/common'
const pub = {
  methods: {
    open(info) {
      if (info) {
        // this.form = JSON.parse(JSON.stringify(info))
        this.form = info
        this.type = 'update'
      } else {
        if (this.toPage == 'ewm' && this.tableData.ewm.length >= 3) {
          //二维码限制在3条以内
          this.$message.error('二维码数量不能超过3条')
          return
        }
        this.type = 'add'
        this.form = {
          src: '',
          name: '',
          img: '',
        }
      }
      this.dialogVisible = true
    },
    getList(obj = { key: this.radio }) {
      this.service.getList({ key: this.radio }).then(res => {
        log(res)
        if (res.data[0]) {
          this.id = res.data[0]['id']
          this.tableData = Object.values(qs.parse(res.data[0]['value']))
        } else {
          this.id = ''
          this.tableData = []
        }
      })
    },
    async sendInfo(el) {
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      if (this.$refs[el].files[0]) {
        let temp
        await getTask(this.$refs[el].files[0]).then(res => {
          temp = res.data.path
        })
        await this.service.files_move({ temp }).then(res => {
          let data = { ...this.form }
          data.img = res.data
          if (this.type == 'add') {
            log(this.tableData, 7)
            this.tableData.push(data)
          } else {
            this.form.img = res.data
          }
        })
      }
      loading.close()
      /*if(this.tableData.length>10){
          this.$message.success('banner限制在10条数据内')
          return
        }
        */
      this.changeData()
    },
    del(index) {
      this.tableData.splice(index, 1)
      this.changeData()
    },
    changeData(info) {
      debugger
      this.save({
        position: this.radio,
        key: this.radio,
        value: qs.stringify(this.tableData) || '{}',
        type: 2,
        id: this.id,
      })
    },
    up($index) {
      //向上移动一位
      if ($index == 0) {
        this.tableData.push(this.tableData.shift())
      } else {
        this.tableData = this.swapItems(this.tableData, $index, $index - 1)
      }
      this.$message.success('上移成功')
      this.changeData()
    },
    down($index) {
      //向下移动一位
      if ($index == this.tableData.length - 1) {
        this.tableData.unshift(this.tableData.pop())
      } else {
        this.tableData = this.swapItems(this.tableData, $index, $index + 1)
      }
      this.$message.success('下移成功')
      this.changeData()
    },
    swapItems(arr, index1, index2) {
      //数组交换位置
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
  },
  watch: {
    radio() {
      log(this.radio)
      this.getList({ key: this.radio })
    },
  },
}
export { pub }
