<script>
import { main } from "@/util/mixins";
import formSerialize from "form-serialize";
import * as services from "services/x-qrcode/registration";

import { mapMutations, mapState } from "vuex";

export default {
	components: {
	},
	mixins: [main],
	data() {
		return {
			services,
			searchQuery: {},
			statusList: [
				{ name: "全部", value: "all" },
				{ name: "已使用", value: "used" },
				{ name: "未使用", value: "noUse" }				
			],
			status: "all"
		};
	},
	methods: {
		getList(
			pageNum = (this.page && this.page.num) || 1,
			pageOffset = (this.page && this.page.offset) || 10,
			query = {}
		) {
			let id =  this.$route.params.id
			console.log(id)
			// query.group_id = this.currGroup;
			this.services.applyList({id, pageNum, pageOffset, ...query }).then(res => {
				this.setList(res.data);
				this.setPage(res.page);
			});
		},
		setList(data) {
			//设置列表
			this.setSerieslist(data);
		},
		setPage(data) {
			//设置页码
			this.setSerieslistPage(data);
		},
		...mapMutations(["setSerieslist", "setSerieslistPage"])
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
							span.group-inline 提交时间
							span.group-inline 
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-button(size="mediu" type="primary" icon="el-icon-plus" plain ) 搜索
								span() 导出
					.tableWrap
						table.table
							thead
								tr
									th 提交时间
									th 姓名
									th 电话
							tbody
								tr(v-for="item in list")
									th
										.th-name(:title="item.name") {{item.create_time}}
									th
										.th-name {{item.name}}
									th
										.th-name {{item.phone}}  
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
