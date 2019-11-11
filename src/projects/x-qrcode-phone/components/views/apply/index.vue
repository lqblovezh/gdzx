<script>
import {main} from "@/util/mixins"
import {get_content} from "services/x-qrcode/phone"
import Model1 from "@/components/views/apply/model1.vue"
import Model2 from "@/components/views/apply/model2.vue"
export default {
	mixins: [main],
	data(){
		return{
			style: '',  //模板
		}
	},
	created(){

	},
	computed: {
		currentComponent: function(){
			return this.style.replace(/(\w)(\w*)/g,function(match,$1,$2){
				return $1.toUpperCase() + $2.toLowerCase()
			})
		}
	},
	components: {
		Model1,
		Model2
	},
	methods:{
		getList(){
			let id = this.$route.query.id
			this.query = this.$route.query
			this.$dialog.loading.open('加载数据中...')
			get_content({id}).then(res=>{
				this.info = res.data
				this.style = res.data.style
				console.log(this.info)
				console.log('this.info')
				this.$dialog.loading.close()
			},err=>{
				this.$dialog.loading.close()
			})
		}
	}
}
</script>
<template lang="pug">
.body
	yd-navbar(slot="navbar" title="报名" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.container
		component(:is="currentComponent" :data="info") 
</template>
<style lang="stylus" scoped>
.body 
	height 100%
	display flex
	flex-direction column
	background #fff
.container
	flex 1
	background #fff
	font-size 0.28rem
	width 7.5rem
	margin 0 auto


</style>
