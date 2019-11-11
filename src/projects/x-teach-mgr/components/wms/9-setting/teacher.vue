<script>
import { main } from '@/util/mixins'
import qs from 'qs'
import { pub } from './js/public'
import { getTask } from 'services/common'
import * as service from 'services/x-teach/setting'
export default {
  mixins: [main, pub],
  data() {
    return {
      radio: 'teacher',
      dialogVisible: false,
      service,
      tableData: [],
      id: '',
      type: 'add',
      form: {
        name: '',
        college: '',
        positional: '',
        abs: '',
        img: '',
      },
    }
  },
  methods: {
    getList() {
      this.service.getList({ key: this.radio }).then(res => {
        if (res.data[0]) {
          this.id = res.data[0]['id']
          this.tableData = JSON.parse(res.data[0]['value'])
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
          temp = res.data.url
        })
        await this.service.files_move({ temp }).then(res => {
          let data = { ...this.form }
          data.img = res.data
          if (this.type == 'add') {
            this.tableData.push(data)
          } else {
            this.form.img = res.data
          }
        })
      } else {
        if (this.type == 'add') {
          this.tableData.push(this.form)
        }
      }
      // console.log(
      //   {
      //     position: this.radio,
      //     key: this.radio,
      //     value: JSON.stringify(this.tableData) || '{}',
      //     type: 2,
      //     id: this.id,
      //   },
      //   this.tableData instanceof Array
      // )
      // let array = JSON.parse(JSON.stringify(this.tableData))
      // console.log(Array.from(array), array)
      this.changeData()
      loading.close()
      this.form = { src: '', img: '', name: '' }
    },
    up($index) {
      //向上移动一位
      if ($index == 0) {
        this.tableData.outLink.push(this.tableData.outLink.shift())
      } else {
        this.tableData.outLink = this.swapItems(
          this.tableData.outLink,
          $index,
          $index - 1
        )
      }
      this.$message.success('上移成功')
      this.changeData()
    },
    down($index) {
      //向下移动一位
      if ($index == this.tableData.outLink.length - 1) {
        this.tableData.outLink.unshift(this.tableData.outLink.pop())
      } else {
        this.tableData.outLink = this.swapItems(
          this.tableData.outLink,
          $index,
          $index + 1
        )
      }
      this.$message.success('下移成功')
      this.changeData()
    },
    del(index) {
      this.tableData.splice(index, 1)
      this.changeData()
    },
    save_copyright() {
      this.changeData()
    },
    update(e) {
      this.form.img = URL.createObjectURL(e.target.files[0])
    },
    changeData(info) {
      this.save({
        position: this.radio,
        key: this.radio,
        value: JSON.stringify(this.tableData) || '[]',
        type: 2,
        id: this.id,
      })
    },
  },
}
</script>

<template lang="pug">
.setting
  .head
    el-button-group
      el-button(@click="$router.push({path:'/wms/setting/banner'})") banner设置
      el-button(@click="$router.push({path:'/wms/setting/ad'})") 广告位
      el-button( @click="$router.push({path:'/wms/setting/advert'})") 侧边广告
      el-button(@click="$router.push({path:'/wms/setting/commend'})") 栏目设置
      //- el-button(type="primary"  @click="$router.push({path:'/wms/setting/teacher'})") 底部教师展示
      el-button(@click="$router.push({path:'/wms/setting/footer'})") 底部设置
  .content
    .part
      .title 教师展示
      .list 
        el-table(ref="table"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        )
          el-table-column(prop="name" label="教师姓名")
          el-table-column( prop="college" label="学院")
          el-table-column( prop="positional" label="职称")
          el-table-column( prop="abs" label="简介")
          //- el-table-column(label="排序优先级")
          el-table-column(label="操作" fixed="right")
            template(slot-scope="{row}")
              Icon(type="icon-detail" title="使用" @click="open(row)")
              Icon(type="icon-delete" @click="del(row)" title="删除")
        .add(style="margin-top:20px;")
          el-button(type="primary" @click="open('')") 新增
    el-dialog(title="详情" width="500px" :visible.sync="dialogVisible" top="50px")
      el-form(ref="form")
        el-form-item(label="姓名:")
          el-input(v-model="form.name" placeholder="姓名")
        el-form-item(label="学院:") 
          el-input(v-model="form.college" placeholder="学院")
        el-form-item(label="职称:")
          el-input(v-model="form.positional" placeholder="职称")
        el-form-item(label="简介:")
          el-input(v-model="form.abs" type="textarea" placeholder="简介")
        el-form-item
          img.banner(:src="form.img" ref="img" v-show="form.img")
          input.updateImg(type="file" @change="update($event,'img')" ref="updateImg")
          el-button(type="primary" size="small" @click="$refs.updateImg.click()" plain) 上传头像
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible= false") 取消
        el-button(type="primary" @click="sendInfo('updateImg')") 确定
</template>

<style lang="stylus" scoped>
.setting
  padding 20px
  color #444
  min-width 1100px
  .head
    background #fff
    padding 15px
    border-radius 5px
    box-shadow 3px 3px 8px #dfdfdf
    margin-bottom 20px
    .flat
      padding 20px 0 10px 0
.content
  background #fff
  padding 15px
  border-radius 5px
  box-shadow 3px -3px 8px #dfdfdf
  .part
    .title
      margin-bottom 12px
      font-weight bold
      line-height 30px
      font-size 18px
  .list
    margin-bottom 20px
    .width
      width 300px
      margin-right 15px
    .item
      margin-bottom 20px
      .icon
        cursor pointer
        padding 8px
      .up
        transform rotate(90deg)
        margin-left 20px
      .down
        transform rotate(-90deg)
.updateImg
  display none
.w
  width 600px
.banner
  max-width 300px
.thumb
  width 280px
.ewm
  display flex
  flex-wrap wrap
  .item
    width 260px
    text-align center
    padding 10px
    img
      margin-bottom 20px
      padding 3px
      width 260px
      height 260px
      border-radius 5px
      border 1px solid #e8e8e8
.input
  padding-bottom 10px
</style>

