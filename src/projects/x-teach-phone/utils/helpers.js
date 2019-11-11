export function isNumber(num) {
  return typeof num === 'number' && !Number.isNaN(num)
}

export function isString(str) {
  return typeof str === 'string'
}

export function isArray(array) {
  return Array.isArray(array)
}
export function isBool(value) {
  return typeof value === "boolean"
}
export function notEmptyObj(obj) {
  for (let name in obj) {
    return true
  }
  return false
}

export function effectiveValues(obj) {
  let result = {}
  for (let key in obj) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }
  return result
}

export function debounce(fn, delay = 400) {
  let timer
  return function (...args) {
    let context = this
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}