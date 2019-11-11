import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let dpath = pathToRegexp.compile('/api/ar/models/:id')

/**
 * @description Ar列表
 * @param {Object} data
 * @param {String} data.id Arid
 */
export function getList(data) {
  return request_get('/api/ar/models', data)
}

/**
 * @description Ar课程列表
 * @param {Object} data
 * @param {String} data._id Arid
 */
export function getInfoList(data) {
  data._id = data._id || data.id
  return request_get(`/api/ar/models/${data._id}/codes`, data)
}

/**
 * @description Ar课程列表
 * @param {Object} data
 * @param {String} data._id Arid
 * @param {String} data.course_id 课程id
 */
export function infoAdd(data) {
  return request_post('/api/ar/models/importCodes', data)
}

/**
 * @description 新增或保存
 * @param {Object} data
 * @param {String} data.pid  父ID 顶级为0
 * @param {String} data.name 分类名称
 */
export function save(data) {
  if (data.id) {
    return request_put(dpath(data), data)
  }
  return request_post('/api/ar/models', data)
}

/**
 * 删除
 * @param {Object} data
 * @param {Array} data._ids
 */
export function del(data) {
  return request_post('/api/ar/models/delete', data)
}

/**
 * 详情
 * @param {Object} data
 * @param {Array} data._ids
 */
export function detail(data) {
  return request_get(dpath({ id: data.id }), data)
}

/**
 * Ar课程删除
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 */
export function infoDel(data = {}) {
  return request_post('/api/ar/codes/delete', data)
}

/**
 * Ar授权码修改
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 */
export function modify(data = {}) {
  return request_post('/api/ar/codes/save', data)
}
