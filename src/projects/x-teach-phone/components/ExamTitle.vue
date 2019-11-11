<script>
const IMG_RE = /<img.+\/>/g
export default {
  name: 'topic-title',
  props: {
    type: String,
    content: {
      type: String,
      default: ''
    },
    score: {},
    idx: {}
  },
  render () {
    let imgs = this.content.match(IMG_RE)
    let content = this.content.replace(/<[^>]+>/g, '')
    const IMGS = imgs && imgs.length && imgs.map(img => (
      <div class="exam-question-img" domPropsInnerHTML={img}></div>
    ))
    let idx = this.idx && `${this.idx}.`
    return (
      <div class="exam-question c-3">
        <span class="type">{idx}【{this.type}】</span>
        <span domPropsInnerHTML={content}></span>
        <span class="f14 c-6">（{this.score}分）</span>
        {imgs && IMGS}
      </div>
    )
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .exam-question
    line-height 1.5
    .type
      color $text-color-b
    img
      max-height 2.4rem
</style>
