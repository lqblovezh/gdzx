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
      radio: 'bottom',
      dialogVisible: false,
      service,
      tableData: {
        outLink: [],
        ewm: [],
        bannerCode: [],
        copyright: '',
        teacher: [],
      },
      id: '',
      toPage: 'outLink',
      type: 'add',
      form: {
        src: '',
        name: '',
        img: '',
      },
    }
  },
  methods: {
    getList() {
      this.service.getList({ key: this.radio }).then(res => {
        log(res)
        if (res.data[0]) {
          this.id = res.data[0]['id']
          this.tableData = qs.parse(res.data[0]['value'])
          if (!this.tableData.outLink) {
            this.tableData.outLink = []
          }
          if (!this.tableData.ewm) {
            this.tableData.ewm = []
          }
          if (!this.tableData.bannerCode) {
            this.tableData.bannerCode = []
          }
          if (!this.tableData.teacher) {
            this.tableData.teacher = []
          }
        } else {
          this.id = ''
          this.tableData = {
            outLink: [],
            ewm: [],
            bannerCode: [],
            teacher: [],
            copyright: '',
          }
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
            this.tableData[this.toPage].push(data)
          } else {
            this.form.img = res.data
          }
        })
      } else {
        if (this.type == 'add') {
          this.tableData[this.toPage].push(this.form)
        }
      }
      loading.close()
      this.form = {}
      this.changeData()
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
      this.tableData[this.toPage].splice(index, 1)
      this.changeData()
    },
    save_copyright() {
      this.changeData()
    },
    update(e) {
      this.form.img = URL.createObjectURL(e.target.files[0])
    },
    status(item) {
      item.status = item.status === 'false' ? true : false
      this.changeData()
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
      //- el-button(@click="$router.push({path:'/wms/setting/teacher'})") 底部教师展示
      el-button(type="primary" @click="$router.push({path:'/wms/setting/footer'})") 底部设置
    .flat
      el-radio(v-model="toPage" label="outLink") 友情链接
      el-radio(v-model="toPage" label="ewm") 二维码
      el-radio(v-model="toPage" label="bannerCode") banner二维码
      el-radio(v-model="toPage" label="copyright") 版权编辑
      el-radio(v-model="toPage" label="teacher") 教师展示
  .content
    .part(v-if="toPage == 'outLink'")
      .title 友情链接 :
      .list 
        .item(v-for="item,index in tableData.outLink")
          el-input.width(placeholder="名称" :value="item.name" )
          el-input.width(placeholder="链接" :value="item.src")
          el-button(type="info" @click="open(item)") 修改
          el-button(type="danger" @click="del(index)") 删除
          img.icon.up( src="./img/u1971.png" alt="icon" @click="up(index)")
          img.icon.down(src="./img/u1973.png" alt="icon" @click="down(index)")
        .add 
          el-button(type="primary" @click="open('')") 新增
    .part(v-else-if="toPage == 'ewm'")
      .title 二维码 :
      .list.ewm 
        .item(v-for="item,index in tableData.ewm")
          div
            img.thumb(:src="item.img")
            el-input.input(disabled="disabled" v-model="item.name" placeholder="你还未填写二维码名称")  
          el-button(type="info" @click="open(item)" size="small") 修改
          el-button(type="danger" @click="del(index)" size="small") 删除
          //img.icon.up( src="./img/u1971.png" alt="icon" @click="up(index)")
          //img.icon.down(src="./img/u1973.png" alt="icon" @click="down(index)")
      .add 
        el-button(type="primary" @click="open('')") 新增
    .part(v-else-if="toPage == 'bannerCode'")
      .title banner二维码 :
      .list.ewm 
        .item(v-for="item,index in tableData.bannerCode")
          div
            img.thumb(:src="item.img")
            el-input.input(disabled="disabled" v-model="item.name" placeholder="你还未填写二维码名称")  
          el-button(type="info" @click="open(item)" size="small") 修改
          el-button(type="danger" @click="del(index)" size="small") 删除
      .add 
        el-button(type="primary" @click="open('')") 新增
    .part(v-else-if="toPage == 'teacher'")
      .title 教师展示
      .list 
        el-table(ref="table"
          stripe
          :data="tableData.teacher"
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
              Icon(type="icon-detail" title="编辑" @click="open(row)")
              Icon(type="icon-status" :title="row.status==='false'?'显示':'隐藏'" @click="status(row)")
              Icon(type="icon-delete" title="删除" @click="del(row)")
        .add(style="margin-top:20px;")
          el-button(type="primary" @click="open('')") 新增
    .part(v-else)
      .title 版权编辑 :
      .list 
        .item 
          el-input.w(type="textarea" :rows="8" v-model="tableData.copyright")
        el-button(type="primary" @click="save_copyright") 保存
    el-dialog(title="操作" width="500px" :visible.sync="dialogVisible")
      el-form(ref="form")
        el-form-item(:label="toPage=='teacher'?'姓名':'名称:'" v-if="toPage == 'outLink'||toPage=='teacher'")
          el-input(v-model="form.name" :placeholder="toPage=='teacher'?'姓名':'名称:'")
        el-form-item(label="学院:" v-if="toPage=='teacher'") 
          el-input(v-model="form.college" placeholder="学院")
        el-form-item(label="职称:" v-if="toPage=='teacher'")
          el-input(v-model="form.positional" placeholder="职称")
        el-form-item(label="简介:" v-if="toPage=='teacher'")
          el-input(v-model="form.abs" type="textarea" placeholder="简介")
        el-form-item(label="链接:" v-if="toPage == 'outLink'") 
          el-input(v-model="form.src" placeholder="请输入关联URL地址 eg:http://www.baidu.com/x-book.html")
        el-form-item(label="名称:" v-if="toPage == 'ewm'||toPage == 'bannerCode'")
          el-input(v-model="form.name" placeholder="请输入链接名称")
        el-form-item(v-show="toPage == 'ewm'||toPage == 'bannerCode'||toPage=='teacher'")
          img.banner(:src="form.img" ref="img" v-show="form.img")
          input.updateImg(type="file" @change="update($event,'img')" ref="updateImg")
          el-button(type="primary" size="small" @click="$refs.updateImg.click()" plain v-text="toPage=='teacher'?'上传头像':'上传二维码'") 
        
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible= false") 取消
        el-button(type="primary" @click="sendInfo('updateImg')") 确定
</template>

<style lang="stylus" scoped>
.el-form-item
  margin-bottom 5px
.setting
  padding 20px
  color #444
  min-width 1660px
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

