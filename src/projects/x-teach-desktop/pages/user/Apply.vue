<script>
import validate from '@/pages/account/mixins'
import {getTask} from 'services/common'
import { mapState } from 'vuex'

export default {
  mixins: [validate],
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  data() {
    return {
      detail: {
        img: "https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg",
        sex: '1',
      },
      isEdit: false,
      previewImgUrl: null,
      info:{},
      valiData:{
        nick_name: {
          display: '姓名不能为空',
          rules: 'min_length(1)',
          cname: '* 姓名',
          type: 'text',
          value: '',
          isError: false,
        },
        education: {
          display: '学历不能为空',
          rules: 'min_length(1)',
          cname: '* 学历',
          type: 'text',
          value: '',
          isError: false,
        },
        email: {
          display: '邮箱格式错误',
          rules: 'is_email',
          cname: '* 邮箱',
          type: 'Url',
          value: '',
          isError: false,
        },
        company: {
          display: '单位不能为空',
          rules: 'min_length(1)',
          cname: '* 单位',
          type: 'text',
          value: '',
          isError: false,
        },
        duties: {
          display: '职务不能为空',
          rules: 'min_length(1)',
          cname: '* 职务',
          type: 'text',
          value: '',
          isError: false,
        },
      }
    }
  },
  created () {
    this.info = {...this.user}
    for(let item in this.valiData){
      this.valiData[item].value = this.info[item]
    }
  },
  methods: {
    save() {
      this.isPass()
        .then(async (res) => {
          let file = this.$refs.file.files[0]
          if (file) {
            await getTask(file).then(res => {
              this.info.picture = res.data.path
            })
          }
          await this.$service.user.apply({
            company:res.company,
            duties:res.duties,
            education:res.education,
            email:res.email,
            nick_name:res.nick_name,
            picture:this.info.picture,
            summary:this.info.summary,
            sex:this.info.sex
          }).then(res => {
            this.$message.success('申请成功等待后台审核!')
          }).catch(err => {
            this.$message.error(err.payload.message)
          })
        })
        .catch(({payload}) => {
        })
    },
    previewImg(e) {
      var node = e.target;
      var file = node.files[0];
      this.imgFile = file;
      this.info.size = file.size;
      this.info.format = file.name.substr(
        file.name.lastIndexOf(".") + 1
      );
      this.previewImgUrl = URL.createObjectURL(file);
    }
  },
  watch: {
    user(data) {
      this.info = data
      for(let item in this.valiData){
        this.valiData[item].value = this.info[item]
      }
    }
  }
}
</script>

<template lang="pug">
div
  NormalWrap
    .page-user-apply.c_f5_bg.cbox
      .container.c_f_bg(v-if="user")
        .top.tc
          .img
            img(:src="previewImgUrl||info.picture_absolute", alt="alt")
            input.hide(type="file" ref="file" @change="previewImg" accept="image/jpeg,image/jpg,image/png")
            el-button(@click="$refs.file.click()" type="primary" size="mini") 选择
        .box.c_6.f14
          .item
            label.ib 性别 ：
            el-radio-group(v-model="info.sex")
              el-radio(label="男") 男
              el-radio(label="女") 女
              el-radio(label="保密") 保密
          LoginInput(
            :ref="`inp_${key}`"
            v-for="item,key in valiData"
            :key="key"
            :name="key"
            :data="item"
          )
          .item
            label.ib.vt 简介 ：
            .ib
              el-input(type="textarea" v-model="info.summary")
          .btn.tc.f14
            Tbutton( @click.native="save" type="og") 完成
</template>

<style lang="stylus">
.page-user-apply
  min-height 200px
  padding-top 20px
  padding-bottom 65px
  .container
    >.top
      text-align center
      padding-top 30px
      >.img
        position relative
        width 158px
        margin 0 auto
        >button
          margin-top 15px
        >img
          width 158px
          height @width
          border-radius 50%
          cursor pointer
          object-fit cover
    >.box
      width 500px
      margin 40px auto
      margin-bottom 0
      >div.item
        margin-bottom 25px
        line-height 40px
        .el-textarea
          width 280px
          textarea
            background #f8f8f8
            height 160px
            resize none
        &:nth-of-type(4n)
          margin-bottom 0
        >label
          padding-left 20px
          width 80px
          text-align right
          margin-right 15px
      >.btn
        padding 38px 0
        >.comp-btn
          width 100px
          height 32px
          line-height 26px
          >.wrap
            .vm
              font-size 14px
</style>
