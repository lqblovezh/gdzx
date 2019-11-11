<script>
import * as services from 'services/x-read/headerSetting'
import Tree from './tree'

export default {
  components: {
    Tree,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
  },
  methods: {
		// update(e) {
		// 	getTask(e.target.files[0]).then(res => {
		// 		if(this.currentRef) {
		// 			let index = this.list.findIndex(item => item.id === this.currentRef)
		// 			this.$set(this.list[index],'img_src',res.data.url)
		// 			this.$set(this.list[index],'src',res.data.path)
		// 		}else{
		// 			this.detailDate.img_src = res.data.url
		// 			this.detailDate.src = res.data.path
		// 			console.log(this.detailDate);
		// 		}
		// 	})
		// },
		// updateImg(ref) {
		// 	this.currentRef = ref
		// 	this.$refs.updateImg.click()
		// },
		// add() { //新增二级
		// 	this.id += 1
		// 	this.secondList.push({
		// 		act: 'add',
		// 		title: '',
		// 		url: '',
		// 		src: '',
		// 		id: this.id,
		// 	})
		// },
		// save() {
		// 	let list = [...this.list]
		// 	list.forEach(item => {
		// 		if(item.act == 'add') {
		// 			item.id = null
		// 		}
		// 	})
		// 	let data = {
		// 		...this.detailDate,
		// 		list,
		// 	}
		// 	console.log(data)
		// }
  },
}
</script>

<template lang="pug">
div
	.content
		Tree(:dataList="list")
			//- .top(v-for="item in list")
			//- 	span(style="margin-right:15px") 一级
			//- 	.left
			//- 		el-input(placeholder="名称" v-model="item.name")
			//- 	.right
			//- 		img.img(:src="item.img_src" ref="mainImage")
			//- 		el-button(type="primary" @click="updateImg()" size="small" plain) 修改
			//- 		el-button(type="primary" @click="del(item.id)" size="small" plain) 删除
			//- 		el-button(type="priamry" plain) 新增一级分类
			//- .bottom
			//- 	span(style="margin-right:15px") 二级
			//- 	.box
			//- 		.list(v-for="item in secondList")
			//- 			.left
			//- 				el-input(placeholder="二级分类名称" v-model="item.name" )
			//- 			.right
			//- 				img.img(:src="item.img_src||'https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg'" :ref="item.id")
			//- 				el-button(type="primary" @click="updateImg(item.id)" size="small" plain) 上传
			//- 				el-button(type="primary" @click="del(item.id)" size="small" plain) 删除
			//- 		.btn
			//- 			el-button(type="primary" @click="add()" class="el-icon-plus" size="small") 增加二级
</template>


<style lang="stylus" scoped>
</style>
