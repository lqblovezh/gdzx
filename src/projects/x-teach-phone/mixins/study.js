import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState('course', ['info']),
    hour_list() {
      return this.info.course_period_list || []
    }
  },
  methods: {
    study(data) {
      const {
        period_info,
        teaching_plan_id: p_id,
        b_id
      } = data
      const {
        course_id: c_id
      } = this.$route.params
      const course_hour = this.hour_list.find(item => item.name === period_info)
      const plan = course_hour.teaching_plan.find(item => item.id === p_id)
      const resource = plan.teaching_plan_info.find(item => item.id === b_id)
      if (resource) {
        this.$goPlayer({
          type: resource.type,
          book_id: b_id,
          product_id: this.info.publish_id,
          c_id,
          h_id: course_hour.id,
          p_id: plan.id,
          r_id: resource.id
        })
      }
    }
  }
}
