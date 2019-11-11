<script>
import { setInterval } from 'timers';
import {duration} from "services/x-qrcode/phone"
import {thirdLogin} from "services/common/member"
import {thirdConf} from "services/common/normal"
export default {
	name: "App",
	data(){
		return {
			token:'',
		}
	},
	created(){
			// setInterval(()=>{
			// 	let info = JSON.parse(window.localStorage.getItem('system') || '{}')
			// 	let time = info.time
			// 	if(!time) return
			// 	time = ((new Date()).getTime()-time)/1000/60
			// 	duration({
			// 		scan_id:info.scan_id,
			// 		duration:time 
			// 	})
			// },10000)
			thirdConf()
	},
  methods: {
		
	},
};
</script>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus" scoped>
#app
	height 100vh
	background #eee
	color #333
</style>


