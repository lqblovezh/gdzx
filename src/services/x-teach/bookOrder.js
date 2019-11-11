import * as $ from '../common/request'

/**
 * @description 纸书订单列表
 * @param {Object} data
 * @param {String} data.title 纸书订单名称
 * @param {String} data.start_time 开始时间
 * @param {String} data.end_time 结束时间
 * @param {String} data.type //system_message','answering_question','private_message','leave_word
 * @param {String} data.user_id
 */
export function getList(data) {
  return $.request_get('/api/p_book/order_list', data)
}

/**
 * 编辑发货状态
 * @param {Object} data
 * @param {String} data.state  true，false  默认true
 */
export function edit({ id, ...data } = {}) {
  return $.request_put(`api/p_book/edit_state/${id}`, data)
}

/**
 * 修改备注
 * @param {Object} data
 * @param {String} data.remarks  备注信息
 */
export function save({ id, ...data } = {}) {
  return $.request_put(`api/p_book/edit_remarks/${id}`, data)
}

/**
 * 导出
 * @param {Object} data
 * @param {String} data.class_id - 必有字段 班级id
 */
export function educe(data = {}) {
  return $.request_get('/api/p_book/order_list/export', data)
}
