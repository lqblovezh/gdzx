<script>
import Resource from '@/components/common/Resource'
import { detail, save, delQus } from 'services/x-qrcode/vote/questionnaire'
import { getUseList } from 'services/x-qrcode/dissertation'
export default {
  props: ['type', 'id', 'detailDialog', 'readOnly', 'defaultData'],
  components: {
    Resource,
  },
  data() {
    return {
      res: [],
      i: 0,
      delIds: [],
      resource_info: [],
      useProduct: [],
      resourceDialog: false, //添加资源弹框
      detailData: {},
      newDate: {
        name: '',
        questions: [
          {
            question: '',
            type: 'single',
            must: false,
            resource_id: [],
            resource_info: [],
            option: {
              1: '',
            },
          },
        ],
      },
    }
  },
  mounted() {
    if (this.id) {
      detail({ id: this.id }).then(res => {
        this.detailData = res.data
        this.detailData.questions.forEach(el => {
          el.must = el.must === 'false' ? false : true
        })
      })
    } else {
      this.detailData = this.newDate
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == 'qrcode') {
        getUseList({ special_id: this.id }).then(res => {
          console.log(res)
          this.useProduct = res.data
        })
      }
    },
    setType(item, e) {
      item.type = e ? 'multi' : 'single'
    },
    isMust(item, e) {
      item.must = e
    },
    delQues(i, id) {
      this.detailData.questions.splice(i, 1)
      if (!this.delIds.includes(id)) {
        this.delIds.push(id)
      }
    },
    delRes(i, item) {
      item.resource_id.splice(i, 1)
      item.resource_info.splice(i, 1)
      log(item.resource_id)
    },
    delAnswer(i, item) {
      this.$delete(item.option, i)
    },
    addRes(i) {
      this.i = i
      this.resourceDialog = true
    },
    addAnswer(options) {
      console.log(options)
      this.$set(options, Object.keys(options).length + 1, '')
    },
    newArr(arr, key) {
      return arr.map(res => {
        return res[key]
      })
    },
    addSelect(data, arr) {
      let info = this.detailData.questions[this.i]
      info.resource_info = info.resource_info || []
      info.resource_info = this.array_del_repeat(
        info.resource_info.concat(arr),
        'id'
      )
      info.resource_id = this.newArr(info.resource_info, 'id')
      this.resourceDialog = false
    },
    //根据某个键去重数组对象
    array_del_repeat(arr, key) {
      let obj = {}
      arr = arr.reduce((item, next) => {
        obj[next[key]] ? '' : (obj[next[key]] = true && item.push(next))
        return item
      }, [])
      return arr
    },
    async submitInfo() {
      if (this.delIds.length) {
        await delQus({ id: this.delIds })
      }
      save(this.detailData)
        .then(res => {
          if (res.status) {
            this.$emit('close')
          }
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    add() {
      this.detailData.questions.push({
        question: '',
        type: 'single',
        must: false,
        resource_id: [],
        resource_info: [],
        option: {
          1: '',
        },
      })
    },
  },
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type" @tab-click="handleClick")
		Resource(
			v-if="resourceDialog"
			:resourceDialog.sync="resourceDialog"
			:curSoucesList="[]"
			@select="addSelect"
			:isShowType="true"
			)
	el-tabs( :value="type||'info'" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						.group
							.label *问卷名称:
							input.form-control( v-model="detailData.name"  type="text" maxlength="20" :disabled="readOnly")
						ul.question
							li.top(v-for="(item,i) in detailData.questions")
								.first
									.title 第{{i+1}}题:
									.answer 
										el-input(v-model="item.question" size="small")
									el-checkbox(v-model="item.must") 非必填 
									el-checkbox(@change="setType(item,$event)" :value="item.type=='multi'?true:false") 复选题
									Icon.delete(type="icon-delete" title="删除" @click="delQues(i,item.id)")
								.second
									.title
									//- .title 
										.name 资源名称
										.res 
											p(v-for="(vo,i) in item.resource_info") 
												span {{vo.name || '未选择资源'}}
												Icon.delete(type="icon-delete" @click="delRes(i,item)" title="删除" v-if="vo.name")
											el-button(type="primary" plain size="mini" @click="addRes(i)") 添加资源
									.answer
										ul
											li(v-for="(vo,i) in item.option")
												span 答案{{i}}:
												el-input.w(v-model="item.option[i]")
												Icon.delete(type="icon-delete" @click="delAnswer(i,item)" title="删除")
										el-button(type="primary" plain size="mini" @click="addAnswer(item.option)") 新增答案
				.btn
					el-button(type="primary" @click="add()" plain size="mini") 新增
				.btns
					el-button(type="info" size="small" @click="$emit('update:detailDialog',false)") 取消
					el-button(@click="submitInfo('detailForm')" size="small" type="primary") 确定
		//- 二维码产品
		el-tab-pane( label="二维码产品" name="qrcode")
			table.table
				thead
					tr
						th 产品名称
						th 产品简介
						th 创建时间
				tbody
					tr(v-if="!useProduct.length") 
						td.noMsg(colspan="3" align="center") 暂无相关数据
					tr(v-for="item in useProduct")
						td
							img.cover-photo(:src="item.img_src")
							.th-name.bookName()
						td {{item.name}}
						td {{item.abs}}
						td {{item.create_time}}
</template>

<style lang="stylus" scoped>
.question
  margin-left 30px
  .top
    margin-top 15px
  .second
    .title, .el-button
      display inline-block
      margin 10px
      font-size 14px
    .title
      display flex
      .res
        margin-left 20px
        line-height 20px
    .el-button
      margin 15px 15px 0 15px
    .answer
      padding-left 30px
      font-size 14px
      line-height 20px
      ul>li
        display flex
        .w
          width 300px
      span
        padding 10px
  .first
    .title, .answer
      display inline-block
      padding 0 10px
    .title
      font-size 16px
      font-weight bold
.form-control
  max-width 50px
.btns
  text-align right
  margin-top 20px
.img
  max-width 250px
  max-height 200px
.btn
  text-align left
  margin-top 15px
.delete
  margin-left 10px
</style>
