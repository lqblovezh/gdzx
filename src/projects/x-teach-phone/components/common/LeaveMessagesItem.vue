<template lang="pug">
.leave-messages-item.clearfix.f14
  .leave-messages-item--left
    img(v-lazy="item.from_user_picture")
  .leave-messages-item--right
    .leave-messages-item-content(
      @click="$emit('reply', item)"
      :class="{'border-bottom-1px': item.reply && item.reply.length }"
    )
      .name.c-3
        span {{ item.from_user_name }}
          i.i-tag-teacher(v-show="isTeacher || teacher_id === item.from_user_id")
        .ib(v-show="!isTeacher && item.layer > 1")
          .triangle
          span {{ item.to_user_name }}
            i.i-tag-teacher(v-show="teacher_id === item.to_user_id")
      .content {{ item.content }}
      .time.c-9.f12 {{ item.create_time }}
    .children
      slot
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    isTeacher: Boolean
  },
  computed: {
    teacher_id() {
      const { userId } = this.$route.query
      return userId
    }
  }
}
</script>
<style lang="stylus">
.leave-messages-item
  padding 0.33rem 0
  border-bottom 1px solid #e9eef0
  .border-bottom-1px
    border-bottom 1px solid #e9eef0
  &--left
    float left
    img
      margin-right 0.18rem
      width 0.74rem
      height 0.74rem
      border-radius 50%
  &--right
    overflow hidden
  &-content
    padding 0.1rem 0 0.24rem
    .name
      margin-bottom 0.2rem
      line-height 0.27rem
      .i-tag-teacher
        margin 0 0.1rem
      .triangle
        margin-top 0.04rem
        margin-right 0.06rem
        display inline-block
        width 0
        height 0
        border-left 0.16rem solid #cccccc
        border-top 0.1rem solid transparent
        border-bottom 0.1rem solid transparent
    .content
      color #4d4d4d
      line-height 1.5
    .time
      margin-top 0.5rem
</style>
