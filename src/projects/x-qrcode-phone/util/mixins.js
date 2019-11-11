import Schema from 'validate'
import { setTimeout } from 'timers'
import { thirdLogin } from 'services/common/member'
import { codeImage, codePhone } from 'services/common/user'

const phoneInfo = new Schema({
  phone: {
    required: true,
    length: 11,
    message: {
      required: '请输入手机号',
      length: '手机号码长度应为11位'
    }
  }
})

const main = {
  data () {
    return {
      list: [],
      info: {},
      qrcode_id: this.$route.query.qrcode_id,
      page: {

      }
    }
  },
  async created () {
    if (this.$route.query.token_id) {
      window.sessionStorage.setItem('token', this.$route.query.token_id)
    }
    if (!window.sessionStorage.getItem('token')) {
      // await thirdLogin({
      // 	type:'qq_web',
      // 	back_url:location.href,
      // 	}).then(res=>{
      // 		location.href = res.data.login_link
      // })
      alert(123456)
      this.$router.push({ path: '/login' })
      return
    }
    this.getList()
  },
  methods: {
    loadList (func) {
      if (!func) {
        return
      }
      setTimeout(() => {
        this.list = [...this.list, { txt: 'xxxxx' }]
        this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad')
      }, 1000)
    },
    go (name, params) {
      this.$router.push({ name, params })
    },
	  to (path, query) {
      this.$router.push({ path, query })
    },
    outLink (href) {
      location.href = href
    },
    pay () {
      console.log('购买暂无实现')
    },
    fetch () {
      return JSON.parse(window.localStorage.getItem('params') || '[]')
    },
    save (items) {
      window.localStorage.setItem('params', JSON.stringify(items))
    }
  },
  computed: {
    unescapeHTML () {
      return function (str) {
        str = '' + str
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
      }
    }
  },
  watch: {
    params: {
      handler: function (items) {
				 console.log(11111, items)
			 this.save(items)
      },
      deep: true
    }
  }
}

const code = {
  data () {
    return {
      img_code: {
        code_id: null,
        code_img: null
      },
      img_code_val: null, // 图像验证码内容
      code_tip: '发送验证码', // 发送验证码按钮文字
      duration: 60, // 倒计时的长度
      timer: null // 发送验证码后的倒计时
    }
  },
  methods: {
    getImgCode () {
      codeImage().then(res => {
        this.img_code = res.data
      })
    },
    validatePhone () {
      const errors = phoneInfo.validate({ phone: this.info.phone })

      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString()
        })
        return false
      }
      return true
    },
    setTimer () {
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
    sendCheckCode () {
      console.log(1234)
      if (this.img_code_val === null) {
        this.$dialog.toast({
          mes: '请输入图片验证码',
          timeout: 1000
        })
        return
      }
      if (this.validatePhone() && !this.timer) {
        codePhone({
          phone: this.info.phone,
          code_id_img: this.img_code.code_id,
          code_val_img: this.img_code_val,
          not_check_user_exist: 1
        }).then(res => {
          this.$dialog.toast({
            mes: res.message || '发送成功',
            icon: 'success',
            timeout: 1500
          })
          this.info.code_id = res.data.code_id
          console.log(this.info)
          this.setTimer()
        }).catch(e => {
          this.$dialog.toast({
            icon: 'error',
            timeout: 1500,
            mes: '发送失败'
          })
        })
      }
    }
  }
}

/**
 * 报名应用
 */
const apply = {
  data(){
    return {
      name:'',
      phone: ''
    }
  },
  methods:{
    async submit(){
      if(this.is_sign_up){
        this.$dialog.toast({
          mes: '你已经报过了'
        })
        return;
      }
      console.log(this.data)
      let sendData = {
        name: this.name,
        phone: this.phone,
        id: this.user_id,
        qrcode_product_id: this.$route.query.qrcode_product_id
      }
      const check = await validatePhone.call(this,this.phone)
      if(!check){
        return
      }
      this.service.apply(sendData).then(res => {
        this.$dialog.toast({
          mes: res.message || '发送成功',
          icon: 'success',
          timeout: 1500
        })
      }).catch(e => {
        this.$dialog.toast({
          mes: '报名失败',
          icon: 'error',
          timeout: 1500
        })
      })
    }
  }
}
export { main, code ,apply}

async function validatePhone (phone) {
  const errors = await phoneInfo.validate({ phone: phone})
  if (errors.length > 0) {
    this.$dialog.toast({
      mes: errors[0].toString()
    })
    return false
  }
  return true
}