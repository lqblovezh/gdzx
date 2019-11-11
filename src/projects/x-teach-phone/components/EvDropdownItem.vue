<script>
export default {
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    hide (skipTrans) {
      this.show = false
      if (skipTrans) {
        // ...
      }
    }
  },
  render() {
    const { offset } = this.$parent
    const Options = this.options.map(option => {
      const active = option.value === this.value
      return (
        <li
          class={["ev-select-option", { 'active': active}]}
          key={option.value}
          onClick={() => {
            if (option.value !== this.value) {
              this.$emit('input', option.value)
              this.toggle()
              this.$emit('change', option.id)
            }
          }}
        >
          {option.text}
        </li>
      )
    })
    const style = {
      zIndex: 100,
      position: "fixed",
      top: `${offset}px`,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: "hidden"
    }
    return (
      <div
        v-show={this.show}
        class="ev-dropdown-item"
        style={style}
      >
        <transition name="fade-out">
          <div
            class="ev-dropdown-overlay"
            v-show={this.show}
            onClick={() => {
              this.toggle()
            }}
          ></div>
        </transition>
        <transition
          name="slide-down"
        >
          <ul v-show={this.show} class="ev-dropdown-box">{ Options }</ul>
        </transition>
      </div>
    )
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/mixin.styl";
  @import "~@/assets/css/var.styl";
  .ev-dropdown-overlay, .ev-dropdown-box
    position absolute
    top 0
  .ev-dropdown-overlay
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .3)
    z-index 1064
  .ev-dropdown-box
    width 100%
    padding 0 $layout-padding
    box-sizing border-box
    background-color #fff
    z-index 1065
    li
      height 0.8rem
      line-height 0.8rem
      &.active
        color $theme-color
      &:not(:last-child)
        border-1px(bottom)
</style>