export function toast_err(e, msg = '操作失败') {
	const {
		errors,
		message
	} = e.payload
	this.$dialog.toast({
		mes: errors[0] || message || msg,
		timeout: 1500,
		icon: 'error'
	})
}

export function check_form(e) {
	if (e.length) {
		let error = e[0].toString().split(':')
		this.$dialog.toast({
			mes: (error.length && error[1].trim()) || '表单填写错误，请仔细检查',
			timeout: 1500,
			icon: 'error'
		})
		return false
	}
	return true
}