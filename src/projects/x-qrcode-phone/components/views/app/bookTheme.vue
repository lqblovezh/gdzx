<script>
import {main} from "@/util/mixins"
import {circle_theme_info,comment_list,comment,circle_praise} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			show:false,
			id:this.$route.query.id,
			page:{},
			form:{
				pid:'',
				circle_theme_id:this.$route.query.id,
				content:''
			}
		}
	},
	methods:{
		getList(){
			this.$dialog.loading.open('加载数据中...')
			circle_theme_info({
				theme_id:this.id
			}).then(res=>{
				this.info = res.data
			},err=>{
				this.$dialog.loading.close()
			})
			comment_list({
				theme_id:this.id
			}).then(res=>{
				this.list = res.data
				this.page = res.page
				this.$dialog.loading.close()
			},err=>{
				this.$dialog.loading.close()
			})
		},
		open(){
			this.show = true
		},
		getFileUrl(e){
			this.form.img_src = URL.createObjectURL(e.target.files[0])
		},
		send(){
			this.show = false
			this.$dialog.loading.open('数据上传中...')
			setTimeout(() => {
					this.$dialog.loading.close()
			}, 2000)
		},
		sendMsg(){
			this.form.content = this.$refs.msg.innerHTML
			comment(this.form).then(res=>{
				comment_list({
					theme_id:this.id
				}).then(res=>{
					this.list = res.data
				})
			})
		},
		get_goods(item,type){
			let id = type=="theme"? this.id:item.id
			circle_praise({
				_id:id,
				type:type,
			}).then(res=>{
				if(!item.praise_state){
					item.praise_num +=1 
					item.praise_state = true
				}else{
					item.praise_num -=1 
					item.praise_state = false
				}
			})
		},
		showMsg(id){
			this.form.pid = id
			this.show = true
		},
		loadList(){
			let pageStart = this.page.start + this.page.offset
				comment_list({theme_id:this.id,pageStart:pageStart,pageOffset:this.page.offset}).then(res=>{
				this.list = [...this.list,...res.data]
				if (this.list.length>=this.page.total) {
					/* 所有数据加载完毕 */
					this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone')
					return;
				}
				this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad')
			})
		},
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="主题详情" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			.main
				.title
					img(:src="info.img_src")
					span.name {{info.nick_name}}
					span.time {{info.create_time}}
					#handle(class="other")
						span.item(@click="showMsg('')") 
							img(src="./img/talk.png")
							//- span 22
						span.item(@click="get_goods(info,'theme')")
							img(src="./img/good_true.png" v-if="info.praise_state")
							img(src="./img/good_false.png" v-else)
				.describe {{info.abs}}
			ul.list
				li(v-for="item in list")
					.title
						img(:src="item.img_src")
						.info
							p.ft
								span.from {{item.from_user_name}}
								span.c5(v-if="item.to_user_name") 回复
								span.to {{item.to_user_name}}
							p.time 
								span {{item.create_time}}
					.discribe {{item.content}}
					#handle
						span.item(@click="showMsg(item.id)") 
							img(src="./img/talk.png")
							//- span 22
						span.item(@click="get_goods(item,'messages')")
							img(src="./img/good_true.png" v-if="item.praise_state")
							img(src="./img/good_false.png" v-else)
							span {{item.praise_num}}
		span(slot="doneTip") 没有数据啦 ~~~
	.footer(slot="tabbar" v-show="show")
		.wtiteMsg(contenteditable="true" ref="msg")
		.btn(@click="sendMsg") 发表评论
</template>
<style lang="stylus" scoped>
.body 
	background #fff
.scroll 
	background #fff
	padding 0.1rem 0.3rem
	touch-action none
.content
	background #fff
	font-size 0.28rem
	.main
		//border-bottom 0.01rem solid #e8e8e8
		padding 0.2rem 0
		.title
			display flex 
			align-items center 
			span 
				margin-left 0.2rem
			img
				width 1.1rem
				height 1.1rem
				border-radius 1.1rem
		.describe
			padding 0.1rem 0
	.list
		background #f7f7f7
		padding 0.2rem 0.1rem
		border-radius 0.2rem
		li 
			padding 0.2rem 0
		li:not(:last-child) 
			border-bottom 0.01rem dashed #e8e8e8
		img 
			height 0.8rem
			width 0.8rem
			border-radius 1.1rem
		.title 
			display flex
			align-items center
			padding 0.2rem 0
			.info 
				display flex
				justify-content space-between
				flex 1
				padding 0
				.ft    
					flex 1
					width 100px
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
				.from,.c5,.to
					margin-left 0.1rem
				.from 
					margin-left 0.2rem
				.time 
					margin 0 0 0 0.1rem
					width 2.4rem
					line-height 0.5rem
					font-size 0.25rem
		.discribe
			padding-left 1rem
#handle
	margin-top 0.1rem
	display flex
	justify-content flex-end
	.item 
		margin-left 0.6rem
		display flex
		span 
			margin-left 0.1rem
			color #808080
		img 
			height 0.35rem
			width 0.35rem
			border-radius 0
#handle.other 
	.item 
		margin 0.1rem		
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
.time
	margin 0 0.3rem
	color #808080
.footer 
	display flex
	align-items center
	background #f0f0f0
	box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2)
	padding 0.2rem
	.btn 
		padding 0.2rem
		color #3998e2
		background #3998e2
		color #fff
		margin-left 0.1rem
.wtiteMsg
	flex 1
	min-height: 20px;
	max-height: 300px;
	_height: 120px;
	margin-left: auto;
	margin-right: auto;
	padding: 3px;
	outline: 0;
	border: 1px solid #a0b3d6;
	font-size: 12px;
	line-height: 24px;
	padding: 5px;
	word-wrap: break-word;
	border-radius 0rem
	overflow-x: hidden;
	overflow-y: auto;
	background #fff
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
</style>
