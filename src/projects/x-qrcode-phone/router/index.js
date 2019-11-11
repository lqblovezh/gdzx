import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
		{path: '/',redirect: "/home"},
		{path:'/chapters',name:'chapters',component:()=>import('@/components/views/home/chapters')},
		{path:'/reader',name:'reader',component:()=>import('@/components/views/reader3/reader')},
		{path:'/home',name:'home',component:()=>import('@/components/views/home')},
		{path:'/gather',name:'gather',component:()=>import('@/components/views/home/gather')},
		{path:'/circle',name:'circle',component:()=>import('@/components/views/home/bookCircle')},
		{path:'/scratch',name:'scratch',component:()=>import('@/components/views/app/scratch')},
		{path:'/turntable',name:'turntable',component:()=>import('@/components/views/app/turntable')},
		{path:'/qus',name:'qus',component:()=>import('@/components/views/app/questions')},
		{path:'/qusAnswer',name:'qusAnswer',component:()=>import('@/components/views/app/qusAnswer')},
		{path:'/book',name:'book',component:()=>import('@/components/views/app/book')},
		{path:'/article',name:'article',component:()=>import('@/components/views/app/article')},
		{path:'/bookDetail',name:'bookDetail',component:()=>import('@/components/views/app/bookDetail')},
		{path:'/bookTheme',name:'bookTheme',component:()=>import('@/components/views/app/bookTheme')},
		{path:'/vote',name:'vote',component:()=>import('@/components/views/app/vote')},
		{path:'/ans',name:'ans',component:()=>import('@/components/views/app/ans')},
		{path:'/special',name:'special',component:()=>import('@/components/views/special')},
		{path:'/subject',name:'subject',component:()=>import('@/components/views/special/subject')},
		{path: '/xxx',name:'xxx',component: () => import('@/components/views/my')},
		{path:'/order',name:'order',component:()=> import('@/components/views/my/order')},
		{path:'/pay',name:'pay',component:()=>import('@/components/views/my/pay')},
		{path:'/myResource',name:'myResource',component:()=>import('@/components/views/my/myResource')},
		{path:'/prize',name:'prize',component:()=>import('@/components/views/my/prize')},
		{path:'/showAward',name:'showAward',component:()=>import('@/components/views/my/showAward')},
		{path:'/audio',name:'audio',component:()=>import('@/components/views/play/audio')},
    {path:'/video',name:'video',component:()=>import('@/components/views/play/video')},
    //习题库
		{ path:'/resource', component:()=>import('@/components/views/app/resource/index')},
		{ path:'/resource/qus', component:()=>import('@/components/views/app/resource/qus')},
		{ path: '/resource/list', component: () => import('@/components/views/app/resource/list') },
		{ path: '/login', component: () => import('@/components/views/login/') },
		{ path: '/register', component: () => import('@/components/views/login/register') },
		{ path: '/phone-login', component: () => import('@/components/views/login/phoneLogin') },
		{ path: '/forget-pwd', component: () => import('@/components/views/login/forgetPwd') },
		{ path: '/update-pwd', component: () => import('@/components/views/login/updatePwd') },
		//报名
		{ path: '/apply', component: () => import('@/components/views/apply/') },

	]
});
