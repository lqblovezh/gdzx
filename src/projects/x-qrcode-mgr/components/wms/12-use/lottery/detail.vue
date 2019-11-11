<script>
import Resource from '@/components/common/Resource'
import {getUseList} from "services/x-qrcode/dissertation"
import {
	main
} from '@/util/dyTool'
import * as service from 'services/x-qrcode/vote/lottery'
export default {
	props: ['type', 'id', 'detailDialog', 'readOnly', 'defaultData'],
	components:{Resource},
	mixins: [main],
	data(){
		return{
			service,
			options:[],
			award_record:[],
			useProduct:[],
			selectValue:{},
			rules:{
				name:{ required: true, message: '请输入活动名称', trigger: 'blur' },
			}
		}
	},
	mounted(){
		service.awardList().then(res=>{
			this.options = res.data
		})
		if(this.id){
			this.detail(this.id)
		}else{
			this.detailData = {
				name:'',
				//img:"",
				abs:'',
				//img_src:'',
				lottery_info:{
					type:'',
					content:[{award_id:'',award_name:"",chance:""}]
				}
			}
		}
	},
	methods:{
		handleClick(tab, event) {
			if(tab.name=="log" && !this.award_record.length){
				service.awardRecord({id:this.id}).then(res=>{
					this.award_record = res.data
				})
			}
			if (tab.name == 'qrcode') {
				getUseList({special_id:this.id}).then(res=>{
					console.log(res)
					this.useProduct = res.data
				})
			}
		},
		submitInfo() {
			service.save(this.detailData).then(res=>{
				this.$emit('close')
			})
		},
		add(){
			if(this.detailData.lottery_info.content.length>=8){
				this.$message.warning('奖品不能超过8个！！')
				return
			} 
			this.detailData.lottery_info.content.push({award_name:"",chance:""})
		},
		getselectOption(value,item){
			for(let key in this.options){
				console.log(this.options[key])
				if(this.options[key].name == value){
					this.$set(item,'award_id',this.options[key].id)
					return
				}
			}
		},
		delLottery(i){
			this.detailData.lottery_info.content.splice(i,1)
		},
		addPrice(){
			if(this.options[this.options.length-1]['name'] && this.options[this.options.length-1]['price']){
					this.options.push({
					name:"",
					price:''
				})
			}else{
				this.$message.warning('你还有奖品未填写完整！！')
			}	
		},
		addPriceSend(item){
			if(item.name && item.price){
				service.saveAward(item)
			}
		},
		delAward(item,i){
			service.delAward({id:[item.id]}).then(res=>{
				this.options.splice(i,1)
			},err=>{
				this.$message.error('删除失败')
			})	
		}
	},
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type||'info'" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			el-form.form(:rules="rules" ref="ruleForm" label-width="60px")
				el-form-item(label="名称")
					el-input.w(v-model="detailData.name" prop="name")
				el-form-item(label="简介")
					el-input.w(v-model="detailData.abs" prop="abs")
				el-form-item(label="形式" v-if="detailData.lottery_info")
					el-select(v-model="detailData.lottery_info.type" placeholder="请选择")
						el-option(label="大转盘" value="dial")
						el-option(label="刮刮卡" value="scratch_card") 
				el-form-item(label="奖品" v-if="detailData.lottery_info")
					ul 
						li(v-for="(item,i) in detailData.lottery_info.content" :key='item.id')
							//- .name {{item.award_name}}
							el-select.select(v-model="item.award_name" placeholder="请选择" @change="getselectOption($event,item)")
								el-option(v-for="(vo,index) in options" :value-key='index' :label="vo.name" :value="vo.name" :key='vo.name')
							.name
								el-input.gl(v-model="item.chance")
									template(slot="append") %
							el-button(type="danger" size="mini" @click="delLottery(i)") 删除
					el-button(type="primary" size="mini" @click="add") 新增
					i.info(class="el-icon-info") 奖品种类为8个 奖品概率之和为100%
		//- 奖品设置
		el-tab-pane( label="使用中产品" name="qrcode")
			table.table
				thead
					tr
						th 二维码
						th 产品名称
						th 产品简介
						th 创建时间
				tbody
					tr(v-if="!useProduct.length") 
						td.noMsg(colspan="4" align="center") 暂无相关数据
					tr(v-for="item in useProduct")
						td
							img.cover-photo(:src="item.img_src")
							.th-name.bookName()
						td {{item.name}}
						td {{item.abs}}
						td {{item.create_time}}
		el-tab-pane( label="奖品记录" name="log" v-if="id")
			table.table
				thead
					tr
						th 昵称
						th 时间
						th 电话
						th 二维码产品
						th 奖品
				tbody
					tr(v-if="!award_record.length") 
						td.noMsg(colspan="5" align="center") 暂无相关数据
					tr(v-for="item in award_record")
						td {{item.user_name}}
						td {{item.update_time}}
						td {{item.phone}}
						td {{item.product_name}}
						td {{item.lottery_name}}
		el-tab-pane( label="奖池" name="setting")
			.priceSetting
				.item(v-for="(item,i) in options")
					el-input.name(v-model="item.name" size ='small' @blur="addPriceSend(item)")
					el-input(v-model="item.price" size ='small' @blur="addPriceSend(item)" style="width:130px")
					el-button(type="danger" size ='small' @click="delAward(item,i)") 删除
			el-button(type="primary" size="mini" @click="addPrice") 新增
	.btns(v-if="!readOnly")
		el-button(type="info" size="small" @click="$emit('update:detailDialog',false)") 取消
		el-button(@click="submitInfo" size="small" type="primary") 确定
</template>

<style lang="stylus" scoped>
.btns 
	display flex
	justify-content flex-end
.w 
	max-width 300px
.title 
	border-bottom 1px solid #e8e8e8
	line-height 40px
	margin-bottom 20px
.group
	display flex
.select
	width 180px
ul 
	display flex
	flex-wrap wrap
	li 
		margin 0 10px 0 0
.gl 
	width 140px
.info 
	color #44c3aa
.priceSetting
	display flex
	flex-wrap wrap
	.item
		display flex
		margin 10px
		padding 10px
		flex-wrap wrap
		align-items center
		border 1px dashed #e8e8e8
		height 100px
		width 200px
</style>
