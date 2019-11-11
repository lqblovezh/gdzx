<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {},
  computed: {
    ...mapState({
      list: state => state.course.clazzList,
    }),
    ...mapGetters(['cartList', 'totalCart']),

    currActive() {
      return this.$route.path
    },
  },
  methods: {
    btnsClickHandler(item) {
      if (!this.$isUser()) return
      this.$prompt('请输入授权码', '加入班级', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          return this.$service.clazz
            .addClazz({ id: item.id, code: value })
            .then(res => {
              this.$message.success('加入成功!')
              location.reload()
              // this.$emit('success')
            })
            .catch(() => {
              this.$message.error('授权码已过期!')
            })
        })
        .catch(() => {})
    },
  },
}
</script>


<template lang="pug">
.comp-add-course-dialog
  .wrap  
    table.table( )
      thead 
        tr 
          th 班级名称
          //- th 教师名称
          th 操作
      tbody 
        tr(v-for="item in list"  :key="item.id") 
          td 
            .div {{item.class_name}}    
          //- td
            .div  {{item.class_name}}  
          td
            .btns.c_theme.f14(@click="btnsClickHandler(item,$event)")
              span 加入

</template>


<style lang="stylus"></style>
