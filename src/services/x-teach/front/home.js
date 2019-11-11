import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 首页轮播图
 */
export function getBanners(data = {}) {
  return request_get('/api/setting/position/banner_mobile', data)
}

/**
 * 获取首页like
 * @param  {Object} data [description]
 * @return {[Promise]}      [description]
 */
export function getLikeLists(data = {}) {
  return request_get('/api/recommend/like', data)
}

/**
 *  @param  {string} data.type  banner_pc   banner_mobile  bottom
 */
export function getHomeSettings(data = {}) {
  return request_get(`/api/setting/position/${data.type}`)
}
/**
 * 获取应用信息
 * @return {[type]} [description]
 */
export function getConfig(data = {}) {
  return request_get('/api/current', data).then(res => {
    const { publisher, application } = res.data
    if (!data.isNoTitle) {
      // document.title = publisher.name + '-' + application.name
      document.title = application.name // 修改应用title
    }
    return res
  })
}

/**
 * 排行
 * @return {[type]} [description]
 */
export function getRank(data = {}) {
  return request_get('/api/courses/ranking', data)
}

/**
 * 首页栏目
 * @return {[type]} [description]
 */
export function getColumnList(data = {}) {
  return request_get('/api/home/recommend', data)
}