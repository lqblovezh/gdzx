<script>
import { Progress } from 'element-ui'

export default {
  props: {
    type: {
      default: 'line',
    },
    percentage: {
      default: 0,
    },
    width: {
      default: 126,
    },
    status: {
      default: null,
    },
    strokeWidth: {
      default: 6,
    },
    color: {
      default: '',
    },
    showText: {
      default: true,
    },
  },
  components: { Progress },
}
</script>


<template lang="pug">
  div 
    el-progress(
      :type="type"
      :width="width"
      :percentage="percentage"
      :status="status"
      :strokeWidth="strokeWidth"
      :color="color"
      :showText="showText"
      )
</template>
