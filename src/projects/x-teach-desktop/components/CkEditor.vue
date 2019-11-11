<script>
import { addLinks } from 'projects/common/util'

export default {
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '400px',
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // 富文本加载资源的url地址,不然会加载报错
      await this.addEditor()
      this.initEditor()
    },
    initEditor() {
      CKEDITOR.replace('editor1', {
        // uiColor: '#9AB8F3',
      })
    },
    async addEditor() {
      let arr = ['/static/ckeditor/ckeditor.js']
      for (let item of arr) {
        await addLinks(baseUrl + item).then(res => {
         //console.log('url======>  ', baseUrl + item)
        })
      }
    },
  },
}
</script>


<template lang="pug">
  div 
    <form  :style="{width,height}">
        <textarea name="editor1" id="editor1" rows="10" cols="80"> This is my textarea to be replaced with CKEditor.  </textarea>
    </form>
</template>


<style lang="stylus">
</style>
