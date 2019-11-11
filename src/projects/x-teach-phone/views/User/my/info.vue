<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getTask } from 'services/common'
import { isEmptyObj } from '@/utils/algorithm'
export default {
  data() {
    return {
      haschanged: false,
      schoolEdit: false, // 学校可编辑
      collegeEdit: false, // 学院可编辑
      updateInfo: {},
    }
  },
  computed: {
    ...mapGetters('user', ['info']),
    hasChange() {
      return !isEmptyObj(this.updateInfo)
    },
    school: {
      set(value) {
        value === this.info.school
          ? this.$delete(this.updateInfo, 'school')
          : this.$set(this.updateInfo, 'school', value)
      },
      get() {
        return this.schoolEdit ? this.updateInfo.school : this.info.school
      },
    },
    college: {
      set(value) {
        value === this.info.college
          ? this.$delete(this.updateInfo, 'college')
          : this.$set(this.updateInfo, 'college', value)
      },
      get() {
        return this.collegeEdit ? this.updateInfo.college : this.info.college
      },
    },
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    selectSex() {
      let column = [
        { text: '男', value: 'male' },
        { text: '女', value: 'female' },
        { text: '保密', value: 'default' },
      ]
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '性别选择',
          data: [column],
          onSelect: this.sexChangeHandler,
        })
      }
      this.picker.show()
    },
    sexChangeHandler(val, index, text) {
      const [sex] = text
      if (sex !== this.info.sex) {
        this.$set(this.updateInfo, 'sex', sex)
      } else {
        this.$delete(this.updateInfo, 'sex')
      }
    },
    previewImg(evt) {
      let file = evt.target.files[0]
      let url = URL.createObjectURL(file)
      this.$set(this.updateInfo, 'picture_absolute', url)
    },
    edit(status, mdom) {
      this[status] = true
      this.$set(this.updateInfo, mdom, this.info[mdom])
      console.log(this.updateInfo, 11111111)
      this.$nextTick(() => {
        this.$refs[mdom].focus()
      })
    },
    blur(status, mdom) {
      this[status] = false
    },
    async save() {
      const pic = this.$refs.camera.files[0]
      try {
        if (pic) {
          await getTask(pic).then(res => {
            this.updateInfo.picture = res.data.path
          })
        }
      } catch (e) {
        throw new Error('图片更新失败')
      }
      this.$service.user
        .changeUserInfo({ ...this.updateInfo })
        .then(res => {
          this.$Toast({
            message: '修改成功',
            iconClass: 'icon-toast icon-success',
          })
          this.updateInfo = {}
          this.setUserInfo(res.data)
        })
        .catch(console.warn)
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="个人资料" :main-type="1" class="user-info")
  template(#right)
    p.f14.c-f(@click="save" v-show="hasChange") 保存
  .info-menu
    .container.c-bg-f
      .info-item(@click="$go('infoUpdate')")
        p 账户与安全
        p.ell {{info.name}}
          span.icon-small.icon-enter
      .info-item(@click="$refs.camera.click()")
        p 头像
        p
          img(:src="updateInfo.picture_absolute || info.picture_absolute")
          span.icon-small.icon-enter
        input(type="file" ref="camera" @change="previewImg($event)" accept="image/*" capture="camera")
      .info-item(@click="$go('updateNickName')")
        p 昵称
        p {{info.nick_name}}
          span.icon-small.icon-enter
      .info-item.noBorder(@click="selectSex")
        p 性别
        p {{ updateInfo.sex || info.sex }}
          span.icon-small.icon-enter
      .line-part
      .info-item(@click="edit('schoolEdit', 'school')")
        p 学校
        p(v-show="!schoolEdit") {{school}}
          span.icon-small.icon-enter
        input(v-show="schoolEdit" v-model="school" @blur="blur('schoolEdit', 'school')" ref="school")
      .info-item(@click="edit('collegeEdit', 'college')")
        p 学院
        p(v-show="!collegeEdit") {{college}}
          span.icon-small.icon-enter
        input(v-show="collegeEdit" v-model="college" @blur="blur('collegeEdit', 'college')" ref="college")
</template>
<style lang="stylus" scoped>
.info-menu
  background-color #fff
  padding-bottom .2rem
  img
    margin-top 0.17rem
    width 0.66rem
    height 0.66rem
    border-radius 50%
input[type='file']
  display none
.info-item
  p
    &:last-child
      max-width 50%
  &.noBorder
    border none
</style>
