<script>
import { mapState } from 'vuex'

export default {
  beforeCreate() {},
  async created() {},
  mounted() {
    // mounted 比 created 后触发, 不是意味着created 全部执行完后, 再执行mounted
    // created 执行遇到异步操作, 会立即执行mounted, 异步操作完成, 再反过来执行之后的代码
    // 本质是  源码没有 await created  然后再  mounted
  },
  data() {
    return {
      list: [],
      openIndex: false,
      test: '',
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryListTop,
      likeList: state => state.home.likeList,
      relevantList: state => state.home.relevantList,
      homeCommend: state => state.home.homeCommend,
    }),
  },
  methods: {
    openRight(index) {
      this.openIndex = index
    },
    closeRight() {
      this.openIndex = false
    },
    go(item) {
      this.$go('/category', { id: item.id })
    },
  },
}
</script>

<template lang="pug"> 
.home-menu
  .wrap 
    .item(v-for="item,index in categoryList"
      :key="item.id"  
      )
      //- v-if="index < 5"
      //- @mouseenter="openRight(index)" 
      //- @mouseleave="closeRight"  
      .inner.cp( @click="go(item)" ) {{item.name}}
      .right.bbox(v-show="index === openIndex") 
        .wrap.ib 
          .item.ib.f16.active_normal(
            v-for="citem in item.children"
            @click="go(citem)"
          ) {{citem.name}}
</template>

<style lang="stylus">
.home-menu
  background #fff
  >.wrap
    position relative
    box-sizing border-box
    >.item
      height 50px
      line-height @height
      box-sizing border-box
      padding 0 25px
      box-sizing border-box
      display inline-block
      &:last-child
        .inner
          border none
      &:hover
        color #fff
        background #309fc3
      >.right
        width 400px
        height 100%
        position absolute
        left 100%
        top 0
        background #fff
        z-index 2
        border solid 1px #e6e6e6
        color #2d4148
        cursor normal
        >.wrap
          >.item
            padding 0 20px 0px 10px
</style>
