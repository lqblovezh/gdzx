<template lang="pug">
  .exam-subjective
    textarea(v-model="default_txt" placeholder="请输入您的回答")
    .upload-img.f14.c-theme.flex-ac
      .i-upload
      label(for="upload") {{ img_url?'更换图片':'上传图片' }}
      input(id="upload" ref="myInput" type="file" accept="image/*" @change="previewImg($event)")
    .exam-imgs(v-show="cur_img")
      img(:src="cur_img")
      span.i-img-close(@click="remove")
    button.btn-exam.c-f.c-bg-theme(@click="comfirm") 确定
</template>
<script>
import { uploadPic } from '@/mixins/upload'
export default {
  mixins: [uploadPic],
  props: {
    def: {}
  },
  computed: {
    cur_img () {
      return this.img_url || (this.default_ans && this.default_ans.url)
    },
    default_txt: {
      get () {
        return this.txt || (this.default_ans && this.default_ans.txt)
      },
      set (text) {
        this.txt = text
      }
    }
  },
  data () {
    return {
      default_ans: this.def,
      txt: ''
    }
  },
  methods: {
    comfirm () {
      // 将图片上传后，再将数据传递给父组件
      this.uploadImg().then(res => {
        let data = {}
        if (res) {
          const { path, url } = res
          data = { path, url }
        }
        this.$emit('comfirm_answer', { txt: this.txt, ...data })
      }).catch(e => {
        console.log(e)
      }) 
    },
    remove () {
      if (this.default_ans) {
        this.default_ans.url = null
      }
      this.removeImg()
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/mixin.styl";
  .exam-subjective
    textarea
      margin 0.34rem 0 0.22rem
      padding 0.2rem
      width 100%
      height 4.2rem
      border-radius 0.1rem
      box-sizing border-box
      resize none
      border none
      outline none
      line-height 1.5
      color $text-color-8
      font-size 16px
      box-shadow 0 0 0.06rem rgba(0, 0, 0, .2)
    .upload-img
      label
        margin-left 0.1rem
    input[type="file"]
      display none
    .exam-imgs
      margin-top 0.2rem
      display inline-block
      position relative
      img
        width 1.2rem
        height 1.2rem
      span
        position absolute
        top 0
        right 0
</style>