<script>
import validate from '@/pages/account/mixins'

export default {
  mixins: [validate],
  props: ['changeDialog', 'phone'],
  data() {
    return {
      valiData: {
        phone: {
          display: '号码错误',
          rules: 'is_phone',
          cname: '新手机号',
          type: 'text',
          value: '',
          isError: false,
        },
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
        code_val: {
          display: '短信错误',
          rules: 'min_length(4)',
          cname: '短信验证',
          type: 'text',
          isPhoneCode: true,
          isError: false,
          value: '',
        },
        code_id: {
          value: '',
          noRender: true,
        },
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getImgCode()
    })
  },
  methods: {
    close() {
      this.$emit('update:changeDialog', false)
    },
    save() {
      this.isPass()
        .then(async res => {
          try {
            await this.$service.signin.codeCheck({
              code_val: res.code_val,
              code_id: res.code_id,
            })
            await this.$service.user.changeUserInfo({
              phone: this.valiData.phone.value,
            })
            await this.$service.user.isLogin().then(res => {
              // 走登录接口是因为后台返回的值里面没有积分信息
              this.close()
              this.$message.success('修改成功')
              this.$loginBackHander(res.data)
            })
          } catch ({ payload }) {
            this.$message.error(payload.message)
          }
        })
        .catch(err => {
          //console.log(err)
        })
    },
  },
}
</script>

<template lang="pug">
.comp-phone-change
  .dialog
    el-dialog(
      title="绑定手机号"
      :visible.sync="changeDialog"
      width="530px"
      top="20%"
      :before-close="close"
    )
      .group
        LoginInput(
          :ref="`inp_${key}`"
          v-for="item,key in valiData"
          v-if="!item.noRender"
          @imgClickHander="getImgCode"
          @phoneClickHander="getPhoneCodeHander"
          :key="key"
          :name="key"
          :data="item"
        )
      .dialog-footer.tc(slot="footer")
        el-button(type="primary" @click="save()" size="small") 确认
</template>

<style lang="stylus">
.comp-phone-change
  >.dialog
    .el-dialog__header
      border-bottom 1px solid #e6e6e6
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
