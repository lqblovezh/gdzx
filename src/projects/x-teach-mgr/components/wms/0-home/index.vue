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
        resources: {},
        proceedings: {},
        proceedings: {},
        orders: {},
      },
      plantInfo: this.$config.plantInfo,
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      service.getServiceTime().then(res => {
        this.info = res.data
        this.seriverTime = res.data.time
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
	.content(v-if="$config.isTeacher")
		.warehouse.modular
			.title 数据概览
			ul.list
				li(class="course_all_t")
					router-link.body(to="/wms/course")
						p 全部课程
						p {{info.resources.course_all}}
				li(class="course_on_shelf")
					p 上架中课程
					p {{info.resources.course_on_shelf}}
				//- li(class="resources")
				//- 	p 个人资源
				//- 	p {{info.resources.resources}}
				li(class="classes_all_t")
					router-link.body(to="/wms/class")
						p 班级数量
						p {{info.resources.classes_all}}
				li(class="practices")
					p 习题数量
					p {{info.resources.practices}}
		.warehouse.modular
			.title 其他数据
			ul.list
				li(class="examinations_marked")
					p 已阅卷
					p {{info.proceedings.examinations_marked}}
				li(class="examinations_unmarked")
					p 未阅卷
					p {{info.proceedings.examinations_unmarked}}
				li(class="questions_answered")
					p 已答疑
					p {{info.proceedings.questions_answered}}
				li(class="questions_unanswered")
					p 未答疑
					p {{info.proceedings.questions_unanswered}}
		.warehouse.modular.rukou
			.title 快捷入口
			ul.list
				li
					router-link.body(to="/wms/course")
						div(class="entry_course_t")
						p 课程库
				li
					router-link.body(to="/wms/marking")
						div(class="entry_marking")
						p 阅卷
				li
					router-link.body(to="/wms/message/answer")
						div(class="entry_answer")
						p 答疑
	.content(v-else)
		.warehouse.modular
			.title 资源数量
			ul.list
				//- li(class="resources_all")
				//- 	p 资源数
				//- 	p {{info.resources.resources_all}}
				li(class="course_all")
					router-link.body(to="/wms/course")
						p 课程总数
						p {{info.resources.course_all}}
				li(class="classes_all")
					router-link.body(to="/wms/class")
						p 班级总数
						p {{info.resources.classes_all}}
				li(class="teachers_all")
					router-link.body(to="/wms/editorial")
						p 教师总数
						p {{info.resources.teachers_all}}
				li(class="users_all")
					router-link.body(to="/wms/member")
						p 学员总数
						p {{info.resources.users_all}}
		.warehouse.modular
			.title 订单数量
			ul.list
				li(class="orders_today")
					p 今日订单
					p {{info.orders.orders_today}}
				li(class="amount_today")
					p 今日销售额
					p {{info.orders.amount_today}}
				li(class="amount_month")
					p 本月销售额
					p {{info.orders.amount_month}}
		.warehouse.modular.rukou
			.title 快捷入口
			ul.list
				li
					router-link.body(to="/wms/audit")
						div(class="entry_audit")
						p 编辑审核
				li
					router-link.body(to="/wms/setting/banner")
						div(class="entry_setting")
						p 网站编辑
				li
					router-link.body(to="/wms/course")
						div(class="entry_course")
						p 课程管理
				li
					router-link.body(to="/wms/message")
						div(class="entry_message")
						p 消息管理
</template>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'

$entry = entry_audit entry_setting entry_course entry_message entry_course_t entry_marking entry_answer
$library = course_all_t course_on_shelf resources classes_all_t practices examinations_marked examinations_unmarked questions_answered questions_unanswered resources_all course_all classes_all teachers_all users_all orders_today amount_today amount_month
for name in $entry
  .{name}
    bg-image('icon_' + name)
for name in $library
  .{name}
    bg-image('icon_' + name)
.mainRight
  padding 0 20px 0
  padding-right 20px
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
.path .item
  cursor pointer
  transition 0.4s
  &:hover
    background rgb(68, 195, 170)
    color #ffffff
    border-color transparent
</style>
