<script>
export default {
  props: ['msg'],
  data () {
    return {}
  }
}
</script>
<template lang="pug">
.from.msg-dialog
  .img
    img(:src="msg.from_user_picture")
  .txt
    .time {{msg.create_time}}
    .bubble 
      p {{msg.content}}
</template>


