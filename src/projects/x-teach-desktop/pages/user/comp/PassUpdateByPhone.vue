<script>
import validate from '@/pages/account/mixins'

export default {
  mixins: [validate],
  props: ['passUpdateDialog'],
  data() {
    return {
      valiData: {
        // user_name: {
        //   // 验证所需字段
        //   display: '用户名错误!',
        //   rules: 'min_length(4)',
        //   // 组件额外字段
        //   cname: '账 户',
        //   type: 'text',
        //   value: '',
        //   isError: false,
        // },
        code_img: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '验证码',
          type: 'text',
          isCode: true,
          isError: false,
          value: '',
          img_src: '',
          code_id_img: '', // 图片的id
        },
        // 手机短信的codeval
        code_val: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '短信验证',
          type: 'text',
          isPhoneCode: true,
          isError: false,
          value: '',
        },
        pass: {
          // 验证所需字段
          display: '密码过短',
          rules: 'min_length(5)',
          // 组件额外字段
          cname: '新密码',
          type: 'password',
          value: '',
          id: 'lq_pwd_back_reset',
          isError: false,
        },
        pass_confirm: {
          // 验证所需字段
          display: '两次密码不相等',
          rules: 'same2(lq_pwd_back_reset)|min_length(1)',
          // 组件额外字段
          cname: '确认密码',
          type: 'password',
          value: '',
          isError: false,
        },
      },
    }
  },
  mounted () {
    this.getImgCode()
  },
  methods: {
    close() {
      this.$emit('update:passUpdateDialog',false)
    },
    save() {
      this.isPass()
        .then(async (res) => {
          const {
            user_id,
            value: code_val,
          } = this.valiData.code_val
          const { pass, pass_confirm } = res
          if (user_id && code_val) {
            await this.$service.signin.pwdBackRestPwd({ user_id, code_val, pass, pass_confirm })
            await this.$service.user.isLogin().then(res => {// 走登录接口是因为后台返回的值里面没有积分信息
              this.close()
              this.$message.success('修改成功')
              this.$loginBackHander(res.data)
            })
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    getPhoneCodeBackHander() {
      if (this.$user && !this.$user.phone) {
        this.$message.warning('请绑定手机号！')
        return
      }
      let data = {
        user_name: this.$user.name,
        code_val: this.valiData.code_img.value,
        code_id: this.valiData.code_img.code_id_img,
      }
      this.$service.signin
        .pwdBackPhoneCode(data)
        .then(res => {
         //console.log('phoneback', res)
          this.$message({
            type: 'success',
            message: `已向账户:${
              this.$user.name
            }发送短信! 请注意查收!`,
          })
          // 保存手机验证码id
          this.valiData.code_val.user_id = res.data.user_id
          // 60秒内不再发送
          this.$refs.inp_code_val[0].wait()
        })
        .catch(err => {
          console.error('短信发送错误', err)
          switch (err.message) {
            case '短信发送错误':
              this.valiData.code_img.isError = true
              break
            default:
              break
          }
          this.$message({
            type: 'error',
            message: err.message,
          })
        })
    },
  },
}
</script>

<template lang="pug">
.comp-phone-change
  .dialog
    el-dialog(
      title="修改密码"
      :visible.sync="passUpdateDialog"
      width="600px"
      top="20%"
      :before-close="close"
    )
      .group
        form(ref="form")
          LoginInput(
            v-for="item,key in valiData"
            @imgClickHander="getImgCode"
            @phoneClickHander="getPhoneCodeBackHander"
            :ref="`inp_${key}`"
            :key="key"
            :name="key"
            :data="item"
          )
      .dialog-footer.tc(slot="footer")
        el-button(@click="close()" size="small") 取消
        el-button(type="primary" @click="save()" size="small") 确认
</template>

<style lang="stylus">
.comp-phone-change
  >.dialog
    .el-dialog__header
      border-bottom: 1px solid #e6e6e6;
    .el-dialog__body
      >.group
        line-height 40px
        label 
          width 80px
          text-align right
          padding-left 20px
          margin-right 20px
  min-height 20px
</style>
