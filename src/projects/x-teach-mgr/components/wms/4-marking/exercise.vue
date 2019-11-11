<script>
import formSerialize from 'form-serialize'
import { main } from '@/util/mixins'
import * as services from 'services/x-teach/marking'

export default {
  mixins: [main],
  props: [],
  data() {
    return {
      exerciseList: [],
      total: 50,
      pageSize: 5,
      newArr: [],
      currentStatus: null,
      currentType: null,
      details: {},
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.back()
      return
    }
    // log(this.newArr)
    services.detail({ id: this.$route.query.id }).then(res => {
      this.exerciseList = res.data || []
      this.newArr = this.getArray()
      this.total = this.exerciseList.length
    })
  },
  methods: {
    numberToLetter(n) {
      let unit = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ]
      return unit[n]
    },
    getAnswer(item) {
      if (item.type == 'judgment') {
        if (item.answer && item.answer !== 'false') {
          return '正确'
        }
        return '错误'
      } else if (item.type == 'multi') {
        return item.answer.replace(/,/g, '')
      }
      return item.answer
    },
    getArray({ p = 1, type, status } = {}) {
      let oldArr = [...this.exerciseList]
      // log(type, status)
      if (type) {
        oldArr = oldArr.filter(item => item.type == type)
      }
      if (status) {
        oldArr = oldArr.filter(item => {
          if (status == 'yes') {
            return item.account
          } else {
            return !item.account
          }
        })
      }
      this.total = oldArr.length
      return oldArr.splice((p - 1) * this.pageSize, this.pageSize)
    },
    getScore(score) {
      // 获取分数区间
      let arrary = []
      for (let i = 0; i <= score; i++) {
        arrary.push(i)
      }
      return arrary
    },
    getUserAnswer(index, item) {
      // 用户答案是否选中
      let answer = this.numberToLetter(index)
      let data = item.user_answer ? item.user_answer.includes(answer) : false
      return data
    },
    handleCurrentChange(p) {
      this.newArr = this.getArray({
        p,
        type: this.currentType,
        status: this.currentStatus,
      })
    },
    tabChange({ type, status } = {}) {
      this.currentType = type || null
      this.currentStatus = status || null
      this.newArr = this.getArray({ type, status })
    },
    save() {
      this.exerciseList.forEach(item => {
        item.reply = item.teach_answer
      })
      services
        .save({
          exerciseList: this.exerciseList,
          id: this.$route.query.id,
          ...this.details,
        })
        .then(
          res => {
            this.$message.success('发布成功')
            this.$router.back()
          },
          err => {
            this.$message.err(err.message)
          }
        )
    },
  },
  computed: {
    totalScore() {
      let score = 0
      this.exerciseList.forEach(item => {
        score += parseInt(item.score)
      })
      return score
    },
    score() {
      let score = 0
      this.exerciseList.forEach(item => {
        score += parseInt(item.account)
      })
      return score
    },
  },
  filters: {
    numberToChinese(n) {
      // 判断里面是否有字母或别的
      if (!/^\d*$/.test(n)) {
        return 'Null'
      }
      if (typeof n == 'number') {
        n = n.toString()
      }
      const reg = new RegExp('([0]*)([1-9]+[0-9]+)', 'g')
      n = n.replace(reg, '$2') // console.log(n)
      let unit = '千百十亿千百十万千百十个'
      if (n.length > unit.length) {
        return 'Null'
      }
      let newStr = ''
      const nlength = n.length
      unit = unit.substr(unit.length - nlength)
      for (let i = 0; i < nlength; i++) {
        newStr += '零一二三四五六七八九'.charAt(n[i]) + unit.charAt(i)
      }
      newStr = newStr.substr(0, newStr.length - 1) // $1:捕捉第一个匹配的结果
      newStr = newStr
        .replace(/零(千|百|十)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(亿|万)/g, '$1')
      for (var i = newStr.length - 1; i > 0; i--) {
        if (newStr[i] == '零') {
          newStr = newStr.replace(newStr[i], '')
        } else {
          break
        }
      }
      return newStr
    },
  },
}
</script>

