<script>
import {main} from "@/util/mixins"
import {
  getTask
} from 'services/common'
import {
	get_content,
	circle_theme_list,
	circle_join,
	circle_theme_add,
	circle_info,
	circle_praise
	} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			show:false,
			id:"",
			getMoreData:circle_theme_list,
			form:{
				img_src:'',
				txt:'',
				img:[]
			},
			page:{}
		}
	},
	methods:{
		async getList(){
			let id=this.$route.query.id
			let type = this.$route.query.type
			this.$dialog.loading.open('加载数据中...')
			if(type){
				await circle_info({circle_id:id}).then(res=>{
						this.info = res.data
						this.id = res.data.resource_id	
				},err=>{
					this.$dialog.loading.close()
				})
			}else{
				await get_content({id}).then(res=>{
					this.info = res.data
					this.id = res.data.id
				},err=>{
					this.$dialog.loading.close()
				})
			}
			circle_theme_list({circle_id:this.id})
			.then(res=>{
				this.list = res.data
				this.page = res.page
				this.$dialog.loading.close()
			},err=>{
				this.$dialog.loading.close()
			})	
		},
		loadList(){
			let pageStart = this.page.start + this.page.offset
			this.getMoreData({circle_id:this.id,pageStart:pageStart,pageOffset:this.page.offset}).then(res=>{
				this.list = [...this.list,...res.data]
				if (this.list.length>=this.page.total) {
					/* 所有数据加载完毕 */
					this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone')
					return;
				}
				this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad')
			})
		},
		open(){
			this.show = true
		},
		getFileUrl(e){
			this.form.img_src = URL.createObjectURL(e.target.files[0])
		},
		async send(){
			this.show = false
			this.$dialog.loading.open('数据上传中...')
			let file = this.$refs.file.files[0]
			await getTask(file).then(res=>{
				this.form.img.push(res.data.path)
			})
			await circle_theme_add({
				circle_id:this.id,
				img:this.form.img,
				abs:this.form.txt
			}).then(res=>{
				this.getList()
				this.$dialog.toast({
					mes: '添加成功',
					timeout: 1500
				})
			}).catch(({ payload }) => {
				this.$dialog.toast({
					mes: payload.message,
					timeout: 1500
				})
			})
			this.$dialog.loading.close()
		},
		add_circle(){
			circle_join({
				circle_id:this.info.info.circle_id
			}).then(res=>{
				this.$dialog.toast({
					mes: '添加成功',
					timeout: 1500
				})
			}).catch(({ payload }) => {
				this.$dialog.toast({
					mes: payload.message,
					timeout: 1500
				})
			})
		},
		show_res(){
			if(this.info.type=="special"){
				this.to('/special',{qrcode_id:this.qrcode_id,id:this.info.resource_id,type:this.info.type})
			}else{
				this.to('/gather',{qrcode_id:this.qrcode_id,id:this.info.resource_id,type:this.info.type})
			}
		},
		get_goods(item){
			circle_praise({
				_id:item.id,
				type:'theme',
			}).then(res=>{
				if(!item.praise_state){
					item.praise_num +=1 
					item.praise_state = true
				}else{
					item.praise_num -=1 
					item.praise_state = false
				}
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="书圈" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			.main
				img(:src="info.img_src")
				.info 
					.name {{info.name}}
					.instruct {{info.abs}}
					.btns
						yd-button(bgcolor="#3998e2" color="#fff" @click.native="show_res") 查看资源
						yd-button(bgcolor="#3998e2" color="#fff" @click.native="add_circle")  &#12288;加入&#12288;
			ul.list
				li(v-for="item in list" @click="")
					.title(@click="to('/bookTheme',{id:item.id})") 
						img(:src="item.img_src")
						span.name {{item.from_user_name}}
						span.time {{item.create_time}}
					.discribe() {{item.abs}}
					.handle
						span.item(@click="get_goods(item)")
							img(src="./img/good_true.png" v-if="item.praise_state")
							img(src="./img/good_false.png" v-else)
							span {{item.praise_num}}
						span.item(@click="to('/bookTheme',{id:item.id})") 
							img(src="./img/talk.png")
							span {{item.comment_num}}
			yd-popup(v-model="show" position="center" width="90%")
				.dialog(style="background-color:#fff;")
					form
						img(:src="form.img_src")
						yd-button.upload(bgcolor="#3998e2" color="#fff" @click.native="$refs.file.click()") 点击上传图片
						input.hide(type='file' ref="file" @change="getFileUrl")
						yd-textarea.w(slot="right" placeholder="请填写主题相关内容" maxlength="100" v-model="form.txt")
						.send
							yd-button(bgcolor="#3998e2" color="#fff" @click.native="send") 确定
		//- img.loading(slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg")
		span(slot="doneTip") 没有数据啦 ~~~
	yd-button(size="large" slot="tabbar" bgcolor="#3998e2" color="#fff" @click.native="open") 发表主题
</template>
<style lang="stylus" scoped>
.body 
	background #fff
.scroll 
	background #fff
	padding 0.1rem 0.3rem
	* { touch-action: pan-y; } 
.content
	background #fff
	font-size 0.28rem
	.main
		display flex
		border-bottom 0.01rem solid #e8e8e8
		padding 0.2rem 0
		img
			width 1.6rem
			height 1.8rem
		.info 
			padding 0 0.2rem
			line-height 0.4rem
			flex 1
			.name 
				padding 0.1rem 0
		.btns
			display flex 
			margin-top 0.4rem
			justify-content space-between
	.list
		li 
			padding 0.2rem 0
		li:not(:last-child) 
			border-bottom 0.01rem dashed #e8e8e8
		img 
			height 1.1rem
			width 1.1rem
			border-radius 1.1rem
			touch-action none
		.title 
			display flex
			align-items center
			padding 0.2rem 0
			.name 
				margin-left 0.3rem
			.time
				margin 0 0.3rem
				color #808080
		.handle
			margin-top 0.2rem
			display flex
			.item 
				margin-right 1rem
				display flex
				align-items center
				span 
					margin-left 0.1rem
					color #808080
				img 
					height 0.35rem
					width 0.35rem
					border-radius 0rem
.dialog
	padding 0.2rem
	img
		max-height 2rem
		display block 
.img 
	height 2rem
	border 0.01rem solid #e8e8e8
.w 
	border 0.01rem solid #e8e8e8
	padding 0.1rem 0.2rem
.send 
	text-align right
	margin-top 0.3rem
.upload
	margin 0.2rem 0
</style>
