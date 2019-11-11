import { isNumber } from './helpers'
function dolar(value) {
  if (isNumber(value)) {
    return `￥${value.toFixed(2)}`
  }
  return `￥${value}`
}
export default {
  dolar
}