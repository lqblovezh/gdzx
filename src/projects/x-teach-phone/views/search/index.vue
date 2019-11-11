<script>
import { mapState } from 'vuex'
import SearchHead from './comp/SearchHead'
export default {
	components: {
		SearchHead,
	}
}
</script>
<template lang="pug">
.search
	SearchHead
	router-view
</template>