function GliBookUtil() {
  this.bookDirectory = null
  this.fileTransfer = null
  this.file = null
  this.fileSystem = null
  this.initPromise = this.init()
}

GliBookUtil.prototype.init = function() {
  var that = this
  return new Promise(function(resolve, reject) {
    document.addEventListener(
      'deviceready',
      function() {
        that.fileTransfer = new FileTransfer()
        that.file = cordova.file
        that.bookDirectory =
          that.file.externalDataDirectory || that.file.dataDirectory
        window.resolveLocalFileSystemURL(
          that.bookDirectory,
          function(dirEntry) {
            that.fileSystem = dirEntry.filesystem
            resolve()
          },
          function(err) {
            err = err || new Error('文件系统获取失败')
            console.error(err)
            reject(err)
          }
        )
      },
      false
    )
  })
}

GliBookUtil.prototype.isDownloaded = function(files, vrDownJson = []) {
  var that = this
  return this.initPromise.then(function() {
    var message = {
      downLoadArray: [],
    }
    var promise = Promise.resolve(message)
    for (var i = 0; i < files.length; i++) {
      ;(function(i) {
        promise = promise.then(message => {
          return new Promise(function(resolve, reject) {
            var filename = files[i].split('/files/')[1]
            that.fileSystem.root.getFile(
              filename,
              { create: false },
              function(fileEntry) {
                console.log(fileEntry.toURL())
                if (!vrDownJson.files && vrDownJson.files.includes(filename)) {
                  message['downLoadArray'].push(files[i])
                }
                resolve(message)
              },
              function() {
                message['downLoadArray'].push(files[i])
                resolve(message)
              },
              function(err) {
                err = err || new Error('文件信息获取失败')
                console.error(err)
                reject(err)
              }
            )
          })
        })
      })(i)
    }
    return promise
  })
}

GliBookUtil.prototype.download = function(files, callback) {
  var that = this
  var _progress = null
  return this.initPromise.then(function() {
    var promise = Promise.resolve()
    if (files.length == 1) {
      that.fileTransfer.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
          let progress = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          if (_progress !== progress) {
            _progress = progress
            callback({ progress: progressEvent.loaded / progressEvent.total })
          }
        } else {
          callback({ progress: 1, file: files[0].split('/files/')[1] })
        }
      }
    }
    for (var i = 0; i < files.length; i++) {
      ;(function(i) {
        promise = promise.then(() => {
          return new Promise(function(resolve, reject) {
            var from = files[i]
            var to = that.bookDirectory + files[i].split('/files/')[1]
            console.log(from, to)
            that.fileTransfer.download(
              from,
              to,
              function(entry) {
                console.log('download complete: ' + entry.toURL())
                callback({
                  progress: (i + 1) / files.length,
                  file: files[i].split('/files/')[1],
                })
                resolve()
              },
              function(error) {
                console.error(error)
                reject(error)
              },
              false
            )
          })
        })
      })(i)
    }
    return promise
  })
}

GliBookUtil.prototype.openAR = function(filename) {
  var filePath = this.bookDirectory + filename
  try {
    gli.cordova.DiscovCallService.launch(filePath)
  } catch (e) {
    console.error(e)
    alert('AR 启动失败')
  }
}

// var filename = 'gt.unity3d'
// var gliBookUtil = new GliBookUtil({
// downloadUrl: 'http://192.168.1.103:5000'
// })
// gliBookUtil.isDownloaded(filename).then(function (existing) {
// if (!existing) {
// console.log('downloading...')
// return gliBookUtil.download(filename)
// }
// }).then(function(){
// console.log('open')
// return gliBookUtil.openAR(filename)
// }).catch(console.error)
