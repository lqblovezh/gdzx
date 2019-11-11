export function throttle(method, delay = 300, duration = 500) {
	let timer = null,
			begin = new Date()
	return function () {
		let context = this,
				args = arguments,
				current = new Date()
		clearTimeout(timer)
		if (current - begin >= duration) {
			method.apply(context, args)
			begin = current
		} else {
			timer = setTimeout(function () {
				method.apply(context, args)
			}, delay)
		}
	}
}