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
      // 必须设置为全局变量, 因为插件的引用会需要
      window.UMEDITOR_HOME_URL = baseUrl + '/static/ueditor/'
      await this.addEditor()
      this.initEditor()
    },
    initEditor() {
     //console.log('add')
      window.um = UM.getEditor('myEditor', {
        /* 传入配置参数,可配参数列表看umeditor.config.js */
        // toolbar: ['undo redo | bold italic underline'],
        // 富文本加载资源的url地址,不然会加载报错
      })
    },
    async addEditor() {
      addLinks(baseUrl + '/static/ueditor/themes/default/css/umeditor.css', 'css').then(res => {
       //console.log('url======>  ', baseUrl + '/static/ueditor/themes/default/css/umeditor.css')
      })
      // 1.23 版本字号无用
      let arr = [
        '/static/ueditor/third-party/jquery.min.js',
        '/static/ueditor/umeditor.config.js',
        '/static/ueditor/umeditor.js',
        '/static/ueditor/lang/zh-cn/zh-cn.js',
      ]
      // forEach 不支持异步遍历
      // arr.forEach(async item => {
      //   await addLinks(baseUrl + item).then(res => {
      //    //console.log('url======>  ', item)
      //   })
      // })
      //es9 特性, 异步迭代, 支持interator的对象(obj没有, obj用for in )
      for (let item of arr) {
        await addLinks(baseUrl + item).then(res => {
         //console.log('url======>  ', baseUrl + item)
        })
      }
    },
    addImgBtn() {
      
    },
  },
}
</script>


<template lang="pug">
  .comp-editor
    .wrap
      script( id="myEditor" name="content" type="text/plain" :style="{width,height}")
        |这里写你的初始化内容
</template>
<style lang="stylus" scoped>
</style>
