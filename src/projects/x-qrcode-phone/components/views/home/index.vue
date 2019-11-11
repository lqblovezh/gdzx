<script>
import {main} from "@/util/mixins"
import {get_resource} from "services/x-qrcode/phone"
import {thirdLogin} from "services/common/member"
import { constants } from 'crypto';
import { mapState} from 'vuex'
export default {
	data(){
		return{
			list:[],
			info:{},
			page:{

			},
			showMenu:false,
			id:null, //二维码id
		  msg_error: '', //未挂载资源
			myItems: [
					{
							label: '我的奖品',
							callback: () => {
								this.to('/prize',{qrcode_id:this.id})
							},
							stay: true /* 不关闭 */
					},
					{
							label: '订单记录',
							callback: () => {
								this.to('/order',{qrcode_id:this.id})
							}
					},
					{
						label: '我的资源',
						callback: () => {
								this.to('/myResource',{qrcode_id:this.id})
						}
					},
					{label: '读者圈',
						callback: () => {
							this.to('/circle',{qrcode_id:this.id})
						}
					}
			]
		}
	},
	computed: {
		...mapState('home',["resource_list"])
	},
	created(){
		this.id =this.$route.query.qrcode_id || window.sessionStorage.getItem('qrcode_id')
		window.sessionStorage.setItem('qrcode_id', this.id) 
		if (!window.sessionStorage.getItem('token')) {
			this.$router.push({path: '/login'})
			return
		}
		if(this.$route.query.token_id){
			window.sessionStorage.setItem('token', this.$route.query.token_id)
			this.token = this.$route.query.token_id
			this.getList()
		}else{
			this.getList()
		}
	},
	methods:{
		getList(){
			if(!this.id){
				let info = JSON.parse(window.localStorage.getItem('system'))|| {}
				this.id = info.id
			}  
			if(!this.resource_list.length){
				get_resource({id:this.id}).then(res=>{
					window.localStorage.setItem('system',JSON.stringify({id:this.id,scan_id:res.data.scan_id,time:(new Date()).getTime()}))
					this.$store.commit('home/SET_RESOURCE_LIST', res.data.resource_list || [])
					this.msg_error = res.data.msg_error
				}).catch(({message}) => {
					console.log(message)
				})
			}
		},
		login(){
			// thirdLogin({
			// type:'qq_web',
			// back_url:location.href,
			// }).then(res=>{
			// 	location.href = res.data.login_link
			// })
		},
		go(name,params){
			this.$router.push({name,params})
		},
	  to(path,query){
			this.$router.push({path,query})
		},
		outLink(href){
			location.href=href
		},
		show(item){
			if(item.preview){
				location.href= item.preview
				return
			}
			if(item.resource_type == 'resource'){
				if(item.product_type == 'practices'){
					this.to('/resource',{qrcode_id:this.id,id:item.id,qrcode_product_id:item.qrcode_product_id})
					return
				}
				this.to('/gather',{qrcode_id:this.id,id:item.id,name:item.name,qrcode_product_id:item.qrcode_product_id})
			}else if(item.resource_type=="app"){
				if(item.app_type_name =="书圈"){
					this.to('/bookDetail',{id:item.id,qrcode_id:this.id,name:item.name,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name =="投票"){
					this.to('/vote',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name == "问卷调查"){
					this.to('/ans',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name == "问答"){
					this.to('/qus',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name == "刮刮卡"){
					this.to('/scratch',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name == "大转盘"){
					this.to('/turntable',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}else if(item.app_type_name == "报名"){
					this.to('/apply',{id:item.id,qrcode_id:this.id,qrcode_product_id:item.qrcode_product_id})
				}
			}else if(item.resource_type == "special"){
				this.to('/special',{id:item.id,qrcode_id:this.id,name:item.name,qrcode_product_id:item.qrcode_product_id})
			}
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="主页" color="#fff" bgcolor="#3998e2")
		router-link(to="/" slot="left")
			//- yd-navbar-back-icon(color="#fff") 返回
	.scroll
		.content
			.noMsg(v-if="msg_error") {{msg_error}}
			.part(v-if="resource_list[0]" @click="show(resource_list[0])")
				img.banner(:src="resource_list[0].img_src")
				.txt {{resource_list[0].name}}
			ul.list
				li(v-for="(item,i) in resource_list" v-if="i>0" @click="show(item)")
					.txt {{item.name}}
					img(:src="item.img_src")
	div(slot="tabbar")
		yd-button(@click.native="showMenu = true" size="large" color="#fff" bgcolor="#3998e2") 我的
		yd-actionsheet(:items="myItems" v-model="showMenu")
</template>
<style lang="stylus" scoped>
.content
	background #fff
	font-size 0.28rem
	.part
		border-bottom 0.01rem solid #e8e8e8
		padding 0.3rem
		.txt 
			padding 0.2rem 0
	.banner 
		max-height 2.9rem
		width 100%
		display block
		margin 0 auto
	.list
		padding 0.3rem
		li  
			display flex
			padding 0.1rem 0
			height 1.4rem
			border-bottom 1px solid #ccc
			.txt 
				flex 1
				display flex
				align-items center
				margin-right 0.3rem
			img
				width 1.18rem
</style>
