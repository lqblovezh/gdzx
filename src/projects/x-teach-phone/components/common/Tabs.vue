<template lang="pug">
.tab
  cube-tab-bar(
    useTransition
    showSlider
    v-model="selectedLabel"
    :data="tabs"
    ref="tabBar"
    class="tab-bar"
  )
  .slide-wrapper
    cube-slide(
      :loop="false"
      :auto-play="false"
      :show-dots="false"
      :initial-index="index"
      :options="slideOptions"
      ref="slide"
      @scroll="onScroll"
      @change="onChange"
    )
      cube-slide-item(
        v-for="(tab, index) in tabs"
        :key="index"
      )
        component(
          ref="component"
          :is="tab.component"
          :data="tab.data"
          :label="selectedLabel"
          @scroll="(newY) => $emit('scroll',newY)"
        )
</template>
<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      },
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0,
      },
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })
      },
    },
  },
  mounted() {
    this.onChange(this.initialIndex)
  },
  methods: {
    onScroll(pos) {},
    onChange(current) {
      this.index = current
      const instance = this.$refs.component[current]
      if (instance && instance.fetch) {
        instance.fetch(true)
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/var.styl'
@import '~@/assets/css/mixin.styl'

.tab
  display flex
  flex-direction column
  height 100%
  >>> .cube-tab-bar
    border-1px(bottom, #F0F0F0)
  >>> .cube-tab_active
    color $theme-color
  >>> .cube-tab-bar-slider
    background-color $theme-color
  .slide-wrapper
    flex 1
    overflow hidden
</style>
