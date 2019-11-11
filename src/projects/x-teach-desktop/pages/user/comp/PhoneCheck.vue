<script>
import validate from '@/pages/account/mixins'

export default {
  mixins: [validate],
  props: ['detailDialog', 'phone'],
  data() {
    return {
      valiData: {
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
  mounted () {
    this.$nextTick(() => {
      this.getImgCode()
    })
  },
  methods: {
    close() {
      this.$emit('update:detailDialog',false)
    },
    validate() {
      this.isPass()
        .then((res) => {
          this.$service.signin
            .codeCheck({code_val:res.code_val,code_id:res.code_id}).then(res => {
              this.$emit('status',res)
            }).catch(({payload}) => {
              this.$message.error(payload.message)
            })
        })
        .catch(err => {
          this.$message.error(err)
         //console.log(err)
        })
    },
    // 发短信
    getPhoneCodeHander() {
      let data = {
        code_id_img: this.valiData.code_img.code_id_img,
        code_val_img: this.valiData.code_img.value,
        phone: this.phone,
      }
      this.$service.signin
        .codePhone(data)
        .then(res => {
          this.$message.success('短信发送成功')
          this.valiData.code_id.value = res.data.code_id
          this.$refs.inp_code_val[0].wait()
        })
        .catch(err => {
          if (err.message === '图片验证码错误') {
            this.valiData.code_img.isError = true
            this.$message.error('图片验证码错误!')
          } else {
            this.$message.error('短信发送失败! 请稍后再试')
          }
        })
    },
  },
}
</script>

<template lang="pug">
.comp-phone-check
  .dialog
    el-dialog(
      title="验证"
      :visible.sync="detailDialog"
      width="530px"
      top="20%"
      :before-close="close"
    )
      .group
        label.ib 手机号：
        span.phone {{phone}}
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
        el-button(type="primary" @click="validate()" size="small") 验证
</template>

<style lang="stylus">
.comp-phone-check
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