<template lang="pug">
.exe
  .tab-nav
    el-button(type="primary" @click="$router.back()") 返回
  .left
    .tab
      el-button(@click="tabChange()" size="mini") 全部
      el-button(@click="tabChange({type:'subjective_item'})" :class="{'active':currentType=='subjective_item'}" size="mini") 主观题
      el-button(@click="tabChange({status:'yes'})" :class="{'active':currentStatus == 'yes'}" size="mini") 已评分
      el-button(@click="tabChange({status:'no'})" :class="{'active':currentStatus == 'no'}" size="mini") 未评分
    .content
      ul.exerciseInfo
        li(v-for="item,index in newArr")
          div.top
            span.title 第{{index+1|numberToChinese}}题
            span.score {{item.score}}分
            span.name {{item.type_name}}
            span.answer(v-if="item.type!='subjective_item'") 正确答案：{{getAnswer(item)}}
            span.answer(v-else) 评分：
              el-select(v-model="item.account" placeholder="分数" size="small")
                el-option(
                  v-for="item in getScore(item.score)"
                  :key="item"
                  :label="item"
                  :value="item"
                )
            span.isRight(v-if="item.type!='subjective_item'") 
              span.correct(v-if="item.account==item.score") √
              span.error(v-else) ×
          .left
            div.exercise
              .title 题目：
              p.titleText(v-html="item.question")
              ul.options(v-if="item.type=='single'||item.type=='multi'")
                li(v-for="items,indexs in item.option")
                  span {{numberToLetter(indexs)}}
                  el-checkbox(:checked="getUserAnswer(indexs,item)" v-if="item.type=='multi'" disabled)
                  el-radio(v-model="item.user_answer" :label="numberToLetter(indexs)" v-else disabled) {{numberToLetter(indexs)}}
                  p.subject(v-html="items.title")
            div.answer(v-if="item.type=='subjective_item'")
              .title 用户答案： {{item.user_answer}}
              el-input(type="textarea" placeholder="教师回复：" v-model="item.teach_answer")
          .right
            img(:src="item.img")
      .pageWrap()
        el-pagination(
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
        ) 
  .right 
    div.group  总分：{{totalScore}}
    div.group  得分：{{score}}
    div.group.margin
      .label 评价留言：
      el-input(type="textarea" v-model="details.text")
    div.group 
      el-button(type="primary" @click="save") 发布
    div.group
      el-checkbox(v-model="details.label") 要求重做

</template>


<style lang="stylus" scoped>
.pageWrap
  text-align center
.exe
  >>> textarea
    resize none
  padding 20px
  .tab-nav
    padding-bottom 20px
  >.left
    display inline-block
    width calc(100% - 320px)
    background #fff
    padding 20px
    box-sizing border-box
    .tab
      margin-bottom 20px
      .active
        background #69cfbb
        border-color #69cfbb
        color #fff
  >.right
    width 300px
    display inline-block
    min-height 500px
    margin-left 20px
    background #fff
    padding 20px
    box-sizing border-box
    text-align center
    .group
      &:last-child
        line-height initial
      &.margin
        margin 150px 0
        >>>textarea
          height 150px
      margin-top 20px
      .label
        display block
        text-align left
        padding 5px 0
        color #333
.el-icon-sort-up, .el-icon-sort-down
  color #44c3aa
.total-score
  position absolute
  left 0
  right 0
  text-align center
  z-index 0
  color #44c3aa
  span
    color #606266
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.exerciseList
  display inline-block
  label
    line-height inherit
  li
    .option
      width 20px
      text-align center
      display inline-block
    >span
      margin-right 20px
.exerciseInfo
  >li
    padding 10px
    background #ededed
    position relative
    margin-bottom 20px
    color #4a4a4a
    .top
      padding-bottom 5px
      >span
        margin-right 20px
        &.isRight
          float right
          font-size 20px
          font-weight bold
          .correct
            color #1AFA29
          .error
            color #D81E06
    .left
      width 50%
      display inline-block
      >>> img
        max-width 250px
        max-height 250px
        margin-top 10px
    .right
      width 50%
      display inline-block
      img
        max-width 250px
        max-height 250px
    .exercise
      padding-left 50px
      width 100%
      display inline-block
      .titleText
        >>> *
          background-color unset !important
      .title
        margin 10px 0
        line-height 24px
      .options
        // padding-left 40px
        margin-top 10px
        .subject
          display inline-block
          >>> *
            background-color unset !important
        >>> .el-radio__input, >>> .el-checkbox__inner
          margin-right 5px
        >>> .el-radio__label
          display none
          line-height 38
        li
          margin-bottom 10px
          span
            margin-right 20px
    .answer
      padding-left 50px
      position relative
      >>> .el-select
        position absolute
        top -13px
        width 80px
      >div
        padding 5px 0
</style>
