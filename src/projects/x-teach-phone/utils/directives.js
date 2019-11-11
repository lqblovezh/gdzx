import {isNumber} from './helpers'
const more = {
  inserted(el, binding) {
    const { line = 1, classPrefix } = binding.value,
      lineHeight = parseFloat(getComputedStyle(el)['line-height']),
      totalHeight = el.offsetHeight
    if (typeof classPrefix !== 'string') {
      throw new Error('请输入一个字符串类型的 "classPrefix"')
    }
    if (totalHeight > lineHeight * line) {
      el.classList.add(`${classPrefix}${line}`)
    }
  }
}

export default {
  more
}