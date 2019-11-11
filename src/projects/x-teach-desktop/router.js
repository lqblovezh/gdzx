import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  ////console.log('router.js baseUrl', baseUrl)
  return new Router({
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        // 这个组件不能用App.vue , App.vue 仅仅用来实例化Vue的容器
        // 再次使用会出现两个App.vue, 如果App放上逻辑, 会执行两次
        component: () => import('./pages/Router'),
        children: [
          {
            path: '/',
            redirect: 'home',
            component: () => import('./pages/Home'),
          },
          {
            path: 'home',
            component: () => import('./pages/Home'),
            meta: {
              keepAlive: true,
            },
          },
          {
            path: 'search',
            component: () => import('./pages/SearchResult'),
          },
          {
            path: 'category',
            component: () => import('./pages/course/Category'),
          },
          {
            path: 'video',
            component: () => import('./pages/VideoCourse/'),
          },
          {
            path: 'reader',
            component: () => import('./pages/Reader/Reader'),
          },
          {
            path: 'cart',
            component: () => import('./pages/Cart'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'course',
            component: () => import('./pages/course/Base'),
            children: [
              {
                path: 'detail',
                component: () => import('./pages/course/Detail'),
              },
              {
                path: 'step',
                component: () => import('./pages/course/Step'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'step/into',
                component: () => import('./pages/course/Step'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'discuss',
                component: () => import('./pages/course/Discuss'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'answer',
                component: () => import('./pages/course/Answer'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'teacher',
                component: () => import('./pages/course/Teacher'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'examList',
                component: () => import('./pages/course/ExamList'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'exam',
                component: () => import('./pages/course/Exam'),
                meta: {
                  requireAuth: true,
                },
              },
            ],
          },
          {
            path: 'teacher-list',
            component: () => import('./pages/teacher/List'),
          },
          {
            path: 'integral-mall',
            component: () => import('./pages/integral'),
          },
          {
            path: 'colleges',
            component: () => import('./pages/college'),
          },
          {
            path: 'college-detail',
            component: () => import('./pages/college/detail'),
          },
          {
            path: 'lives',
            component: () => import('./pages/lives'),
          },
          {
            path: 'test',
            component: () => import('./pages/teacher/test'),
          },
          {
            path: 'teacher',
            component: () => import('./pages/teacher/Base'),
            children: [
              {
                path: 'course',
                component: () => import('./pages/teacher/Course'),
              },
              {
                path: 'live',
                component: () => import('./pages/teacher/Live'),
              },
              {
                path: 'clazz',
                component: () => import('./pages/teacher/Clazz'),
              },
              {
                path: 'message',
                component: () => import('./pages/teacher/Message'),
              },
            ],
          },
          {
            path: 'usreInfo',
            component: () => import('./pages/user/Info'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'apply',
            component: () => import('./pages/user/Apply'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'user',
            component: () => import('./pages/user/Base'),
            children: [
              {
                path: 'course',
                component: () => import('./pages/user/Course'),
                meta: {
                  requireAuth: true,
                },
              },

              {
                path: 'class',
                component: () => import('./pages/user/Class'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'message',
                redirect: 'message/answer',
                component: () => import('./pages/message/Base'),
                children: [
                  {
                    path: 'answer',
                    component: () => import('./pages/message/Answer'),
                    meta: {
                      requireAuth: true,
                    },
                  },
                  {
                    path: 'discuss',
                    component: () => import('./pages/message/Discuss'),
                    meta: {
                      requireAuth: true,
                    },
                  },
                  {
                    path: 'private',
                    component: () => import('./pages/message/private'),
                    meta: {
                      requireAuth: true,
                    },
                  },
                  {
                    path: 'info',
                    component: () => import('./pages/message/Info'),
                    meta: {
                      requireAuth: true,
                    },
                  },
                ],
              },
              {
                path: 'talkList',
                component: () => import('./pages/user/Talk'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'talk',
                component: () => import('./pages/course/Exam'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'teacher',
                component: () => import('./pages/user/Teacher'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'integral',
                component: () => import('./pages/user/Integral'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'order',
                component: () => import('./pages/user/Order'),
                meta: {
                  requireAuth: true,
                },
              },
            ],
          },
          {
            path: 'learn',
            component: () => import('./pages/Learn'),
          },
        ],
      },
    ],
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}
