import { getTask } from 'services/common'
const uploadPic = {
  data () {
    return {
      img_url: null
    }
  },
  methods: {
    previewImg (evt) {
      let file = evt.target.files[0]
      let url = URL.createObjectURL(file)
      this.img_url = url
    },
    async uploadImg () {
      const pic = this.$refs.myInput.files[0]
      try {
        if (pic) {
          const { data } = await getTask(pic)
          return data
        }
      } catch (e) {
        throw new Error('图片更新失败')
      }
    },
    removeImg() {
      this.img_url = null
    }
  }
}

module.exports = { uploadPic }
