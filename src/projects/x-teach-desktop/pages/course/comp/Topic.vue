<script>
import { getTask } from 'services/common'
export default {
  props: {
    name: {
      default: '',
    },
    type: {}, // single multi subjective_item judgment  fill
    options: {
      default: false,
    },
    detail: {},
    index: {},
    score: {},
    answers: {},
    isResolved: {
      default: false,
    },
    course: {},
  },
  created() {
    let val
    if (this.isResolved) {
      if (this.type === 'multi' && this.detail.user_answer) {
        val = this.detail.user_answer.split(',')
      } else {
        val = this.detail.user_answer
      }
    } else {
      if (this.type === 'multi') {
        val = []
      } else {
        val = ''
      }
    }
    this.detail.user_answer = val
    // console.log('this.detail.user_answer', this.detail.user_answer)
    // this.$set(this.detail, 'user_answer', val)
  },
  data() {
    return {
      temp: [],
      abc: ['A', 'B', 'C', 'D'],
      judge: [
        {
          val: 'true',
          name: '正确',
        },
        {
          val: 'false',
          name: '错误',
        },
      ],
      img_url: null,
    }
  },
  methods: {
    previewImg(evt) {
      this.uploadImg().then(res => {
        this.$emit('setAttr', this.detail, res.data.path)
        this.$set(this.detail, 'disabled', true)
        this.img_url = res.data.url
      })
    },
    upload() {
      if (this.detail.status !== 1) {
        return
      }
      this.$refs.input.click()
    },
    async uploadImg() {
      const pic = this.$refs.input.files[0]
      let res
      try {
        if (pic) {
          res = await getTask(pic)
        }
      } catch (e) {
        throw new Error('图片更新失败')
      }
      return res
    },
    goVideo(params) {
      params.course_teaching_plan_id && this.$go('/video', params)
    },
    findResourse(key) {
      const ids = {}
      if (this.course) {
        ids.course_id = this.course.id
        this.course.course_period_list.map(cpl => {
          cpl.teaching_plan &&
            cpl.teaching_plan.map(tp => {
              tp.teaching_plan_info &&
                tp.teaching_plan_info.map(tpi => {
                  if (tpi.b_id === key) {
                    ids.course_hour_id = cpl.id
                    ids.course_teaching_id = tp.id
                    ids.course_teaching_plan_id = tpi.id
                  }
                })
            })
        })
      }
      this.goVideo(ids)
    },
    setState() {
      if (this.detail.user_answer.length) {
        this.$set(this.detail, 'disabled', true)
      } else {
        this.$set(this.detail, 'disabled', false)
      }
    },
  },
}
</script>


<template lang="pug">
  .comp-topic
    .wrap.c_3 
      .name.f17
        span.index.fl(v-if="index") {{index}}
        p(v-html="name")
        span.c_8 【{{detail.type_name}}】({{score}}分) 
      .topic-answer.f15
        .type(v-if="type === 'single'") 
          .item(v-for="opt,index in options")
            span.abc {{abc[index]}}
            el-radio(
              v-model="detail.user_answer" 
              :label="abc[index]"
              :disabled="isResolved"
              @change="setState"
            )
              span.answer-title(v-html="opt.title")
        .type(v-else-if="type == 'multi'")
          el-checkbox-group(
            v-model="detail.user_answer"
            @change="setState"
            :disabled="isResolved"
          )
            .item(v-for="opt,index in options" :key="opt.title")
              span.abc {{abc[index]}}
              el-checkbox( :label="abc[index]" ) 
                span(v-html="opt.title")
        .type(v-else-if="type === 'judgment'") 
          .item(v-for="item,index in judge")
              span.abc {{abc[index]}}
              el-radio(
                v-model="detail.user_answer" 
                :label="item.val"
                :disabled="isResolved"
                @change="setState"
              )  
              span(v-html="item.name")
        .type(v-else) 
          .item.item-flex()
            textarea.answer(:disabled="isResolved" v-model="detail.user_answer" @keyup="setState")
            .upload(v-if="!img_url && !detail.img")
              input(type="file" ref="input" @change="previewImg($event)" accept="image/*")
              label(@click="upload")
                p
                  span.icon-upload
                span.f12 上传图片
            .upload(v-else-if="img_url || detail.img")
              img(:src="img_url || detail.img")
      .real.c_3.f14(v-if="isResolved")
        .true
          span.c_account(v-if="detail.status != '3'")  【得分】:{{detail.account}}
          br
          span.c_gn(v-if="detail.status == '2'")  【正确】
          span(v-if="detail.status == '3'")  【评审中】
          span.c_price(v-if="detail.status == '4'")  【错误】 
          span.c_8  你的答案： {{detail.user_answer}}    
          br
          span.mr20.c_gn(v-if="detail.status == '4'")  【正确答案】：{{detail.answer}}   
        .your.c_theme
          span(v-if="detail.status != '3'") 【解析】: 
          .analysis(v-html="detail.analysis")
          br
          span.c_teachermsg(v-if="detail.teach_answer != null") 【教师回复】：{{detail.teach_answer}}
        .link 
          span.c_8 课时计划链接： 
          span.c_blue2.cp(v-for="rl in detail.tp_constitute_info_array" @click="findResourse(rl.b_id)") {{rl.period_info}}/{{rl.teaching_plan_info}}/{{rl.resource_name}}

</template>
<style lang="stylus">
.c_teachermsg
  color #6A7064
.c_account
  color #F2A20D
.comp-topic
  .abc
    color #666
    margin-right 10px
  textarea
    width 80%
    height 100px
    background-color #F7F7F7
    border 1px solid #ebebeb
  >.wrap
    margin-bottom 50px
    >.name
      margin 20px 0 20px 0
      >span, p
        margin 0
        display inline-block
        img
          max-width 250px
          max-height 150px
          vertical-align top
    .type
       .el-checkbox-group
        .item
          .el-checkbox__label
            span
              p
                margin 0
              img
                max-width 250px
                max-height 150px
    >.topic-answer
      .item
        margin 10px
        &.item-flex
          display flex
        .answer-title
          display inline-block
          max-width 800px
      .upload
        margin-left 50px
        height 100px
        width 100px
        border 1px solid #F7F7F7
        box-shadow 0 0 0px 1px #ebebeb
        input
          display none
        label
          display block
          cursor pointer
          text-align center
          p
            margin-top 10px
            margin-bottom 0
          span
            display inline-block
        img, label
          width 100%
          height 100%
    >.real
      border-top 1px dashed #eee
      >div
        margin 10px 0
        .analysis
          img
            max-width 250px
            max-height 150px
</style>
