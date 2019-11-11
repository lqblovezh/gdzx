import Schema from 'validate'

const phoneInfo = new Schema({
  phone: {
    type: Number,
    length: 11,
    message: {
      type: "手机号码格式不正确",
      length: "手机号码长度应为11位"
    }
  }
})

export function validatePhone(phonedate) {
  return phoneInfo.validate(phonedate)
}