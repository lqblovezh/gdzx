<script>
import localforage from 'localforage'
import * as readerService from 'services/common/reader'
import { mapGetters } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as dbiServices from 'services/x-read/dbi'

export default {
  name: 'Reader',
  mounted() {
    this.query = this.$route.query
    this.access_code = this.info.access_code
    this.init()
  },
  data() {
    return {
      access_code: '',
      isNav: true,
      query: {},
      isShowX: false,
      infoData: null,
      preChapterId: 0,
      curChapterId: 0,
    }
  },
  computed: {
    ...mapGetters('course', {
      get_info: 'resourse_info'
    }),
    info () {
      return this.get_info({ ...this.$route.query })
    }
  },
  methods: {
    getInfo() {
      return bookinfoServices.info(this.query)
    },
    getUserId() {
      if (sessionStorage.userInfo) {
        const userInfo = JSON.parse(sessionStorage.userInfo)
        return (userInfo && userInfo.id) || ''
      }
      return ''
    },
    closeNav() {
      this.isNav = false
    },
    openNav() {
      this.isNav = true
    },
    async init() {
      if (!reader3) return
      // this.declareOne(this.info.id, '阅读', this.info)
      let p = { id: this.query.id, type: 3 }
      let start = null
      if (this.query.range) {
        start = JSON.parse(this.query.range).start
      }

      // const validUser = !!this.getUserId()
      let chapterRid
      if (this.query.chapter_root) {
        chapterRid = this.query.chapter_root.split(' ')[1]
      } else {
        chapterRid = null
      }

      // let res = await this.getInfo()
      let reader = new reader3.Mobile({
        // restUrl: '/reader_api',
        restUrl: 'http://xcloud.kf.gli.cn/publish/reader',
        imagePath: '/res', // 内网
        services: {
          ...readerService,
          go_back: () => {
            reader.unmount()
            reader = null
            this.$router.go(-1)
          },
          request_full_screen: () => {
            this.isNav = false
          },
          exit_full_screen: () => {
            this.isNav = true
          },
          show_toast: message => {
            this.$Toast({
              message,
            })
          },
          show_confirm: text => {
            return this.$confirm(text)
              .then(res => {
                return true
              })
              .catch(console.log)
          },
          do_share: ({ bookId, bookName, chapterRid, chapterName }, app) => {
            // if (isWeixin()) {
            // } else {
            // }
          },
          action_control: (params, app) => {
            const { type, action } = params
            for (const { type, action } of params) {
              if (action == 'read' && (type == 'chapter' || type == 'section')) {
                this.$MessageBox.confirm('您还未购买该章节，前往购买？')
                  .then(res => {
                    if (this.$route.query.from !== undefined) {
                      const params = {
                        type: 'Read',
                        id: this.$route.query.id,
                        inType: 'Read'
                      }
                      this.$go('-1')
                    }
                    this.$router.go(-1)
                  })
                  .catch(() => {
                    if (this.$route.query.from !== undefined) {
                      this.$router.go(-1)
                    }
                    // const toPath = decodeURIComponent(this.$route.fullPath)
                    // const finalPath = toPath.replace(new RegExp('\\b' + this.curChapterId + '\\b', 'g'), this.preChapterId)
                    // this.$router.replace(finalPath)
                  })
                return false
              }
              return true
            }
          },
        },
        fontSize: {
          list: [
            { title: '小', value: '14px' },
            { title: '中', value: '16px' },
            { title: '大', value: '18px' },
            { title: '特大', value: '20px' },
          ],
          index: 0,
        },
        copyEnabled: true,
        // labelEnabled: validUser,
        fullScreenEnabled: !true,
        // bookmarkEnabled: validUser,
        searchEnabled: true,
        preloadEnabled: true,
        goBackEnabled: true,
        // userEnabled: true,
        toolBarActions: [
          // this.isShowX && { title: 'X一下', className: 'xBtn', service: 'goXknow', active: false },
        ].filter(item => item),
        defaultPageLayout: 'slide',
        defaultTextLayout: 'lr/auto',
        readModeList: [
          { title: '无', pageLayout: 'slide', textLayout: 'lr/static', scope: 'mobile' },
          { title: '分页', pageLayout: 'normal', textLayout: 'lr/auto' },
          { title: '平滑', pageLayout: 'slide', textLayout: 'lr/auto', scope: 'mobile' },
        ],
      })
      reader.emitter.on('updateURL', arg => {
        if (typeof arg.chapterRid == undefined) {
          return
        }
        const toPath = decodeURIComponent(this.$route.fullPath)
        let finalPath, chapterId
        if (this.$route.query.chapter_id === undefined) {
          chapterId = arg.chapterRid
          finalPath = toPath.replace('index=root', `index=root ${chapterId}`)
          finalPath = `${finalPath}&chapter_id=${chapterId}`
        } else {
          chapterId = this.$route.query.chapter_id
          finalPath = toPath.replace(new RegExp('\\b' + chapterId + '\\b', 'g'), arg.chapterRid)
        }
        this.preChapterId = chapterId
        this.curChapterId = arg.chapterRid
        this.$router.replace(finalPath)
      })

      reader.extraParams = {
        version: 'release',
        content_version: 'release',
        access_code: this.access_code,
        product_id: this.query.product_id,
        user_id: this.getUserId(),
        release_id: this.query.id,
      }
      setTimeout(() => {
        // 放这里有点不科学
        reader.mount(this.$refs.root, {
          bookId: this.query.book_id,
          // chapterRid: chapterRid || this.query.chapter_id,
          // chapterId: this.query.chapter_id,
          // range: JSON.parse(this.query.range || null),
        })
      }, 30)
    },
  },
}
</script>

<template lang="pug">
.div
  //- Head(:name="info.name" v-show="false" )
  .root(ref="root")
</template>

<style lang="stylus" scoped>
.root
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  width 100%
  user-select none
</style>
