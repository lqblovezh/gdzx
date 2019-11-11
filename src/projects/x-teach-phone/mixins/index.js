import Schema from 'validate'
import { getCurResource } from '../utils/algorithm'
import { getRelatedRescourse } from '../utils/course'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import localforage from 'localforage'
const phoneInfo = new Schema({
  phone: {
    required: true,
    length: 11,
    message: {
      required: '请输入手机号',
      length: '手机号码长度应为11位',
    },
  },
})
const code = {
  data() {
    return {
      img_code: {
        code_id: null,
        code_img: null,
      },
      img_code_val: null, // 图像验证码内容
      code_tip: '发送验证码', // 发送验证码按钮文字
      duration: 60, // 倒计时的长度
      timer: null, // 发送验证码后的倒计时
    }
  },
  methods: {
    getImgCode() {
      this.$service.user.codeImage().then(res => {
        this.img_code = res.data
      })
    },
    validatePhone() {
      const errors = phoneInfo.validate({ phone: this.info.phone })

      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString().replace('Error: ', ''),
        })
        return false
      }
      return true
    },
    setTimer() {
      if (this.timer !== null) {
        return
      }
      let i = this.duration
      const cutDown = () => {
        this.code_tip = `${i}秒后再试`
        if (i-- > 0) {
          this.timer = setTimeout(cutDown, 1000)
        } else {
          this.code_tip = '发送验证码'
          this.timer = null
        }
      }
      cutDown()
    },
    sendCheckCode() {
      if (this.img_code_val === null) {
        this.$Toast({
          message: '请输入图片验证码',
        })
        return
      }
      if (this.validatePhone() && !this.timer) {
        this.$service.user
          .codePhone({
            phone: this.info.phone,
            code_id_img: this.img_code.code_id,
            code_val_img: this.img_code_val,
            not_check_user_exist: 1,
          })
          .then(res => {
            this.$Toast({
              iconClass: 'icon-toast icon-success',
              message: '发送成功',
            })
            this.$set(this.info, 'code_id', res.data.code_id)
            this.setTimer()
          })
          .catch(({ payload }) => {
            this.$Toast({
              iconClass: 'icon-toast icon-failed',
              message: payload.message || '发送失败',
            })
          })
      }
    },
  },
}

const user = {
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    ...mapMutations('common', ['setLoginLayer']),
    checkIsLogin() {
      if (!this.userInfo) {
        this.setLoginLayer(true)
        return false
      }
      return true
    },
  },
}

const inputArea = {
  data() {
    return {
      isShowTextField: false,
      commentList: [],
      word: '',
      myReply: null,
    }
  },
  methods: {
    showTextField() {
      this.$refs.layer.show()
      this.$nextTick(() => {
        this.$refs.myInput.focus()
      })
    },
    hideTextField(evt) {
      // let isTrue = typeof evt === 'symbol' || (evt.target.classList.contains('layer') || evt.target.classList.contains('icon-close'))
      // if (isTrue) {
      //   this.isShowTextField = false
      //   this.initState()
      // }
      this.isShowTextField = false
      this.initState()
    },
    initState() {
      this.word = ''
      this.myph = '发表评论'
      this.myReply = null
    },
  },
}

/**
 * 处理字符串，多于maxLength就显示省略号
 */
const charEll = {
  data() {
    return {
      maxLength: 46,
    }
  },
  methods: {
    maxSlice(v) {
      return typeof v === 'string' && v.length > this.maxLength
        ? v.slice(0, this.maxLength) + '...'
        : v
    },
  },
}

/**
 * 继续学习
 */
const continueStudy = {
  computed: {
    ...mapState('course', {
      courseInfo: state => state.courseInfo,
    }),
    ...mapGetters('course', ['cItem']),
  },
  methods: {
    ...mapMutations('course', ['SET_RESOURCE']),
    continueStudy() {
      const resource = this.getCurrent()
      if (!resource) {
        return
      }
      const { data } = resource
      this.SET_RESOURCE(data)
      let name
      switch (data.type) {
        case 1:
          this.goReader(resource)
          break
        case 3:
          this.goPlayer('pic', resource)
          break
        case 4:
          this.goPlayer('audio', resource)
          break
        case 5:
          this.goPlayer('video', resource)
          break
      }
    },
    goPlayer(path, item) {
      const { ids } = item
      this.$goByName(path, {
        query: {
          ...ids,
        },
      })
    },
    goReader(path, item) {
      const { ids, data } = item
      localforage.setItem('access_code', data.access_code).then(() => {
        this.$goByName('reader', {
          query: {
            book_id: data.b_id,
            product_id: this.courseInfo.publish_id,
            ...ids,
          },
        })
      })
    },
    getCurrent() {
      let current = null
      if (!this.courseInfo.end_speed_info) {
        current = this.cItem[0]
      } else {
        current = getCurResource(
          JSON.parse(JSON.stringify(this.courseInfo)),
          this.courseInfo.end_speed_info.course_teaching_plan_id
        )
      }
      return current
    },
  },
}

const releateToResource = {
  computed: {
    ...mapState('course', ['courseInfo']),
  },
  methods: {
    ...mapMutations('course', ['SET_RESOURCE']),
    viewResource(item) {
      const result = getRelatedRescourse(
        JSON.parse(JSON.stringify(this.courseInfo)),
        item.b_id
      )
      result.data && this.SET_RESOURCE(result.data)
      switch (result.data.type) {
        case 1:
          this.goReader(result)
          break
        case 3:
          this.goPlayer('pic', result)
          break
        case 4:
          this.goPlayer('audio', result)
          break
        case 5:
          this.goPlayer('video', result)
          break
      }
    },
    goPlayer(path, item) {
      const { ids } = item
      this.$goByName(path, {
        query: {
          ...ids,
        },
      })
    },
    goReader(item) {
      const { ids, data } = item
      localforage.setItem('access_code', data.access_code).then(() => {
        this.$goByName('reader', {
          query: {
            book_id: data.b_id,
            product_id: this.courseInfo.publish_id,
            ...ids,
          },
        })
      })
    },
  },
}

const CourseInfo = {
  computed: {
    ...mapState('course', ['courseInfo']),
  },
  beforeMount() {
    if (!this.courseInfo && this.$route.query.cid) {
      this.SET_COURSE_INFO(this.$route.query.cid)
    } else {
      // this.$router.go(-1)
    }
  },
  methods: {
    ...mapActions('course', ['SET_COURSE_INFO']),
  },
}

module.exports = {
  code,
  user,
  inputArea,
  charEll,
  continueStudy,
  releateToResource,
  CourseInfo,
}
