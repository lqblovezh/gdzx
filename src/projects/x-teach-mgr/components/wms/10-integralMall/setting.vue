<script>
import {
	getRule,
	save
} from "services/x-teach/intearal/index"
export default {
	data(){
		return{
      tableData:{}
    }
  },
  created(){
    getRule().then(res=>{
      this.tableData = res.data
    })
	},
	methods:{
		send(item){
			save(item)
		},
		changeState(item){
			item.state = item.state=='true'?'false':'true'
			save(item)
		}
	}
}
</script>
<template lang="pug">
.box
	.div
		ul
			li(v-for="item in tableData")
				.name
					span.qiandao {{item.describe}}
				.right
					span.add {{item.describe=='购买课程'?'10元=':'+'}}
					input.input(width="50" v-model="item.integral" @blur="send(item)")
					span 积分
					el-button.button(size="mini" :type="item.state=='true'?'danger':'primary'" @click="changeState(item)") {{item.state=="true"?"禁用":"启用"}}
					span {{item.state=="true"?"启用中":"禁用中"}}
</template>

<style lang="stylus" scoped>
.box
	padding 20px
	.div
		width 100%
		height 1000px
		background #fff
		ul
			padding 50px
			width 100%
			height 100%
			li
				width 100%
				height 50px
				padding 5px
				background #fff
				.name
					line-height 50px
					padding-left 10px
					width 150px
					float left
					span
						font-size 14px
						color #333
				.right
					width 60%
					line-height 50px
					float left
					span
						font-size 14px
						color #333
					.qiandao
						margin-right 30px
						border 1px solid red
					.add
						padding-right 10px
					.input
						margin-right 10px
					.button
						margin 0 20px 0 20px
</style>
