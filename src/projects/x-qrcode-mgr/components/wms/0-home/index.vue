<script>
import * as service from 'services/x-teach/home'
import RunningTime from 'projects/common/runningTime'

export default {
  components: { RunningTime },
  data() {
    return {
      seriverTime: '',
      timeStamp: '',
      info: {
        qrcode: {},
        qrcode_product: {},
        qrcode_resource: {},
      },
      plantInfo: this.$config.plantInfo,
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.seriverTime = new Date()
      service.getServiceTime().then(res => {
        this.seriverTime = res.data.now_time
        this.info = res.data
      })
    },
  },
}
</script>

<template lang="pug">
.mainRight
	.headGuide
		.logo
			img(:src="plantInfo?plantInfo.logo_absolute:''", alt="alt")
		.guide
			h2 {{plantInfo?plantInfo.name:''}}
			p {{plantInfo?plantInfo.exp:''}}
			RunningTime(:currentTime='seriverTime' v-if='seriverTime')
				span 服务器当前时间：
	.content
		.warehouse.modular
			.title 二维码库
			ul.list
				li(:class="'code_'+key" v-for='item,key,index in info.qrcode' :key="index")
					p {{item.name}}
					p {{item.count}}
		.warehouse.modular
			.title 二维码产品
			ul.list
				li(:class="'pCode_'+key" v-for='item,key,index in info.qrcode_product' :key="index")
					p {{item.name}}
					p {{item.count}}
		.warehouse.modular.rukou
			.title 快捷入口
			ul.list
				li
					router-link.body(to="/wms/qrcodeProduct")
						div(class="entry_audit")
						p 产品库
				li
					router-link.body(to="/wms/qrcode")
						div(class="entry_setting")
						p 二维码库
				li
					router-link.body(to="/wms/proStatics")
						div(class="entry_course")
						p 数据报表
				li
					router-link.body(to="/wms/vote")
						div(class="entry_course_t")
						p 应用库
				li
					router-link.body(to="/wms/showList")
						div(class="entry_marking")
						p 营销库
</template>
<style lang="stylus" scoped>
$entry = entry_audit entry_setting entry_course entry_course_t entry_marking
$library = code_all code_used_count code_not_use_count pCode_all pCode_used_count pCode_stop_count
for name in $entry
  .{name}
    background url('../../../assets/img/icon_'+name+'.png') no-repeat center
    background-size contain
for name in $library
  .{name}
    background url('../../../assets/img/icon_'+name+'.png') no-repeat center
    background-size contain
.mainRight
  padding 0 20px 30px
  .headGuide
    padding 20px
    .logo
      width 78px
      height 44px
      display inline-block
      margin-right 10px
      text-align center
      img
        max-width 100%
        max-height 100%
    .guide
      display inline-block
      h2
        padding-bottom 10px
        font-weight bold
        font-size 17px
        color #444
      p
        font-size 14px
        line-height 24px
        color #777
  .content
    .modular
      background-color #fff
      padding 10px 20px
      margin-bottom 20px
    .title
      color #424857
      font-size 16px
      position relative
      padding-left 20px
      line-height 36px
      border-bottom 1px solid #e3e6ec
      &:after
        content ''
        display block
        width 3px
        height 16px
        top 50%
        left 0
        margin-top -8px
        background-color #44c3aa
        position absolute
    .warehouse
      .list
        padding-top 35px
        padding-bottom 15px
        li
          a
            display block
            height 100%
            text-decoration none
          width 190px
          height 110px
          display inline-block
          p
            color #fff
            padding-left 75px
            position relative
            &:first-child
              top 30px
              font-size 14px
            &:last-child
              top 40px
              font-size 20px
              padding-right 12px
      &.rukou
        padding-bottom 35px
        li
          height 60px
          text-align left
          >a
            >div
              width 60px
              height @width
              padding-right 20px
              display inline-block
          p
            display inline-block
            line-height 60px
            color #555
            &:last-child
              padding 0
              top 0
              font-size 14px
</style>
