<script>
import Head from '@/components/common/head'
import Modal from '@/components/common/modal'
export default {
  data() {
    return {
      list: [],
      isShowModal: false,
      curClass: null,
    }
  },
  components: {
    Head,
    Modal,
  },
  mounted() {
    this.getList()
  },
  computed: {
    courseId() {
      return this.$route.params.course_id
    },
  },
  methods: {
    getList() {
      this.$service.clazz
        .getClazzByCourse({ id: this.courseId })
        .then(res => {
          this.list = res.data
        })
        .catch(console.error)
    },
    toggleModalStatus(curClass) {
      this.curClass = curClass
      this.$refs.myModal.toggleStatus()
    },
    sendCode(code) {
      this.$service.clazz
        .addClazz({
          id: this.curClass.id,
          code,
        })
        .then(res => {
          this.$refs.myModal.toggleStatus()
          this.$router.go(-1)
        })
        .catch(({ payload }) => {
          this.$Toast({
            message: payload.message,
          })
        })
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="班级列表" :main-type="1" class="join-class")
  .join-class__content
    table.table(v-if="list.length > 0")
      tr(v-for="item in list")
        td {{item.class_name}}
        td {{item.teacher_name}}
        td
          button(@click="toggleModalStatus(item)") 加入
            span.icon-join
    p.join-tips.f14(v-else) 暂无班级
  Modal(ref="myModal" @sendCode="sendCode")
</template>
<style lang="stylus" scoped>
.join-class__content
  padding 0 0.3rem
.join-tips
  margin-top 0.2rem
.table
  margin-top 0.25rem
  width 100%
  color #4d4d4d
  background-color #fff
  font-size 14px
  tr
    height 1rem
    line-height 1rem
    td
      &:nth-of-type(2)
        color #666
      &:last-child
        text-align right
    button
      width 1.3rem
      height 0.44rem
      line-height 0.44rem
      color #3496e1
      border-radius 5px
      outline none
      border 1px solid #3496e1
      background-color #FFF
      span
        margin-left 0.05rem
        margin-top 0.1rem
</style>
