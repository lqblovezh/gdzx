import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 积分商城列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function getList(data = {}) {
  switch (data.type) {
    case 'books':
      return request_get('/api/p_book_front', data)
      break
    case 'resources':
      return request_get('/api/resources_front', data)
      break
    default:
      return request_get('/api/intearal/all_front', data)
      break
  }
}

/**
 * 积分兑换
 * @param  {Object} data
 * @param  {[String]} data.id          [description]
 * @return {[Promise]}                 [description]
 */
export function exchange(data = {}) {
  data._id = data.id
  switch (data.type) {
    case 'books':
    case 'pod_book':
      return request_post('/api/p_book/exchange', data)
      break
    case 'resources':
      return request_post('/api/resources/exchange', data)
      break
    default:
      return request_post('/api/intearal/change', data)
      break
  }
}

/**
 * 我的积分商城列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function MyList(data = {}) {
  return request_get('/api/intearal/coupon', data)
}

/**
 * 个人中心积分物品
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function integral(data = {}) {
  return request_get('/api/intearal/integral_items', data)
}
