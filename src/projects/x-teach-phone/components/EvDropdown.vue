<script>
export default {
  name: 'ev-dropdown',
  data () {
    return {
      offset: 0
    }
  },
  methods: {
    toggleItem(active) {
      const { menu } = this.$refs
      const rect = menu.getBoundingClientRect()
      this.offset = rect.bottom
      this.$children.forEach((item, index) => {
        if (index === active) {
          item.toggle()
        } else {
          item.hide()
        }
      })
    }
  },
  render (h, ctx) {
    const Titles = this.$slots.default.map((item, index) => (
      <div
        role="button"
        class={["ev-select--button", { 'active': item.data.show}]}
        onClick={() => {
          this.toggleItem(index)
        }}
      >
        <span>{item.data.model.value}</span>
      </div>
    ))
    return (
      <div ref="menu" class='ev-dropdown'>
        {Titles}
        {this.$slots.default}
      </div>
    )
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/mixin.styl";
  @import "~@/assets/css/var.styl";
  .ev-dropdown
    display inline-block
    padding 0.2rem 0.3rem
    position relative
    background-color #fff
    .ev-select--button
      display inline-block
      margin-right 0.2rem
      min-width 2.2rem
      padding 0.15rem 0.17rem
      justify-content space-between
      color #4d4d4d
      background-color #fff
      border-1px()
      &.active
        color $theme-color
        span
          &:after
            border-color transparent transparent $theme-color $theme-color
            transform rotate(135deg)
            top 0.30rem
      span
        &:after
          position absolute
          top 0.22rem
          right 0.17rem
          border 3px solid
          border-color transparent transparent #4d4d4d #4d4d4d
          transform rotate(-45deg)
          opacity 0.8
          content ''
</style>