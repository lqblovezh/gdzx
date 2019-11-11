<script>
import { valiInp } from '@/common/js/directive'

export default {
  props: {
    data: {},
    name: {},
  },
  mounted() {
    // this.$refs.inp.addEventListener('blur', this.blurHandler)
  },
  beforeDestroy() {
    // 因为组件会
    //console.log('remove')
    // this.$refs.inp.removeEventListener('blur')
  },
  data() {
    return {
      time: 0,
    }
  },
  computed: {
    showVal() {
      if (this.time === 0) {
        return '发送短信'
      } else {
        return 61 - this.time
      }
    },
  },
  methods: {
    blurHandler(e) {
      if (!this.data.rules) return
      const inpVal = e.target.value
      valiInp(inpVal, this.data)
    },
    focusHandler() {
      // this.data.isError = false
    },
    vali() {
      // console.dir(this.$refs.inp)
      valiInp(this.$refs.inp.value, this.data)
    },
    wait() {
      if (this.time !== 0) return
      this.time++
      let timer = setInterval(() => {
        if (this.time < 61) {
          this.time++
        } else {
          this.time = 0
          clearInterval(timer)
        }
      }, 1000)
    },
    getPhoneCode() {
      if (this.time !== 0) return
      this.$emit('phoneClickHander')
    },
  },
}
</script>


<template lang="pug">
  .comp-login-input.f14.vm-all
    .ib {{data.cname}} ：
    //-  弃用 v-vali="data"  
    input.bd_e(
      @focus="focusHandler"
      @blur="blurHandler"
      :id="data.id"
      :class="{code: (data.isCode || data.isPhoneCode) }"
      :type="data.type" 
      :name="name" 
      ref="inp"
      autocomplete='tel'
      v-model="data.value")
    .ib.code(v-if="data.isPhoneCode || data.isCode")  
      .login_btn.c_theme_bg.fr(
        :class="{grey:time !== 0}"
        @click="getPhoneCode"
        v-if="data.isPhoneCode") {{showVal}}
      img.img.cp(
        v-if="data.isCode"
        @click="$emit('imgClickHander')"
        :src="data.img_src")
    .ib
      span.c_error(v-if="data.isError") {{data.display}}
</template>
<style lang="stylus">
.comp-login-input
  margin 30px 0
  height 38px
  line-height 38px
  >input
    height 100%
    width 280px
    background #f8f8f8
    &.code
      width 140px
  >.ib
    padding-left 20px
    &:first-child
      width 80px
      text-align right
      margin-right 15px
    &:last-child
      line-height 20px
    &.code
      >.img
        font-size 0
        height 36px
        width 100px
        margin-left 20px
        vertical-align middle
</style>
