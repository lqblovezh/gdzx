<script>
import { addLinks } from 'projects/common/util'

export default {
  props: {
    title: {
      default: '课程2222222222222',
    },
    description: {
      default: '描述',
    },
    image: {
      default: 'http://img1.mukewang.com/5a73f54f000190d206000338-240-135.jpg',
    },
  },
  async mounted() {
    await this.addShare()
    this.initShare()
  },
  methods: {
    async addShare() {
      if (!window.socialShare) {
       //console.log('add')
        // addLinks(baseUrl + '/static/share/css/share.min.css', 'css')
        await addLinks(baseUrl + '/static/share/js/social-share.min.js')
      }
    },
    initShare() {
     //console.log('init share')
      socialShare('.comp-share', {
        title: this.title,
        description: this.description,
        image: this.image,
        // sites: ['weibo','qq','wechat','tencent','douban','qzone','linkedin','diandian','facebook','twitter','google'],
        sites: ['wechat', 'qzone', 'qq', 'weibo'], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
      })
    },
  },
}
</script>


<template lang="pug">
div 
  div.comp-share
</template>


<style lang="stylus">
</style>
