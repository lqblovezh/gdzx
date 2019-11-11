export function findItem (key, jsonData) {
  return jsonData.filter(ele => {
    return ele.id === key || ele.children.some(e => e.id === key)
  })
}

export function isEmptyObj (obj) {
  for (let i in obj) {
    return false
  }
  return true
}
/**
 * 获取试题关联的资源信息
 * @param {Object} obj 
 * @param {Array} ids 
 */
export function getResource (obj, ids) {
  let result = {}
  obj && ids && ids.forEach((id) => {
    obj.forEach((keshi) => {
      keshi.teaching_plan.forEach((tp) => {
        tp.teaching_plan_info.forEach((tpi) => {
          if (tpi.b_id === id.b_id) {
            result[id.b_id] = tpi
          }
        })
      })
    })
  })
  return result
}

/**
 * 提取嵌套数组中的reply元素的内容到第一级reply元素中
 * @param {Array} arr
 * @param {String} key
 */
export function extract (arr, key = 'reply') {
  arr.forEach(item => {
    (function iter (pList) {
      pList.forEach(pItem => {
        if (isArray(pItem[key]) && pItem[key].length > 0) {
          iter(pItem[key])
        }
        pItem.layer > 2 && item[key].push(pItem)
      })
    })(item[key])

    // 时间排序
    item[key].sort((a, b) => {
      return Date.parse(b.create_time) - Date.parse(a.create_time)
    })
  })
}

/**
 * 获取当前资源信息
 * @param {Object} source 当前课程
 * @param {*} key 资源id
 */
export function getCurResource (source, key) {
  let obj = {
    ids: {},
    data: null
  }
  source.course_period_list && source.course_period_list.forEach(cpl => {
    cpl.teaching_plan && cpl.teaching_plan.forEach(tp => {
      tp.teaching_plan_info && tp.teaching_plan_info.forEach(tpi => {
        if (tpi.id === key) {
          obj.data = tpi
          obj.ids = {
            course_id: source.id,
            course_hour_id: cpl.id,
            course_plan_id: tp.id,
            course_plan_info_id: tpi.id
          }
        }
      })
    })
  })
  return obj
}
