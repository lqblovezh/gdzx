import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

import pathToRegexp from 'path-to-regexp'

/**
 * 前台搜索
 * @param  {[String]} data.name   搜索类容
 * @param  {[String]} data.type   1,2  1课程，2教师
 * @param {[String]} data.effective_status 1推搪 2自学 3公开
 * @param {[String]} data.university_id 院校id
 * @param {[String]} class_id 分类id
 */
export function search(data = {}) {
  return request_get('/api/home/courses_search', data)
}
/**
 * 热门搜索列表
 * @return {[Promise]}
 */
export function searchHot(data = {}) {
  return request_get('/api/home/courses_popu_search', data)
}

// function search(data = {}) {
//   return request_get('/api/home/courses_search', data)
// }

/**
 * 获取热门搜索
 */
export function getHotSearchList(data = {}) {
  return request_get('/api/home/courses_popu_search', data)
}
