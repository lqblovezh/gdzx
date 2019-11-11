<script>
import formSerialize from 'form-serialize'
import { mapMutations, mapState } from 'vuex'
import * as services from 'services/x-teach/personalInfo'
import qs from 'qs'
import { changePass } from 'services/common/member'
import { getTask } from 'services/common'

export default {
  data() {
    return {
      loginDialog: false,
      user: {},
      previewImgUrl: null,
      imgFile: null, //
      userInfo: {},
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations(['updateUser']),
    init() {
      this.userInfo = { ...this.$config.userInfo.user }
    },
    changePass() {
      //修改密码弹框
      this.loginDialog = true
    },
    previewImg(e) {
      let node = e.target
      let file = node.files[0]
      let url = URL.createObjectURL(file)
      this.$set(this.userInfo, 'picture_absolute', url)
    },
    async submit() {
      const picture = this.$refs.picture.files[0]
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      try {
        if (picture) {
          await getTask(picture).then(res => {
            this.userInfo.picture = res.data.path
          })
        }
        await services.userInfo(this.userInfo).then(res => {
          if (res.status) {
            this.$message.success('修改成功')
            loading.close()
          }
          sessionStorage.userInfo = JSON.stringify(res.data)
          this.$emit('detailBack')
        })
      } catch ({ payload }) {
        loading.close()
        this.$message.error(payload.message)
      }
    },
    changePassword() {
      //修改密码
      let data = formSerialize(this.$refs.passForm, {
        hash: true,
      })
      changePass(data).then(res => {
        this.$message.success('修改密码成功！')
        this.loginDialog = false
        window.location.href = '/'
      })
    },
  },
}
</script>

<template lang="pug">
.box
  .div
    .content1
      VaForm(ref="detailForm")
        .left
          .touxiang
            img(:src="userInfo.picture_absolute" )
          .name
            span {{userInfo.name}}
          .change
            el-button(type="primary" size="small" plain @click="$refs.picture.click()") 修改
            input.hide(type="file" ref="picture" @change="previewImg($event)")
        .right
          el-form(label-width="80px")
            el-form-item(label="名称:")
              el-input(v-model="userInfo.nick_name")
            el-form-item(label="性别:")
              el-input(v-model="userInfo.sex")
            el-form-item(label="出生日:")
              el-date-picker(
                v-model="userInfo.date_of_birth"
                type="datetime"
                placeholder="出生日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              )
            el-form-item(label="学历:")
              el-input(v-model="userInfo.education")
            el-form-item(label="电话:")
              el-input(v-model="userInfo.phone")
            el-form-item(label="邮箱:")
              el-input(v-model="userInfo.email")
            el-form-item(label="院系:")
              el-input(v-model="userInfo.college")
            el-form-item(label="职务:")
              el-input(v-model="userInfo.duties")
            el-form-item(label="简介:")
              el-input(v-model="userInfo.summary")
            el-form-item(label="提成比例:")
              span.text(v-text="userInfo.app_setting&&userInfo.app_setting.profit_ratio")
            el-form-item(label="钱包余额:")
              span.text(v-text="userInfo.statistics&&userInfo.statistics.balances")
          .changePass
            el-button(type="primary" size="small" plain) 提现
            el-button(type="primary" size="small" plain @click="changePass()") 修改登录密码
            //- 修改密码
            el-dialog.noPadding(
              :visible.sync="loginDialog"
              width="420px"
              :close-on-click-modal="false"
              :lock-scroll= "false"
              :append-to-body="true"
            )
              .top(slot="title")
                el-tabs(value="pass")
                  el-tab-pane(label="修改密码" name="pass")
              form.passContent(ref='passForm')
                .group
                  .label 旧密码:
                  input.form-control(name="old_pass" type="password")
                .group
                  .label 新密码:
                  input.form-control(name="new_pass" type="password")
                .group
                  .label 新密码确认:
                  input.form-control(name="new_pass_confirm" type="password")
              span.dialog-footer(slot="footer")
                el-button(  @click="loginDialog = false" ) 取 消
                el-button(  type="primary" @click="changePassword") 确 定
    .bottom
      //- el-button(type="primary" plain @click="updateInfo") 修改个人信息
      input.hide(type="file" :accept="$config.imgAccept" @change="previewImg($event)" ref="picture")
      el-button(type="primary" @click="submit()") 确定
</template>

<style lang="stylus" scoped>
.noPadding
  >>> .el-dialog__body
    padding 0 20px
.passContent
  .group
    margin 20px 0
    .des
      text-align right
      display inline-block
      width 50px
      margin-right 20px
    input
      width 200px
    .codeimg
      vertical-align middle
.box
  padding 20px
  .div
    background #fff
    width 100%
    padding 20px
    position relative
    overflow hidden
    .content1
      .left
        width 200px
        height 100%
        float left
        .touxiang
          width 100px
          height 100px
          margin 0 auto
          border-radius 50%
          border 1px solid #ccc
          img
            background-position center
            border-radius 50%
            width 100px
            height 100px
        .name
          text-align center
          line-height 20px
          padding-top 20px
        .change
          margin-left 35%
          margin-top 10px
      .right
        float left
        width calc(100% - 220px)
        border-left 1px solid #ccc
        >>> .text
          color #888
        form
          width 400px
        .changePass
          padding-left 80px
      .teacher
        float left
        margin-right 300px
        height auto
        .picture
          width 150px
          height 150px
          img
            width 100%
            height 100%
        .select
          margin-top 20px
    .bottom
      margin-left 200px
</style>
