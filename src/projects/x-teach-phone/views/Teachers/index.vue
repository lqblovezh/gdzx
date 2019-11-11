<script>
import Teacher from '@/components/common/TeacherItem'
import { mapState, mapActions } from 'vuex';
import loadmoreMixin from '@/mixins/loadmore'
export default {
	mixins: [loadmoreMixin],
  components: {
    Teacher,
	},
	data () {
		return {
			options: {
				click: true
			}
		}
	},
	mounted () {
		this.fetch(true)
	},
  methods: {
		queryList(params) {
			return this.$service.teacher.getTeacherList({ ...params })
		}
	}
}
</script>
<template lang="pug">
v-wrapper(title="教学名师" :main-type="1" class="teacher-list")
	cube-scroll(
		ref="scroll"
		:options="options"
		@pulling-up="onPullUp"
	)
		layout-grid
			Teacher(:info="item" v-for="item in list" :key="item.id")
</template>
<style lang="stylus" scoped>
.teacher-list
	.container
		padding-top 0.3rem
		box-sizing border-box
</style>
