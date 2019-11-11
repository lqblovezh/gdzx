import localStorage from '@/utils/storage'
import urlJoin from 'url-join'

export function push(path, query = {}) {
  path = urlJoin(baseUrl, path)
  this.$router.push({ path, query })
}
export function goWithName(name, params = {}, query = {}) {
  // console.log(params)
  this.$router.push({ name, query, params })
}
export function replace(path, query = {}) {
  this.$router.replace({ path, query })
}
/**
 * 解析错误对象，执行回调
 */
export function catchError(error, show_toast = true) {
  let err_str = error.toString()
  if (error.message) {
    err_str = error.message
  } else {
    err_str = err_str.split('Error:')[1].trim()
  }
  show_toast &&
    this.$Toast({
      message: err_str,
      iconClass: 'i-failed',
    })
  return err_str
}

export function checkLogin() {
  try {
    if (this.$store.state.user.userInfo) {
      return true
    } else {
      this.$goWithName('login')
    }
  } catch (e) {
    this.$Toast({
      message: '未知错误',
    })
  }
}

/**
 * @deprecated
 * 使用上述两个方法进行跳转，废弃该方法
 */
export function go(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)
  this.$router.push(obj)
}

export function getRouteObj(path, query = {}, params = {}) {
  return {
    path: urlJoin(baseUrl, path),
    query,
    params,
  }
}

export function back() {
  let len = this.$store.state.historyRouteLength
  if (len < 2) {
    this.$go('/home')
    this.$store.state.historyRouteLength = 10000
  } else {
    this.$router.go(-1)
  }
  if (len > 2) {
    this.$store.state.historyRouteLength = len - 2
  }
}

export function XTMsg(content) {
  return new Promise(resolve => {
    this.$store.commit('common/toggleHeadMsg', {
      status: true,
      content,
    })
    setTimeout(() => {
      this.$store.commit('common/toggleHeadMsg', {
        status: false,
        content,
      })
      resolve()
    }, 2000)
  })
}

export function goByName(name, opts) {
  const { query = {}, params = {} } = opts
  this.$router.push({ name, query, params })
}

export function addWordToHistory(name) {
  let list = JSON.parse(localStorage.getItem('history_list')) || [],
    index = list.indexOf(name)
  if (index !== -1) {
    list.splice(index, 1)
  }
  if (list.length >= 20) {
    list.length = 19
  }
  list.unshift(name)
  localStorage.addItem('history_list', JSON.stringify(list))
}

/**
 * 将数字转为字符编码
 * @example i = 0 返回 A
 * @param  {[Number]} i 增加的数字
 * @return {[String]}   字符
 */
export function changeIntoCharCode(i) {
  return String.fromCharCode(65 + i)
}

export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

export function goCourse(course_id) {
  this.$router.push({ name: 'course', params: { course_id } })
}

export function goPlayer({ type, book_id, product_id, ...args }) {
  switch (type) {
    case 1:
      this.$goByName('reader', {
        query: {
          book_id,
          product_id,
          ...args,
        },
      })
      break
    case 3:
      this.$goByName('pic', { query: { ...args } })
      break
    case 4:
      this.$goByName('audio', { query: { ...args } })
      break
    case 5:
      this.$goByName('video', { query: { ...args } })
      break
  }
}

export function thirdLogin(type, callback) {
  switch (type) {
    case 'weixin_mp': //微信三方接入
      let scope = 'snsapi_userinfo',
        state = '_' + new Date()
      Wechat.auth(
        scope,
        state,
        function(response) {
          callback(response)
        },
        function(reason) {
          alert('Failed: ' + reason)
        }
      )
      break

    case 'qq_web': //QQ三方接入
      let args = {}
      args.client = QQSDK.ClientType.QQ //QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      QQSDK.ssoLogin(
        function(result) {
          callback(result)
        },
        function(failReason) {
          alert(failReason)
        },
        args
      )
      break
  }
}
/**
 * 三方分享
 */
export function thirdShare({ type, title, desc, img, url }, callback) {
  switch (type) {
    case 'weixin': //微信
    case 'pengyou': //微信朋友
      Wechat.share(
        {
          message: {
            title: title.length > 250 ? title.substr(0, 250) + '...' : title,
            description: desc.length > 500 ? desc.substr(0, 500) + '...' : desc,
            mediaTagName: 'String - 服务器通知路径 - 暂无用',
            thumb: img,
            media: {
              type: Wechat.Type.WEBPAGE, // webpage
              webpageUrl: url, // webpage address
            },
          },
          scene:
            type == 'weixin' ? Wechat.Scene.SESSION : Wechat.Scene.TIMELINE, // share to friends
        },
        function() {
          callback(type == 'weixin' ? '微信' : '微信朋友')
        },
        function(reason) {
          alert(reason)
        }
      )
      break
    case 'qq': //QQ
    case 'qzone': //QQ空间
      var args = {}
      args.url = url
      args.client = QQSDK.ClientType.QQ
      args.scene = type == 'qq' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone
      args.title = title.length > 25 ? title.substr(0, 25) + '...' : title //截取是根据qq分享插件官方规定
      args.description = desc.length > 35 ? desc.substr(0, 35) + '...' : desc
      args.image = img
      QQSDK.shareNews(
        function() {
          callback(type == 'qq' ? 'QQ' : 'QQ空间')
        },
        function(failReason) {
          alert(failReason)
        },
        args
      )
      break
    case 'xinlang': //新浪
      var args = {}
      args.url = url
      args.title = title.length > 25 ? title.substr(0, 25) + '...' : title //截取是根据新浪分享插件官方规定
      args.description = desc.length > 35 ? desc.substr(0, 35) + '...' : desc
      args.imageUrl = img
      args.defaultText = ''
      Weibo.shareToWeibo(
        function() {
          if (typeof callback == 'function') {
            callback('新浪微博')
          }
        },
        function(failReason) {
          console.log(failReason)
        },
        args
      )
      break
  }
}

export function getStorage(name) {
  if (!name) return false
  try {
    return JSON.parse(window.localStorage.getItem(name) || '{}')
  } catch (e) {
    return window.localStorage.getItem(name)
  }
}

export function setStorage(name, value) {
  if (!name) return false
  if (typeof value == 'object') {
    window.localStorage.setItem(name, JSON.stringify(value))
  } else {
    window.localStorage.setItem(name, value)
  }
}
