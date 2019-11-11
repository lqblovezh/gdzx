import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';


//报名应用


/**
 * 获取报名列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.create_time - 选填 创建时间
 * @param {String} data.update_time - 选填 结束时间
 * @param {String} data.status - 选填 状态
 * @param {String} data.pageStart 
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data){
	return request_get('/api/sign_up',data)
}


 //添加报名
 /**
	* 添加报名
	* @param {Object} data
	* @param {String} data.name - 选填 名称
	* @param {String} data.style - 选填 模板
  */
export function add(data = {}){
	return request_post('/api/sign_up',data)
}

 //删除报名
 /**
	* 添加报名
	* @param {Object} data
	* @param {Array} data.id - 报名ids
  */
 export function del(...ids){
	 let data = {
		 id: ids
	 }
	return request_post('/api/sign_up/delete', data)
}


 //获取报名列表
 /**
	* @param {Object} data
  */
 export function applyList({id,...data}){
 	  return request_get(`/api/sign_up/record/${id}`, data)
}
