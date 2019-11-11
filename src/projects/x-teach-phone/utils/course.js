/**
 * 通过资源b_id查询资源所在课时、计划等信息
 * @param  {[type]} obj  [description]
 * @param  {[type]} b_id [description]
 * @return {[type]}      [description]
 */
export function getRelatedRescourse(course, b_id) {
  const result = {
    ids: {},
    data: null
  }
  course.course_period_list && course.course_period_list.forEach(cpl => {
    cpl.teaching_plan && cpl.teaching_plan.forEach(tp => {
      tp.teaching_plan_info && tp.teaching_plan_info.forEach(tpi => {
        if (tpi.b_id === b_id) {
          result.ids = {
            course_id: course.id,
            course_hour_id: cpl.id,
            course_plan_id: tp.id,
            course_plan_info_id: tpi.id
          }
          result.data = tpi
        }
      })
    })
  })
  return result
}