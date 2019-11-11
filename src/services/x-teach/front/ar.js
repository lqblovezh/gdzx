import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 获取AR列表
 * @param {Object} data
 */
export function queryARList(data = {}) {
  return request_get(`/api/ar/models`, data)
}

/**
 * 获取AR列表
 * @param {Object} data
 * @param {String} data.book_id -AR VR ID(列表返回的_id)
 * @param {String} data.code -AR 用户输入的授权码
 */
export function checkARCode(data = {}) {
  return request_post('/api/ar/check_codes', data)
}

/**
 * 获取AR下载列表
 * @param {Object} data
 * @param {String} data.id -AR ID(列表返回的_id)
 * @param {String} data.type -AR android or ios
 */
export function ArList(data = {}) {
  return request_get(`/api/ar/model_resource/${data.id}`, data)
}
