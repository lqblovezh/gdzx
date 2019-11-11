import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl, // 一切都要在baseUrl下面
        component: () => import('./Root.vue'),
        children: [
          {
            path: '/',
            redirect: 'home',
          },
          {
            name: 'home',
            path: 'home',
            component: () => import('./views/Home'),
            meta: {
              alive: true,
            },
          },
          {
            path: 'AR',
            component: () => import('./views/AR'),
          },
          {
            path: 'school',
            component: () => import('./views/School'),
            redirect: 'school/list',
            children: [
              {
                path: 'list',
                component: () => import('./views/School/list'),
              },
              {
                path: 'detail/:id',
                name: 'school-detail',
                component: () => import('./views/School/detail'),
              },
              {
                path: 'search',
                component: () => import('./views/School/search'),
              },
            ],
          },
          {
            path: 'mall',
            component: () => import('./views/Mall'),
            meta: {
              alive: true,
            },
          },
          {
            path: 'market',
            component: () => import('./views/Mall'),
          },
          {
            path: 'reader',
            component: () => import('./views/Reader'),
          },
          {
            path: 'register',
            component: () => import('./views/User/log/reg'),
          },
          {
            name: 'login',
            path: 'login',
            component: () => import('./views/User/log/login'),
          },
          {
            path: 'forgetPwd',
            component: () => import('./views/User/log/forgetPwd'),
          },
          {
            path: 'loginByCode',
            component: () => import('./views/User/log/loginByCode'),
          },
          {
            path: 'lives',
            component: () => import('./views/Live'),
          },
          {
            path: 'category',
            component: () => import('./views/Category'),
          },
          {
            path: 'messages',
            component: () => import('./views/Messages'),
            meta: {
              auth: true,
              // alive: true
            },
          },
          {
            path: 'updatePwd',
            component: () => import('./views/User/log/updatePwd'),
            meta: { index: 5 },
          },
          {
            name: 'chat',
            path: 'chat/:id',
            component: () => import('./views/Messages/chat'),
            meta: {
              auth: true,
            },
          },
          {
            name: 'study',
            path: 'study',
            component: () => import('./views/Study/'),
            meta: {
              alive: true,
            },
          },
          {
            path: 'shop',
            component: () => import('./views/Shop'),
            meta: {
              auth: true,
            },
          },
          {
            name: 'order',
            path: 'order',
            component: () => import('./views/Order'),
          },
          {
            path: 'orderStatus',
            component: () => import('./views/Order/orderStatus'),
            meta: {
              auth: true,
            },
          },
          {
            name: 'search',
            path: 'search',
            component: () => import('./views/search/index'),
            children: [
              {
                path: '/',
                component: () => import('./views/search/words'),
              },
              {
                path: 'result',
                component: () => import('./views/search/result'),
              },
            ],
          },
          {
            path: 'teachers',
            component: () => import('./views/Teachers'),
          },
          {
            name: 'teacher_detail',
            path: 'teacherDetail',
            component: () => import('./views/Teachers/detail'),
          },
          {
            name: 'user',
            path: 'user',
            component: () => import('./views/User/my'),
          },
          {
            path: 'info',
            component: () => import('./views/User/my/info'),
            meta: { index: 2 },
          },
          {
            path: 'infoUpdate',
            component: () => import('./views/User/my/infoUpdate'),
            meta: { index: 3 },
          },
          {
            path: 'edit-address',
            component: () => import('./views/Mall/edit-address'),
          },
          {
            path: 'updateNickName',
            component: () => import('./views/User/my/updateNickName.vue'),
            meta: { index: 4 },
          },
          {
            path: 'scoreShop',
            component: () => import('./views/User/my/scoreShop'),
          },
          {
            path: 'scoreMall',
            component: () => import('./views/User/my/ScoreMall'),
          },
          {
            path: 'orderDetail',
            component: () => import('./views/User/my/orderDetail'),
          },
          {
            path: 'follow',
            component: () => import('./views/User/my/follow'),
          },
          {
            path: 'updatePhone',
            component: () => import('./views/User/my/updatePhone.vue'),
            meta: { index: 4 },
          },
          {
            path: 'updateName',
            component: () => import('./views/User/my/updateName.vue'),
          },
          {
            path: 'testReport',
            component: () => import('./views/User/my/testReport'),
          },
          {
            name: 'course',
            path: 'course/:course_id',
            component: () => import('./views/Course'),
            redirect: { name: 'base' },
            children: [
              {
                name: 'base',
                path: 'detail',
                component: () => import('./views/Course/detail'),
              },
              {
                path: 'keshi',
                component: () => import('./views/Course/keshi'),
                meta: {
                  auth: true,
                },
              },
              {
                path: 'discuss',
                component: () => import('./views/Course/discuss'),
                meta: {
                  auth: true,
                },
              },
              {
                path: 'answer',
                component: () => import('./views/Course/teacherAnswer'),
                meta: {
                  auth: true,
                },
              },
              {
                path: 'online-exam',
                component: () => import('./views/Course/online-exam'),
                meta: {
                  auth: true,
                },
              },
              {
                name: 'exam',
                path: 'online-exam-test',
                component: () => import('./views/Course/online-exam-test'),
              },
              {
                name: 'report-result',
                path: 'online-exam-result',
                component: () => import('./views/Course/online-exam-result'),
                meta: {
                  auth: true,
                },
              },
              {
                path: 'online-exam-errors',
                component: () => import('./views/Course/online-exam-errors'),
                meta: {
                  auth: true,
                },
              },
              {
                path: 'online-exam-errors-detail',
                component: () =>
                  import('./views/Course/online-exam-errors-detail'),
              },
              {
                path: 'join',
                component: () => import('./views/Course/join'),
                meta: {
                  auth: true,
                },
              },
            ],
          },
          {
            path: 'player',
            component: () => import('./views/Player'),
            children: [
              {
                name: 'pic',
                path: 'pic',
                component: () => import('./views/Player/pic'),
              },
              {
                name: 'video',
                path: 'video',
                component: () => import('./views/Player/video'),
              },
              {
                name: 'audio',
                path: 'audio',
                component: () => import('./views/Player/audio'),
              },
              {
                name: 'reader',
                path: 'reader',
                component: () => import('./views/Reader/'),
              },
            ],
          },
        ],
      },
    ],
    scrollBehavior(to, from, savePosition) {
      return new Promise((resolve, reject) => {
        if (savePosition) {
          setTimeout(() => {
            console.log(savePosition, '-------------')
            resolve(savePosition)
          }, 50)
        }
      })
    },
  })
}
