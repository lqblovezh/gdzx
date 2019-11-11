<script>
const COMPONENT_NAME = 'ui-fixed-layer'
export default {
	name: COMPONENT_NAME,
	data () {
		return {
			state: false
		}
	},
	methods: {
		show() {
			this.state = true
		},
		hide () {
			this.state = false
		}
	}
}
</script>
<template lang="pug">
.full-layer__fixed(v-show="state" @click="hide")
	.full-layer__content(@click.stop="")
		slot
</template>
