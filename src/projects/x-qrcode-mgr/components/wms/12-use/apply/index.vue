<script>
import { main } from "@/util/mixins";
import formSerialize from "form-serialize";
import * as services from 'services/x-qrcode/registration'

import { mapMutations, mapState } from "vuex";
import { constants } from 'crypto';
import previewImgConfig from './imgConfig';
import Detail from './detail';

export default {
	components: {
	},
	mixins: [main],
	data() {
		return {
			services,
			previewImgConfig,
			previewSrc: '',
			searchQuery: {},
			statusList: [
				{ name: "全部", value: "all" },
				{ name: "已使用", value: "used" },
				{ name: "未使用", value: "noUse" }				
			],
			status: "all",
			previewDialog: false, //预览
		};
	},
	components: {
		Detail
	},
	methods: {
		setList(data) {
			//设置列表
			this.setSerieslist(data);
		},
		setPage(data) {
			//设置页码
			this.setSerieslistPage(data);
		},
		jumpToNew(){
			this.$router.push('/wms/applyNew')
		},
		del(id){
			services.del(id)
				.then((res) =>{
          if(res.status){
						this.getList()
						this.$message.success(res.message)
					}else{
						this.$message.error('操作失败')
					}
				})
				.catch(({message}) => {
					this.$message.error(message)
				})
		},
		previewImg(id){
		 this.previewSrc = this.previewImgConfig[id]
		 this.previewDialog = true
		},
		...mapMutations(["setSerieslist", "setSerieslistPage"]),
		jumpToForm(id){
			this.$router.push(`/wms/applyForm/${id}`)
		}
	},
	computed: {
		...mapState({
			list: state => state.series.list,
			page: state => state.series.page
		})
	}
	
};
</script>
<template lang="pug">
.index.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="表单名称" name="name" clearable v-model="searchQuery.name")           
							span.group-inline 创建时间
							span.group-inline 
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-select(v-model="status" )
									el-option(v-for="item in statusList"
									:key="item.value"
									:label="item.name"
									:value="item.value"
									)
							span.group-inline.float-right
								el-button(size="mediu" type="primary" icon="el-icon-plus" @click="jumpToNew" plain ) 新建
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						table.table
							thead
								tr
									th 表单名称
									th 创建时间
									th 模板
									th 状态
									th 操作
							tbody
								tr(v-for="item in list")
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name {{item.create_time}}
									th
										.th-name {{item.style}}
									th
										.th-name {{item.status_name}}
									th
										.btns
											span.btn(@click="previewImg(item.style)") 预览
											span.btn(@click="jumpToForm(item.id)") 表单
											span.btn(@click="del(item.id)") 删除
						
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[10, 50, 100]"
								:page-size="page.offset"
								layout="total, sizes,prev, pager, next, jumper"
								:total="page.total"
							)

	//- 详情
	.dialogs
		el-dialog(
			title="详情"
			:center="false"
			:visible.sync="previewDialog"
			top="50px"
			width="550px"
			)
			.content(slot="title") 预览
			Detail(
				v-if="previewDialog"
				:previewDialog.sync="previewDialog"
				:detailData="previewSrc"
			)
			.content(slot="footer")  
</template>


<style lang="stylus" scoped>
.mediaList .imgWrap:hover {
  box-shadow: 0;
  transform: translateY(0);
  transition: all 0.3s ease-in-out;
}

.tableWrap {
  width: 97%;
}

.form-control {
  width: 170px;
}

.width-small {
  width: 100px;
}
.btn{
	display inline-block;
	margin-right 10px;
	color rgb(68,195, 170)
}

.el-dialog__wrapper {
  .form-control {
    margin-right: 10px;
    width: 100px;
    min-width: @width;
  }
}

.contList {
  li {
    display: inline-block;
    padding-right: 10px;
  }

  .disabled {
    color: #bdbdbd;
  }
}

.mediaList .itemWrap {
  display: inline-block;
  width: 23%;
  padding: 10px;
  height: 300px;
  box-sizing: border-box;
}

.mediaList .imgWrap .imgcontent {
  text-align: center;
  position: relative;
  width: 280px;
  height: 200px;
  display: table-cell;
  vertical-align: middle;
}

.mediaList .imgWrap .imgcontent img {
  max-height: 100%;
  max-width: 100%;
}
</style>
