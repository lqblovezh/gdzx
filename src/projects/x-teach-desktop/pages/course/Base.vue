<script>
import DetailCard from './comp/DetailCard'
import DialogAddCourse from './comp/DialogAddCourse'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { DetailCard, DialogAddCourse },
  asyncData({ store, route }) {
    return store.dispatch('course/getData', route.query)
  },
  created() {
    //console.log('object')
    this.init()
  },
  async mounted() {
    await this.dataPromise
    if (!this.detail.pass && !/\/course\/detail/.test(this.$route.path)) {
      this.$replace('/course/detail', this.$route.query)
    }
  },
  beforeDestroy() {
    this.$store.state.course.courseDetail = null
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id !== from.query.id) {
      this.$store.dispatch('course/getData', to.query)
    }
    //console.log('update')
    next()
  },
  data() {
    return {
      courseNav: {
        detail: {
          name: '课程介绍',
          path: '/course/detail',
        },
        step: {
          name: '课程目录',
          path: '/course/step',
        },
        teacher: {
          name: '授课教师',
          path: '/course/teacher',
        },
        discuss: {
          name: '课程评价',
          path: '/course/discuss',
        },
        answer: {
          name: '随堂辅导',
          path: '/course/answer',
        },
        exam: {
          name: '考核评价',
          path: '/course/examList',
        },
      },
      isCourseDialogShow: false,
    }
  },
  computed: {
    ...mapState({
      detail: state => state.course.courseDetail,
      cart: state => state.cart,
    }),
    ...mapGetters(['cartList', 'totalCart']),

    currActive() {
      return this.$route.path
    },
  },
  methods: {
    init() {
      //console.log('base')
    },
    go(item) {
      if (item.path !== '/course/detail') {
        console.log(this.$user)
        if (!this.$user) {
          this.$message.error('请先登陆!')
          return
        }
        if (!this.detail.pass) {
          this.$message.error('请先购买!')
          return
        }
      }
      this.$go(item.path, { id: this.$route.query.id })
    },
    addCart(silence = false) {
      // 是否登陆判断
      if (this.$isUser()) {
        let ids = [this.detail.id]
        const { id, name, abs, price, img } = this.detail
        let cartObj = { id, name, abs, price, img, checked: true }
        if (this.$user) {
          this.$service.cart.add({ ids }).catch(({ payload, message }) => {
            this.$delete(this.cart, cartObj.id)
            this.$message.error(payload.message ? payload.message : message)
          })
        }
        this.$set(this.cart, cartObj.id, cartObj)
        if (silence) return
        this.$message.success('添加成功!')
      }
    },
    addLocalCart() {
      const { id, name, abs, price, img } = this.detail
      let cartObj = { id, name, abs, price, img, checked: true }
      this.$set(this.cart, cartObj.id, cartObj)
    },
    directBuy() {
      // 进入cart
      if (this.$isUser()) {
        this.addCart(true)
        // 只买当前选择的
        this.cartList.forEach(item => {
          if (item.id === this.detail.id) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        this.$go('/cart')
      }
    },
    addCourse() {
      if (this.$isUser()) {
        this.isCourseDialogShow = true
      }
    },
    toNumber(time) {
      return Number(new Date(Date.parse(time)))
    },
    study() {
      if (
        this.toNumber(this.detail.effective_duration_start) >
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习未开始!')
      }
      if (
        this.toNumber(this.detail.effective_duration_end) <
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习已结束!')
      }
      if (!this.$isUser() || !this.detail.user_speed_buy_status) {
        //console.log('请先购买')
        return
      }
      if (parseInt(this.detail.user_speed_time_protion) == 100) {
        this.$service.course
          .resetCourseTime({
            id: [this.detail.id],
          })
          .then(res => {
            this.$store.dispatch('course/getData', this.$route.query)
          })
          .catch(err => {
            console.warn(`${e.toString()}`)
          })
        return
      }
      this.$go('/video', { course_id: this.$route.query.id })
    },
    addClazzBackHandler() {
      this.isCourseDialogShow = false
    },
    starChange(num) {
      //console.log(num)
    },
  },
}
</script>

<template lang="pug">
  div
    NormalWrap 
      .page-course-base.c_f5_bg(v-if="detail")
        Crumb(:name="detail.name")
        .detail-card.cbox.c_f_bg
          DetailCard(
            @addCart="addCart"
            @directBuy="directBuy"
            @addCourse="addCourse"
            @study="study"
            @starChange="starChange"
            :name="detail.name"
            :price="detail.price"
            :imgUrl="detail.img"
            :des="detail.abs"
            :star="detail.score"
            :teacher="detail.teach_user.nick_name"
            :studied="detail.user_speed_count"
            :isBuy="detail.user_speed_buy_status"
            :isAddClass="detail.studen_join_classs"
            :isStudied="detail.end_speed_time"
            :percentage="$tianKenPercentage(detail.user_speed_time_protion)"
            :startTime="detail.effective_duration_start"
            :endTime="detail.effective_duration_end"
          )
        .tabs.cbox
          .conatiner.c_f_bg 
            .nav
              .ls.c_e0_bd 
                .item.ib.active_border(
                  v-for="item,index in courseNav"
                  :key="item.name"
                  @click ="go(item)"
                  :class="{active: currActive.indexOf(index) > 0}"
                ) {{item.name}}
            .router(v-if="detail")                 
              router-view
    .dialog 
      el-dialog(
        title="加入班级"
        :visible.sync="isCourseDialogShow"
        width="40%"
        top="4%"
      )
        DialogAddCourse(
          @success="addClazzBackHandler"
        )
</template>

<style lang="stylus">
.page-course-base
  >.tabs
    padding-bottom 70px
    padding-top 20px
    >.conatiner
      >.nav
        >.ls
          border-bottom 1px solid #e0e0e0
          box-sizing border-box
          height 57px
          >.item
            text-align center
            line-height 55px
            margin 0 25px
            padding 0 5px
            cursor pointer
            box-sizing border-box
      >.router
        min-height 300px
</style>
