import UiDialog from '@/components/Dialog'

let dialog = {}

dialog.install = function (Vue, options) {
	if (Vue.prototype.$isServer) return;
	const DialogConstructor = Vue.extend(UiDialog)
	const instance = new DialogConstructor()

	instance.$mount(document.createElement('div'))
	document.body.appendChild(instance.$el)

	Vue.prototype.$UIDialog = function (msg) {
		let dialog_opt = {}
		if (typeof msg === 'string' && msg.length) {
			dialog_opt.message = msg
		} else if (Object.prototype.toString.call(msg) === '[object Object]') {
			dialog_opt = msg
		} else {
			throw new Error("请输入正确的参数！")
		}
		instance.message = dialog_opt.message
		return new Promise((resolve, reject) => {
			instance.showDialog({ duration: dialog_opt.duration, resolve, reject})
		})
	}
}
export default dialog