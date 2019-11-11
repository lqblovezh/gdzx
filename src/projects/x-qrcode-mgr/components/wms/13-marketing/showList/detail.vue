<script>
import * as services from 'services/x-qrcode/marketing'
import { awardList } from 'services/x-qrcode/vote/lottery'
import Using from '../../2-dissertation/setting/using'

export default {
  props: ['type', 'detailVisible', 'readOnly', 'detailData', 'por_type'],
  data() {
    return {
      services,
      types: [], //晒单奖品
      infoDate: {},
      record: [],
    }
  },
  created() {
    this.infoDate = { ...this.detailData }
    this.getTypes()
    this.getRecord()
  },
  components: {
    Using,
  },
  methods: {
    getTypes() {
      awardList().then(res => {
        this.types = res.data
      })
    },
    getRecord() {
      if (this.detailData && this.detailData.id) {
        services
          .getRecord({
            id: this.detailData.id,
          })
          .then(res => {
            this.record = res.data
          })
      }
    },
    submitInfo() {
      services
        .save({
          type: this.por_type,
          ...this.infoDate,
        })
        .then(res => {
          this.$emit('saveok')
        })
    },
  },
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required' }" type="text" v-model="infoDate.name")
						.group
							.label *简介:
							input.form-control( v-va="{ type:'required' }" type="text" v-model="infoDate.abs")
						.group
							.label *晒单奖品:
							el-select(v-model="infoDate.award_id" )
								el-option(v-for="item in types"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								)
				.btns(v-if="!readOnly")
					el-button(type="info" @click="$emit('update:detailVisible',false)") 取消
					el-button(@click="submitInfo('detailForm')" type="primary") 确定
		//- 获取记录
		el-tab-pane( label="获取记录" name="record")
			table.table
				thead
					tr
						th 昵称
						th 时间
						th 电话
						th 二维码产品
						th 奖品
				tbody
					tr(v-for="item in record")
						td {{item.user_name}}
						td {{item.create_time}}
						td {{item.phone}}
						td {{item.product_name}}
						td {{item.award_name}}
		el-tab-pane(label="使用中产品" name="using" v-if="detailData.id")
			Using(
				:detailData="detailData"
				:services="services"
				:readOnly="readOnly"
			)
</template>


<style lang="stylus" scoped>
.table
  margin-bottom 20px
.using
  .name
    line-height 30px
    font-size 16px
    color #333
    border-bottom 2px solid #dcdcdc
.btns
  float right
  margin-top 20px
.img
  max-width 250px
  max-height 200px
.abs
  width 300px
  min-height 100px
  .name
    width 100%
    display inline-block
    font-size 16px
    color #333
</style>
