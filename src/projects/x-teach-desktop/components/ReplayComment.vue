<script>
export default {
  props: {
    name: {
      default: 'you',
    },
    toName: {
      default: 'toname',
    },
    imgUrl: {
      default:
        'http://img20.360buyimg.com/da/jfs/t1/10711/29/1406/175826/5bddbc89Ee3205f5c/47702a52efff38ad.gif',
    },
    time: {
      default: '',
    },
    comment: {
      default: '',
    },
    commentNum: {
      default: 0,
    },
    isShowCommentNum: {
      default: false,
    },
    isLike: {
      default: false,
    },
    likeNum: {
      default: 0,
    },
    isLikeShow: {
      default: true,
    },
    isCommentShow: {
      default: true,
    },
  },
}
</script>
<template lang="pug">
  .comp-replay-item 
    .wrap 
      .img.ib 
        img(:src="imgUrl")
      .section.f14.ib.vt
        .name.c_theme 
          span.f16 {{name}} 
          span.time.c_8.fr {{time}}
        .val.c_6  {{comment}}
        .btns.c_9.fr
          .comment.ib.cp.ml15( v-if="isCommentShow"  @click="$emit('replay')") 
            .icon.icon-comment
            span ({{commentNum}})
          .commit.ib.cp.ml15(v-if="isLikeShow" @click="$emit('like')" ) 
            .icon(:class="isLike ? 'icon-like' : 'icon-like-white'  ")
            span(:class="isLike ? 'c_theme' : ''  ") ({{likeNum}})
</template>
<style lang="stylus">
.comp-replay-item
  >.wrap
    >.img
      width 50px
      height 50px
      >img
        width 100%
        height 100%
        border-radius 50%
    >.section
      margin-left 15px
      line-height 30px
      width calc(100% - 70px)
</style>
