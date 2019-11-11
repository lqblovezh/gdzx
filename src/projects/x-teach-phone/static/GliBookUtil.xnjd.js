function GliBookUtil(opts) {
  this.downloadUrl = opts.downloadUrl
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

GliBookUtil.prototype.isDownloaded = function(filename) {
  var that = this
  return this.initPromise.then(function() {
    return new Promise(function(resolve, reject) {
      that.fileSystem.root.getFile(
        filename,
        { create: false },
        function(fileEntry) {
          console.log(fileEntry.toURL())
          resolve(true)
        },
        function() {
          resolve(false)
        },
        function(err) {
          err = err || new Error('文件信息获取失败')
          console.error(err)
          reject(err)
        }
      )
    })
  })
}

GliBookUtil.prototype.download = function(filename, onProgress) {
  var that = this
  var _progress = null
  return this.initPromise.then(function() {
    return new Promise(function(resolve, reject) {
      if (onProgress) {
        that.fileTransfer.onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            let progress = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            )
            if (_progress !== progress) {
              _progress = progress
              onProgress(progressEvent.loaded / progressEvent.total)
            }
          } else {
            onProgress(1)
          }
        }
      }
      const from = that.downloadUrl + '/' + filename
      const to = that.bookDirectory + filename
      console.log(from, to)
      that.fileTransfer.download(
        from,
        to,
        function(entry) {
          console.log('download complete: ' + entry.toURL())
          resolve(entry.toURL())
        },
        function(error) {
          console.error(error)
          reject(error)
        },
        false
      )
    })
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
