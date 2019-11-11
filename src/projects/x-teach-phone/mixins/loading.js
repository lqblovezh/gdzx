import { mapMutations } from 'vuex'
export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit('common/TOGGLE_LOADING', true)
		})
	},
	methods: {
		...mapMutations('common', ['TOGGLE_LOADING']),
	}
}