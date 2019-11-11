<script>
import { main } from '@/util/mixins'
import { pub } from './js/public'
import qs from 'qs'
import * as service from "services/x-teach/setting"
export default {
  mixins: [main,pub],
  data(){
    return {
      radio:'banner_pc',
      dialogVisible:false,
      service,
      id:'',
      type:'add',
      form:{
        src:'',
        img:'',
      }
    }
  }
}
</script>

<template lang="pug">
.setting
  .head
    el-button-group
      el-button(type="primary" @click="$router.push({path:'/wms/setting/banner'})") banner设置
      el-button( @click="$router.push({path:'/wms/setting/ad'})") 广告位
      el-button( @click="$router.push({path:'/wms/setting/advert'})") 侧边广告
      el-button(@click="$router.push({path:'/wms/setting/commend'})") 栏目设置
      //- el-button(@click="$router.push({path:'/wms/setting/teacher'})") 底部教师展示
      el-button(@click="$router.push({path:'/wms/setting/footer'})") 底部设置

    .flat
      el-radio(v-model="radio" label="banner_pc") PC端
      el-radio(v-model="radio" label="banner_mobile") 手机端
      el-radio(v-model="radio" label="colleges_pc") 院校云PC端
      el-radio(v-model="radio" label="colleges_mobile") 院校云手机端
  .content
    .info
      img(src="./img/u2001.png")
      span 最多支持10张banner图片，当图片数量仅为1张时,无法轮播
    .list
      .item(v-for="item,index in tableData")
        .leftSide
          img.thumb(:src="item.img")
        .rightSide
          el-form(:inline="true")
            .operation
              span 排序：( {{index+1}} )
              img.icon.up( src="./img/u1971.png" alt="icon" @click="up(index)")
              img.icon.down(src="./img/u1973.png" alt="icon" @click="down(index)")
              .form-item
                  span 关联:
                  el-input.input(placeholder="请输入新的URL地址" :value="item.src")
                  el-button(type="info" @click="open(item)") 修改
                  el-button(type="danger" @click="del(index)") 删除
    .add
      el-button(type="primary" @click="open('')") 添加图片
      .info
        span (Banner仅支持JPG、PNG 格式 ，推荐比例：1920*420 px)
    el-dialog(title="添加图片" width="500px" :visible.sync="dialogVisible")
      el-form(ref="form")
        el-form-item(label="关联地址:")
          el-input(v-model="form.src" placeholder="请输入关联URL地址 eg:http://www.baidu.com/x-book.html")
        el-form-item
          img.banner(:src="form.img" ref="img")
          input.updateImg(type="file" @change="update($event,'img')" ref="updateImg")
          el-button(type="primary" size="small" @click="$refs.updateImg.click()" plain) 上传banner图
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible= false") 取消
        el-button(type="primary" @click="sendInfo('updateImg')") 确定
</template>

<style lang="stylus" scoped>
.setting
  padding 20px
  color #444
  min-width 1060px
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
  .info
    line-height 28px
    display table
    span
      line-height 32px
      color #999999
      font-size 13px
    img
      margin-right 10px
      display: table-cell;
      vertical-align: middle;
  .list
    margin-bottom 20px
    .item
      display flex
      padding 10px
      justify-content flex-start
      align-items center
    .leftSide
      padding-right 30px
      width 284px
    .thumb
      width 284px
    .operation
      line-height 40px
      >span
        padding-right 10px
      .icon
        cursor pointer
        padding 8px
      .up
        transform  rotate(90deg)
      .down
        transform rotate(-90deg)
      .form-item
        display inline-block
        .input
          width 300px
          margin 0 20px
.add
  display flex
  span
    display inline-block
    padding 5px 20px
.updateImg
  display none
.banner
  max-width 300px
  margin-right 20px
</style>
