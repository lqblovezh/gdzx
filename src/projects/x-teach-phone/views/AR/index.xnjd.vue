<template lang="pug">
v-wrapper(title="AR" class="ar" :main-type="1")
  cube-scroll(
    ref="scroll"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullUp"
  )
    layout-grid
      .ar-item(
        v-for="item in list"
        :key="item.id"
      )
        div(@click="openOrDownload(item)")
          .ar-img.tc
            img(v-lazy="item.cover_absolute")
          .info
            .book.ell {{ item.name }}
            .author 作者：{{ item.author }}
            .isbn ISBN号：{{ item.isbn }}

  ev-overlay(v-model.sync="show")
    ev-prompt(
      @cancel-event="show=false"
      @confirm-event="confirm"
    )
      h2 提示
      p 请输入激活系列号，不区分大小写
      .inputBox
        input(v-model='inputPrompt.left')
        span.division  -
        input(v-model='inputPrompt.right')
  ev-overlay(v-model="dialogStatus")
    .progress.tc
      download-progress(:percent="download_percentage")
      //- .i-close(v-show="download_status")
</template>
<script>
import loadmoreMixin from '@/mixins/loadmore'
import EvPrompt from '@/components/common/Prompt'
import DownloadProgress from './children/download-progress'
import { mapState } from 'vuex'
import UserAgent from 'projects/common/util/express-useragent'
const { isiPhone } = new UserAgent().parse(navigator.userAgent)

export default {
  mixins: [loadmoreMixin],
  components: { DownloadProgress, EvPrompt },
  data() {
    return {
      show: false,
      dialogStatus: false,
      download_percentage: 0,
      download_status: false,
      options: {
        pullDownRefresh: {
          txt: '刷新成功',
        },
        click: true,
      },
      inputPrompt: {
        left: '',
        right: '',
      },
      currentItem: {},
    }
  },
  mounted() {
    this.fetch(true)
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    confirm() {
      let {
        res_uri_ios,
        res_uri_android,
        user_authorized,
        id,
      } = this.currentItem
      let res_uri = isiPhone ? res_uri_ios : res_uri_android
      let value = this.inputPrompt.left + '-' + this.inputPrompt.right
      this.$service.ar
        .checkARCode({ code: value, book_id: id })
        .then(res => {
          this.show = false
          this.readAr(res_uri)
        })
        .catch(({ message }) => {
          this.show = false
          this.$MessageBox.alert(message, '错误')
        })
    },
    queryList(params) {
      return this.$service.ar.queryARList({ ...params })
    },
    openOrDownload({
      res_uri_ios,
      res_uri_android,
      user_authorized,
      id,
      ...data
    }) {
      this.currentItem = {
        res_uri_ios,
        res_uri_android,
        user_authorized,
        id,
        ...data,
      }
      if (!this.userInfo) {
        return this.$router.push({ path: 'login' })
      }
      if (!window.cordova) {
        this.$MessageBox.alert('请在手机上查看', '提示')
        return
      }
      let res_uri = isiPhone ? res_uri_ios : res_uri_android
      if (!res_uri) {
        this.$MessageBox.alert('没有配置下载地址?', '提示')
        return
      }
      if (!user_authorized) {
        this.show = true
      } else {
        this.readAr(res_uri)
      }
    },
    download(filename, gliBook) {
      let vrJson = this.$getStorage('vrJson')
      let currentVersion = this.currentItem[
        isiPhone ? 'version_ios' : 'version_android'
      ]
      this.download_status = this.dialogStatus = true
      return gliBook
        .download(filename, progress => {
          console.log(progress)
          this.download_percentage = Math.floor(progress * 100)
        })
        .then(() => {
          vrJson[this.currentItem.id] = currentVersion
          this.$setStorage('vrJson', vrJson)
          return true
        })
        .then(() => true)
    },
    readAr(res_uri) {
      const index = res_uri.lastIndexOf('/')
      const downloadUrl = res_uri.substr(0, index)
      const filename = res_uri.substr(index + 1)
      const gliBook = new GliBookUtil({
        downloadUrl,
      })
      let vrJson = this.$getStorage('vrJson')
      let currentVersion = this.currentItem[
        isiPhone ? 'version_ios' : 'version_android'
      ] //当前文件版本
      let updateVersion = this.currentItem[
        isiPhone ? 'version_ios_update' : 'version_android_update'
      ] //是否强制更新
      gliBook
        .isDownloaded(filename)
        .then(existing => {
          if (!vrJson.hasOwnProperty(this.currentItem.id)) {
            return this.$MessageBox
              .confirm('是否下载资源')
              .then(res => {
                return this.download(filename, gliBook)
              })
              .catch(res => {
                return false
              })
          } else if (vrJson.hasOwnProperty(this.currentItem.id) && existing) {
            return true
          }
        })
        .then(ok => {
          if (!ok) {
            return false
          }
          if (
            vrJson.hasOwnProperty(this.currentItem.id) &&
            currentVersion !== vrJson[this.currentItem.id]
          ) {
            if (updateVersion) {
              return this.download(filename, gliBook)
            }
            return this.$MessageBox
              .confirm('是否更新资源')
              .then(res => {
                return this.download(filename, gliBook)
              })
              .catch(res => {
                return true
              })
          }
          return true
        })
        .then(ok => {
          this.download_status = this.dialogStatus = false
          if (ok) {
            return gliBook.openAR(filename)
          }
        })
        .catch(console.error)
    },
  },
}
</script>
<style lang="stylus" scoped>
.inputBox
  margin-top 0.3rem
  input
    border 1px solid #aaac
    height 0.5rem
    width 35%
  .division
    height 0.5rem
    line-height 0.5rem
    display inline-block
    margin 0 0.2rem
.ar
  .index-grid-layout
    margin-top 0.3rem
  &-item
    margin-bottom 0.3rem
    box-shadow 0 0 0.08rem rgba(0, 0, 0, 0.1)
    border-radius 0.1rem
    overflow hidden
    .ar-img
      background-color #dcdfe2
      img
        margin 0.14rem 0
        width 1.6rem
        height 2.27rem
    .info
      margin 0.2rem 0.16rem
      color #666
      font-size 12px
      .book
        font-size 14px
        color $text-color-4
      .author
        margin 0.2rem 0
  .progress
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    button
      padding 0.3rem
    .i-close
      margin-top 0.2rem
</style>
