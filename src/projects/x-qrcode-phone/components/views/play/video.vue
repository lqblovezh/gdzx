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
			audio:{
				currentTime:'00:00',
				duration:'00:00',
				progress:'',
			}
		}
	},
	mounted(){
		let dom = this.$refs.audio
		dom.src= this.query.preview
		// console.log(dom.play)
	},
	methods:{
		getList(){
			this.params = this.fetch()
			// console.log(this.params,'xxxasda')
			this.info = this.params.gather.data.components
			this.query = this.info[this.params.gather.n] ||{}
		},
		canplay(){
			this.audio.duration = this.toTime(this.$refs.audio.duration)
		},
		error(){
			this.isPlay = false
		},
		/* 暫時不需要
		is_Play(){
			let dom = this.$refs.audio
			this.isPlay=!this.isPlay
			if(this.isPlay){
				dom.play()
			}else{
				dom.pause()
			}
		},
		prev(){
			this.params.gather.n --
			if(this.params.gather.n<0){
				this.params.gather.n = this.info.length-1
			}
			this.query = this.info[this.params.gather.n] ||{}
			this.isPlay = true
		},
		next(){
			let dom = this.$refs.audio
			this.params.gather.n ++
			if(this.params.gather.n>=this.info.length){
				this.params.gather.n = 0
			}
			this.query = this.info[this.params.gather.n] ||{}
			this.$refs.audio.src= this.query.preview
			this.isPlay = true
		},
		*/
		timeupdate(){
			let dom = this.$refs.audio
			this.isPlay = true
			this.audio.currentTime = this.toTime(dom.currentTime)
			this.audio.duration = this.toTime(dom.duration)
			this.audio.progress = dom.currentTime/dom.duration
		},
		ended(){
			let dom = this.$refs.audio
			this.next()
			console.log(dom.getStartDate(),12346)
		},
		toTime(result) {
			let h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
			let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
			let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
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
			video( ref="audio" controls="controls"  @ended="ended" @canplay="canplay"  @error="error"  autoplay="autoplay" @timeupdate='timeupdate') 	
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
		video 
			width 100%
</style>
