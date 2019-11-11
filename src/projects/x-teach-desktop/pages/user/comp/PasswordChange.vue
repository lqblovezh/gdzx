<script>
import validate from '@/pages/account/mixins'

export default {
  mixins: [validate],
  props: ['passDialog'],
  data() {
    return {
      valiData: {
        oldPassword: {
          // 验证所需字段
          display: '密码不能小于6位',
          rules: 'min_length(6)',
          // 组件额外字段
          cname: '原 密 码',
          type: 'password',
          value: '',
          isError: false,
        },
        password: {
          // 验证所需字段
          display: '密码不能小于6位',
          rules: 'min_length(6)',
          // 组件额外字段
          cname: '新 密 码',
          type: 'password',
          value: '',
          isError: false,
          id: 'register_pwd',
        },
        repassword: {
          // 验证所需字段
          display: '两次密码不相等',
          rules: 'same2(register_pwd)|min_length(1)',
          // 组件额外字段
          cname: '确认密码',
          type: 'password',
          value: '',
          isError: false,
        },
      },
    }
  },
  methods: {
    close() {
      this.$emit('update:passDialog',false)
    },
    save() {
      this.isPass()
        .then(async (res) => {
          await this.$service.signin.changePass({old_pass:res.oldPassword,new_pass:res.password,new_pass_confirm:res.repassword})
          await this.$service.user.isLogin().then(res => {// 走登录接口是因为后台返回的值里面没有积分信息
            this.close()
            this.$message.success('修改成功')
            this.$loginBackHander(res.data)
          })
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  },
}
</script>

<template lang="pug">
.comp-phone-change
  .dialog
    el-dialog(
      title="修改密码"
      :visible.sync="passDialog"
      width="600px"
      top="20%"
      :before-close="close"
    )
      .group
        LoginInput(
          :ref="`inp_${key}`"
          v-for="item,key in valiData"
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
