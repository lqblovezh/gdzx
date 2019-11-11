<script>
import qrcode from 'qrcode'
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
    murl: {},
    sites: {
      default: function() {
        return ['wechat', 'qzone', 'qq', 'weibo']
      },
    },
  },
  data() {
    return {
      types: {},
      weixinCode: '',
      config: {},
    }
  },
  mounted() {
    this.init()
    this.generateQrCode()
  },
  methods: {
    getWXCourseUrl (course_id) {
      return location.href.replace(/(\/teach)/, '/teach/h5').replace(/detail.*$/g, course_id)
    },
    init() {
      const {
        id
      } = this.$route.query
      this.config = {
        URL: location.href, // 网址，默认使用 window.location.href
        MURL: this.murl || this.getWXCourseUrl(id), // 对应移动端的url, 微信扫码
        TITLE: this.title, //// 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        DESCRIPTION: this.description,
        SUMMARY: this.description,
        SOURCE: document.title, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        IMAGE: this.image, // 图片, 默认取网页中第一个img标签
        WEIBOKEY: '',
        SITE_URL: location.origin,
        SUBHEAD: '', // facebook
      }
      console.log(MURL, 'MURL')
      const {
        URL,
        MURL,
        TITLE,
        DESCRIPTION,
        SUMMARY,
        SOURCE,
        IMAGE,
        WEIBOKEY,
        SITE_URL,
        SUBHEAD,
      } = this.config
      this.types = {
        qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${URL}&title=${TITLE}&desc=${DESCRIPTION}&summary=${SUMMARY}&site=${SOURCE}`,
        qq: `http://connect.qq.com/widget/shareqq/index.html?url=${URL}&title=${TITLE}&source=${SOURCE}&desc=${DESCRIPTION}&pics=${IMAGE}`,
        //腾讯微博, 已废弃 tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${TITLE}&url=${URL}&pic=${IMAGE}`,
        weibo: `https://service.weibo.com/share/share.php?url=${URL}&title=${TITLE}&pic=${IMAGE}&appkey=${WEIBOKEY}`,
        wechat: ``,
        douban: `http://shuo.douban.com/!service/share?href=${URL}&name=${TITLE}&text=${DESCRIPTION}&image=${IMAGE}&starid=0&aid=0&style=11`,
        diandian: `http://www.diandian.com/share?lo=${URL}&ti=${TITLE}&type=link`,
        linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${TITLE}&url=${URL}&summary=${SUMMARY}&source=${SOURCE}&armin=armin`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${URL}&title=${TITLE}&description=${DESCRIPTION}&caption=${SUBHEAD}&link=${URL}&picture=${IMAGE}`,
        twitter: `https://twitter.com/intent/tweet?text=${TITLE}&url=${URL}&via=${SITE_URL}`,
        google: `https://plus.google.com/share?url=${URL}`,
      }
    },
    share(item, key) {
      ////console.log(item)
      ////console.log(key)
    },
    generateQrCode() {
      qrcode.toDataURL(this.config.MURL).then(url => {
        ////console.log('urllllll', url)
        this.weixinCode = url
      })
    },
  },
}
</script>


<template lang="pug">
  .comp-my-share 
    .ls.social-share()
      .item.ib(v-for="key in sites")
        a.social-share-icon.cp( v-if="key !== 'wechat'" :class="`icon-${key}`"  :href="types[key]"  target="_blank") 
        a.social-share-icon.cp(v-else :class="`icon-${key}`" ) 
          .wechat-qrcode
            h4 微信扫一扫：分享
            .qrcode
              img( :src="weixinCode" )
            .help
              p 微信里点“发现”，扫一下
              p 二维码便可将本文分享至朋友圈。
</template>
<style lang="stylus">
.qrcode
  margin 0px
  >img
    width 100%
</style>
