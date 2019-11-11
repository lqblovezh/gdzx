const path = require('path')

const cloud_projects = '../../../../x-book4-cloud/js/src/projects'

module.exports = [
  {
    title: 'X-BOOK 管理系统 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'system'),
    type: 'system',
    admin: true,
    design: 'desktop',
    ssr: true,
    outPath: '_system/admin'
  },
  {
    title: 'X-BOOK 官网首页 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'system-desktop'),
    type: 'system',
    admin: false,
    design: 'desktop',
    ssr: true,
    outPath: '_system/home'
  },
  {
    title: '管理系统登录界面',
    projectPath: path.join(__dirname, 'home'),
    type: '',
    design: 'desktop',
    admin: true,
    ssr: true,
    outPath: '_static/:subApp/admin_login'
  },
  {
    title: 'X-SYSTEM 管理系统',
    projectPath: path.join(__dirname, 'x-system-mgr'),
    type: 'common',
    design: 'desktop',
    admin: true,
    ssr: true,
    outPath: '_static/:subApp/common/admin'
  },
  {
    title: 'X-PUBLISH 管理系统',
    projectPath: path.join(__dirname, 'x-publish-mgr'),
    type: 'publish',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/publish/admin'
  },
  {
    title: 'X-PUBLISH 书籍预览',
    projectPath: path.join(__dirname, 'x-publish-desktop'),
    type: 'publish',
    design: 'desktop',
    admin: false,
    ssr: false,
    outPath: '_static/:subApp/publish/home'
  },
  {
    title: 'X-READ 管理系统 (移动版/外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-mgr-phone'),
    type: 'read',
    design: 'phone',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/read/admin_h5'
  },
  {
    title: 'X-READ 管理系统 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-mgr'),
    type: 'read',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/read/admin'
  },
  {
    title: 'X-READ 门户网站 (移动版/外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-phone'),
    type: 'read',
    design: 'phone',
    admin: false,
    ssr: false,
    outPath: '_static/:subApp/read/home'
  },
  {
    title: 'X-TEACH 管理系统 (西南交大)',
    projectPath: path.join(__dirname, 'x-teach-mgr'),
    type: 'teach',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/teach/admin'
  },
  {
    title: 'X-TEACH 门户网站 (西南交大)',
    projectPath: path.join(__dirname, 'x-teach-desktop'),
    type: 'teach',
    design: 'desktop',
    admin: false,
    ssr: true,
    outPath: '_static/:subApp/teach/home'
  },
  {
    title: 'X-TEACH 门户网站 (西南交大/移动版)',
    projectPath: path.join(__dirname, 'x-teach-phone'),
    type: 'teach',
    design: 'phone',
    admin: false,
    ssr: true,
    outPath: '_static/:subApp/teach/home_h5'
  },
  {
    title: 'X-TEACH 手机应用 (西南交大/Cordova)',
    projectPath: path.join(__dirname, 'x-teach-phone'),
    type: 'teach',
    design: 'phone',
    admin: false,
    ssr: false,
    spa: true,
    // outPath: path.join(__dirname, '../../../../app/xteach/platforms/android/app/src/main/assets/www')
    outPath: path.join(__dirname, '../../../../app/xteach/www')
  },
  {
    title: 'X-QRCODE 管理系统 (西南交大)',
    projectPath: path.join(__dirname, 'x-qrcode-mgr'),
    type: 'qrcode',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/qrcode/admin',
  },
  {
    title: 'X-QRCODE 门户网站 (西南交大)',
    projectPath: path.join(__dirname, 'x-qrcode-phone'),
    type: 'qrcode',
    design: 'phone',
    admin: false,
    ssr: false,
    outPath: '_static/:subApp/qrcode/home_h5',
  },
]
