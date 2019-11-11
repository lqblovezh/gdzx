<script>
import {main} from "@/util/mixins"
export default {
	mixins:[main],
	data(){
		return{
			type:0,
			isPlay:false,
			info:[],
			query:{},
			params:{},
			dom:null,
			audio:{
				currentTime:'00:00',
				duration:'00:00',
				progress:'',
			}
		}
	},
	mounted(){
		this.dom = this.$refs.audio
		this.dom.src= this.query.preview
	},
	methods:{
		getList(){
			this.params = this.fetch()
			this.info = this.params.gather.data.components
			this.query = this.info[this.params.gather.n] ||{}
		},
		canplay(){
			this.audio.duration = this.toTime(this.$refs.audio.duration)
		},
		is_Play(){
			let dom = this.$refs.audio
			this.isPlay = !this.isPlay
			if(this.isPlay){
				dom.play()
			}else{
				dom.pause()
			}
		},
		error(){
			this.isPlay = false
		},
		prev(){
			this.params.gather.n --
			if(this.params.gather.n<0){
				this.params.gather.n = this.info.length-1
			}
			this.query = this.info[this.params.gather.n] ||{}
			this.isPlay = true
			dom.play()
		},
		next(){
			let dom = this.$refs.audio
			this.params.gather.n ++
			if(this.params.gather.n>=this.info.length){
				this.params.gather.n = 0
			}
			this.query = this.info[this.params.gather.n] ||{}
			dom.src= this.query.preview
			this.isPlay = true
			dom.play()
		},
		timeupdate(){
			let dom = this.$refs.audio
			if(dom){
				this.audio.currentTime = this.toTime(dom.currentTime)
				this.audio.duration = this.toTime(dom.duration)
				this.audio.progress = dom.currentTime/dom.duration
			}
		},
		ended(){
			this.next()
		},
		toTime(result) {
			let t1 = Math.floor(result / 3600),
					t2 = Math.floor((result / 60 % 60)),
					t3 = Math.floor((result % 60)),
					h  = t1 < 10 ? '0' + t1 : t1,
					m  = t2 < 10 ? '0' + t2 : t2,
					s  = t3 < 10 ? '0' + t3 : t3;
			if(h=="00"){
			  return result = m + ":" + s
			}
			return result = h + ":" + m + ":" + s
		},
		itemClick(key){
			this.$dialog.loading.open('数据加载中')
			setTimeout(() => {
					this.type = key;
					this.$dialog.loading.close();
			},1000)
		},
		
	},
}
</script>
<template lang="pug">
.body
	yd-navbar(slot="navbar" :title="query.name" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back()" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.cover
			.img(:style="{backgroundImage:'url('+query.img_src+')'}")
		.play
			.progress
				.time {{audio.currentTime}}
				.progressbar
					.current(:style="{width:audio.progress*100 +'%'}")
				.totalTime {{audio.duration}}
			.handle 
				.prev(@click="prev")
				.isPlay(:class="isPlay?'play':'pause'" @click="is_Play")
				.next(@click="next")
		audio.hide( ref="audio"  @ended="ended" @canplay="canplay"  @error="error"  @timeupdate='timeupdate')
</template>
<style lang="stylus" scoped>
.body 
	display flex
	flex-direction column
	height 100%
.content
	display flex
	height 100%
	flex 1
	flex-direction column
	.cover
		background #ffffff
		flex:1
		margin-bottom 0.2rem
		display flex
		align-items center
		justify-content center
		.img 
			height 4.41rem
			width 4.98rem
			background center center no-repeat
			background-size auto 4.41rem
	.play
		background #fff
		height 4.45rem
		box-sizing border-box
		.progress
			padding 1.1rem 0.4rem 0 0.4rem
			display flex
			.progressbar
				flex 1
				background #ccc
				height 0.04rem
				margin 0.15rem 0.2rem 0
				.current
					height 0.04rem
					background #3998e2
					width 0
	.handle 
		display flex
		height 0.98rem
		margin-top 1.1rem
		align-items center
		justify-content center
		>div
			background  no-repeat center center
			background-size 100% 100%
		.prev,.next
			height 0.51rem
			width 0.51rem
			background-image url('./img/prev.png')
		.isPlay
			height 0.98rem
			width 0.98rem
			margin 0 0.7rem
		.next
			background-image url('./img/next.png')
		.play
			background-image url('./img/play.png')
		.pause
			background-image url('./img/pause.png')
</style>
