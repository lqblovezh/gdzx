<script>
import { mapState } from 'vuex'
import { getTask } from 'services/common'

export default {
  data() {
    return {
      isEdit: false,
      previewImgUrl: null,
      info: {},
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    isThridName () {
      return /^(qq_|weixin_|gli_oauth|sina_)/.test(this.user.name)
    }
  },
  created() {
    this.info = { ...this.user }
    //console.log(this.info)
  },
  methods: {
    async save() {
      let file = this.$refs.file.files[0]
      if (file) {
        await getTask(file).then(res => {
          this.info.picture = res.data.path
        })
      }
      this.$service.user.changeUserInfo(this.info).then(res => {
        this.$message.success('修改成功！')
        this.$service.user.isLogin().then(res => {
          // 走登录接口是因为后台返回的值里面没有积分信息
          this.$loginBackHander(res.data)
        })
      }).catch(e => {
        // this.$message.error('修改失败！')
        let patt = '^S+[a-z A-Z]$'
        if(!this.info.nick_name.match(patt)){
          this.$message.error('昵称不能为空！')
        }else{
          this.$message.error('修改失败！')
        }
      })
    },
    reset() {
      this.info = { ...this.user }
      this.isEdit = !this.isEdit
      this.previewImgUrl = null
    },
    previewImg(e) {
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.info.size = file.size
      this.info.format = file.name.substr(file.name.lastIndexOf('.') + 1)
      this.previewImgUrl = URL.createObjectURL(file)
    },
  },
}
</script>



<template lang="pug">
.comp-user-personal
  .top.tc(v-if="user")
    .img
      img(:src="previewImgUrl||user.picture_absolute", alt="alt")
      .changeImg.f16(v-if="isEdit" @click="$refs.file.click()") 更换头像
        input.hide(type="file" ref="file" @change="previewImg" accept="image/jpeg,image/jpg,image/png")
      .modify(@click="reset()")
        el-button(icon="el-icon-edit" circle)
    //- .name.f20(v-if="isEdit")
    //-   el-input(v-model="info.nick_name")
    //- .name.f20(v-else) {{user.nick_name}}
    .name.f20.ib(v-if="isEdit && isThridName")
      el-input(v-model="info.name")
    .name.f20.ellipsis(v-else) {{user.name}}
    Tbutton( @click.native="$go('/apply')" type="og_plain" v-if='!user.is_teacher' size="default") 升级为教师
  .box.c_6.f14(v-if="user")
    .item
      label.ib 
        span.spacing2 昵
        span 称:
      div.ib(v-if="isEdit")
        el-input(v-model="info.nick_name" maxlength="20" minlength="1")
      div.ib(v-else) {{user.nick_name}}
    .item
      label.ib 
        span.spacing2 性
        span 别:
      div.ib(v-if="!isEdit") {{user.sex}}
      el-radio-group(v-model="info.sex" v-else)
        el-radio(label="男") 男
        el-radio(label="女") 女
        el-radio(label="保密") 保密
    .item
      label.ib 
        span.spacing2 学
        span 校:
      div.ib(v-if="isEdit")
        el-input(v-model="info.school")
      div.ib(v-else) {{user.school}}
    .item
      label.ib 
        span.spacing2 学
        span 院:
      div.ib(v-if="isEdit")
        el-input(v-model="info.college")
      div.ib(v-else) {{user.college}}
    .btn.tc(v-if="isEdit")
      el-button(type="primary" @click="save" size="small") 保存
    
</template>
<style lang="stylus">
.comp-user-personal
  min-height 200px
  padding 50px 0
  >.top
    text-align center
    >.name
      // max-width 150px
      margin 20px auto
      height 40px
      line-height @height
    >.img
      position relative
      height 158px
      width 158px
      margin 0 auto
      >.modify
        position absolute
        left calc(50% + 80px)
        top 0
      >.changeImg
        position absolute
        left 0
        top -3px
        width 100%
        line-height 158px
        color #fefefe
        height @width
        border-radius 50%
        background rgba(0, 0, 0, 0.5)
        cursor pointer
      >img
        width 158px
        height @width
        border-radius 50%
        cursor pointer
        object-fit cover
  >.box
    width 385px
    margin 40px auto
    >div.item
      margin-bottom 25px
      line-height 40px
      &:nth-of-type(4n)
        margin-bottom 0
      >div
        margin-left 36px
        word-break keep-all
      >label
        >.spacing2
          letter-spacing 2em
    >.btn
      margin 38px 0
      button
        width 100px
</style>
