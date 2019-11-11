<script>
import {main} from "@/util/mixins"
import { setTimeout } from 'timers'
import {get_content,lottery} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			phone:"",
			deg:0,
			formData:{
			id:'',
			qrcode_product_id:this.$route.query.qrcode_product_id,
			phone:'',
			award_id:'',
			}
		}
	},
	mounted(){
		
	},
	methods:{
		async getList(){
			let id = this.$route.query.id
			await get_content({id}).then(res=>{
				this.info = res.data
				this.formData.id = res.data.id
				this.formData.award_id = res.data.lottery_info.win_award_id
				let oldArr = this.info.lottery_info.content
				let newArr1 = []
				let newArr2 = []
				let newArr3 = []
				// 平均分配谢谢惠顾
				for(let i=0;i<oldArr.length;i++){
					if(oldArr[i].award_name =="谢谢惠顾"){
						newArr2.push(oldArr[i])
					}else{
						newArr1.push(oldArr[i])
					}
				}	
				for(let i=0;i<oldArr.length;i++){
					if(i%2 && newArr1.length){
						newArr3.push(newArr1.pop())
					}else{
						if(newArr2.length){
							newArr3.push(newArr2.pop())
						}else{
							newArr3.push(newArr1.pop())
						}
					}
				}
				this.info.lottery_info.content = newArr3
				if(this.info.is_answer){
					let newArr = []
					for(let i=0;i<this.info.lottery_info.content.length;i++){
						if(this.info.lottery_info.content[i]['award_id'] == this.info.lottery_info.win_award_id){
							newArr.push(i)
						}
					}	
					if(newArr.length==1){
						this.deg += 2070+45*newArr[0]-this.deg%360
					}else{
						let n = this.randomNum(0,newArr.length-1)
						this.deg += 2070 + 45*newArr[n]-this.deg%360
					}
					let pointer = this.$refs.pointer
							pointer.style.transition = "0s ease-in-out"
							pointer.style.transform = 'rotate('+ this.deg +'deg)'
				}
			})
		},
		async gameStart(){
			
			let pointer = this.$refs.pointer
			let newArr = []
			if(this.info.is_answer){
				this.$dialog.toast({
					mes: '你已参与过抽奖！',
					timeout: 1500
				})
				return
			}
			await this.getList()
      for(let i=0;i<this.info.lottery_info.content.length;i++){
				if(this.info.lottery_info.content[i]['award_id'] == this.info.lottery_info.win_award_id){
					newArr.push(i)
				}
			}	
			if(newArr.length==1){
				this.deg += 2070 + 45*newArr[0]-this.deg%360
			}else{
				let n = this.randomNum(0,newArr.length-1)
				this.deg += 2070 + 45*newArr[n]-this.deg%360
			}
			lottery(this.formData).then(res=>{
				this.info.is_answer = true
			})
			pointer.style.transition = "6s ease-in-out"
			pointer.style.transform = 'rotate('+ this.deg +'deg)'
			setTimeout(()=>{
				let str=  this.info.lottery_info.win_award_name
				str=="谢谢惠顾"?null:str='恭喜你获得' + str
				this.$dialog.alert({mes: str})
			},6100)
		},
		randomNum(minNum,maxNum){ 
			switch(arguments.length){ 
					case 1: 
							return parseInt(Math.random()*minNum+1,10); 
					break; 
					case 2: 
							return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
					break; 
							default: 
									return 0; 
							break; 
			} 
		}
	}
}
</script>
<template lang="pug">
.body
	yd-navbar(slot="navbar" title="幸运大转盘")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon() 返回
	.content
		.turntable
			ul.prize(v-if="info.lottery_info")
				li.el(v-for="item in info.lottery_info.content") {{item.award_name}}
			.pointer
				.img(@click="gameStart" ref="pointer") 点击抽奖
		//- .getPhone
			.title 需要手机号码才能领取哦！
			input(v-model="phone" placeholder="请输入密码")
			//button 开始
</template>
<style lang="stylus" scoped>
.body 
	height 100%
	display flex
	flex-direction column
	background #fff
.content
	flex 1
	background #fff
	font-size 0.28rem
	width 7.5rem
	margin 0 auto
	background  url('./img/bg.png') center 0 no-repeat
	background-size 100% auto
	.turntable
		position relative
		width 6.42rem
		height 6.42rem
		left 50%
		transform translate(-50%,3rem)
		.prize
			position absolute
			height 6.42rem
			width 1.65rem
			top 0.8rem
			left 50%
			transform translateX(-50%)
			li
				position absolute
				font-size 0.24rem
				color #ff621c
				width 1.65rem
				height 2.4rem
				text-align center
				transform-origin center bottom
				&:nth-child(2)
					transform rotate(45deg)
				&:nth-child(3)
					transform rotate(90deg)
				&:nth-child(4)
					transform rotate(135deg)
				&:nth-child(5)
					transform rotate(180deg)
				&:nth-child(6)
					transform rotate(225deg)
				&:nth-child(7)
					transform rotate(270deg)
				&:nth-child(8)
					transform rotate(315deg)
	.pointer 
		height 1.81rem
		width 2.58rem
		position absolute
		left 50%
		top 50%
		cursor pointer
		transform translate(-50%,-50%)
		.img 
			width 100%
			height 1.81rem
			text-align center
			line-height 1.81rem
			color #fff
			transition 6s ease-in-out
			background url('./img/pointer.png') center center no-repeat
			background-size  100% auto
	.getPhone
		position absolute
		width 100%
		padding 0 1rem
		bottom 1.4rem
		.title
			color #efefef
			font-size 0.28rem
			line-height 0.5rem
			font-family 'PingFang-SC-Regular' 
		input,button
			width 100%
			height 0.8rem
			border 1px solid #e8e8e8
			border-radius 0.08rem
			outline none
			background #fff
			text-indent 0.2rem
		button 
			background linear-gradient(180deg, #fdc631 0%, #f6bd1f 100%)
			color #fff
			margin-top 0.3rem
			border none
			font-weight bold 
			outline none
</style>
