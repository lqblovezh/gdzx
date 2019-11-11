import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Wms = (resolve) => require(["@/components/wms"],resolve)
//首页
const Home = (resolve) => require(["@/components/wms/0-home"], resolve)
//产品管理
const Article = (resolve) => require(["@/components/wms/1-product/article"], resolve)
const Series = (resolve) => require(["@/components/wms/1-product/series"], resolve)
//专题库
const Dissertation = (resolve) => require(["@/components/wms/2-dissertation/index"], resolve) //专题
const ResAndUse = (resolve) => require(["@/components/wms/2-dissertation/setting/resAndUse"], resolve) //资源与应用
const Using = (resolve) => require(["@/components/wms/2-dissertation/setting/using"], resolve) //使用中产品
const Columns = (resolve) => require(["@/components/wms/2-dissertation/setting/column"], resolve) //详情、新建
const Advertising = (resolve) => require(["@/components/wms/2-dissertation/setting/advertising"],resolve) //广告位
const Sort = (resolve) => require(["projects/x-read-mgr/components/wms/2-settings/bookSettings/sort"],resolve)
const Grounding = (resolve) => require(["@/components/wms/2-dissertation/grounding"],resolve)


//会员管理
const MemberList = (resolve) => require(["@/components/wms/4-userManage/memberList"], resolve)
const DetailRes = (resolve) => require(["@/components/wms/4-userManage/memberList/detail"], resolve) //订单记录detail
// const MemberList = (resolve) => require(["projects/x-read-mgr/components/wms/6-member/list"], resolve)
const MemberFb = (resolve) => require(["projects/x-read-mgr/components/wms/6-member/userMsg"], resolve)
//订单管理
const OrderManage = (resolve) => require(["@/components/wms/5-orderManage"],resolve) // 订单查询
const IncomeStatics = (resolve) => require(["@/components/wms/5-orderManage/incomeStatics"],resolve) // 收入统计
// 书圈管理
const BookManage = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/index"],resolve)
const BookTheme = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/theme"],resolve)
const BookComment = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/comment"],resolve)
// 统计分析
const BookStatics = (resolve) => require(["@/components/wms/7-statement/book"],resolve) //书籍报表
const ProStatics = (resolve) => require(["@/components/wms/7-statement/product"],resolve)//产品报表
// const ProStatics = (resolve) => require(["@/components/wms/7-statement"],resolve)
const UserList = (resolve) => require(["@/components/wms/7-statement/userList"],resolve)
const ScanRecord = (resolve) => require(["@/components/wms/7-statement/record"],resolve) //扫码记录
const UserStatic = (resolve) => require(["@/components/wms/7-statement/userStatic"],resolve) //用户统计
const Analys = (resolve) => require(["@/components/wms/7-statement/analys"],resolve) //数据分析
const analysAll = (resolve) => require(["@/components/wms/7-statement/analysAll"],resolve) //系统整体报表
//图书库
const Book = (resolve) => require(["@/components/wms/8-book/index"],resolve)
//二维码库
const Qrcode = (resolve) => require(["@/components/wms/9-qrcode/index"],resolve)
const Transfer = (resolve) => require(["@/components/wms/9-qrcode/transfer"],resolve)
const Recycle = (resolve) => require(["@/components/wms/9-qrcode/recycle"],resolve)
//二维码产品库
const QrcodeProduct = (resolve) => require(["@/components/wms/14-qrcodeProduct/index"],resolve)
//资源库
const Practice = (resolve) => require(["@/components/wms/10-resource/practice"],resolve)//习题集
const Pictures = (resolve) => require(["@/components/wms/10-resource/index"],resolve)//图片集
const Audios = (resolve) => require(["@/components/wms/10-resource/audio"],resolve)//音频集
const Videos = (resolve) => require(["@/components/wms/10-resource/video"],resolve)//视频集
const Articles = (resolve) => require(["@/components/wms/10-resource/article"],resolve)//文章集
const Books = (resolve) => require(["@/components/wms/10-resource/book"],resolve)//数字图书集
//应用库
const Vote = (resolve) => require(["@/components/wms/12-use/vote"],resolve) //投票
const Questionnaire = (resolve) => require(["@/components/wms/12-use/questionnaire"],resolve) //问卷调查
const VoteInfo = (resolve) => require(["@/components/wms/12-use/questionnaire/voteInfo"],resolve) // 报表信息
const DataStatics = (resolve) => require(["@/components/wms/12-use/questionnaire/dataStatics"],resolve) // 数据统计
const QandA = (resolve) => require(["@/components/wms/12-use/QandA"],resolve) // 问答
const ReaderCircle = (resolve) => require(["@/components/wms/12-use/readerCircle"],resolve) //读者圈
const Apply = (resolve) => require(["@/components/wms/12-use/apply"],resolve) //报名应用
const ApplyForm = (resolve) => require(["@/components/wms/12-use/apply/form"],resolve) //报名应用
const ApplyNew = (resolve) => require(["@/components/wms/12-use/apply/new"],resolve) //报名应用
const Lottery = (resolve) => require(["@/components/wms/12-use/lottery"],resolve) // 抽奖
const Statement = (resolve) => require(["@/components/wms/12-use/vote/statement"],resolve) // 报表信息
const Statics = (resolve) => require(["@/components/wms/12-use/vote/statics"],resolve) //
//营销库
const ShowList = (resolve) => require(["@/components/wms/13-marketing/showList/index"],resolve)
const Transpond = (resolve) => require(["@/components/wms/13-marketing/transpond/index"],resolve)
//备份还原
// const BackupAndRestore = (resolve) => require(["projects/x-publish-mgr/components/wms/5-system/backupAndRestore"],resolve)

export default new Router({
	routes: [
		{path: '/',redirect: "/wms/home"},
		{path: '/#',component: Home},
		{
			path: "/wms/",
			component: Wms,
			children: [
				{path: "home",component: Home},
				{path: "article",component: Article},
				// {path: "backupAndRestore",component: BackupAndRestore},
				{path: "seriesProduct",component: Series},
				{path: "memberlist",component: MemberList},
				{path: "memberfb",component: MemberFb},
				{path: "sort", component:Sort},
				{path: "typeSetting",component: Columns,redirect: '/wms/typeSetting/column'},
				{path: "typeSetting/column",component: Columns},
				{path: "typeSetting/using",component: Using},
				{path: "typeSetting/advertising",component: Advertising},
				{path: "typeSetting/resAndUse",component: ResAndUse},
				{path: "dissertation",component: Dissertation},
				{path: "grounding",component: Grounding},
				{path: "bookManage", component: BookManage },
				{path: "bookManage/theme", component: BookTheme },
				{path: "bookManage/comment", component: BookComment },
				{path: "orderManage", component: OrderManage },
				{path: "incomeStatics", component: IncomeStatics },
				{path: "book", component: Book },
				{path: "qrcode", component: Qrcode },
				{path: 'transfer', component:Transfer},
				{path: "recycle", component: Recycle },
				{path: 'practice',component:Practice},
				{path: "pictures", component: Pictures },
				{path: "audios", component: Audios },
				{path: "videos", component: Videos },
				{path: "articles", component: Articles },
				{path: "books", component: Books },
				{path: "vote", component: Vote },
				{path: "questionnaire", component: Questionnaire },
				{path: "voteInfo", component: VoteInfo },
				{path: "dataStatics", component: DataStatics },
				{path: "qandA", component: QandA },
				{path: "readerCircle", component: ReaderCircle },
				{path: "apply", component: Apply },
				{path: "applyNew", component: ApplyNew },
				{path: "applyForm/:id", component: ApplyForm },
				{path: "lottery", component: Lottery },
				{path: "statement", component:Statement},
				{path: "statics", component:Statics},
				{path: "bookStatics", component:BookStatics},
				{path: "proStatics", component:ProStatics},
				{path: "userList", component:UserList},
				{path: "scanRecord", component:ScanRecord},
				{path: "userStatic", component:UserStatic},
				{path: "analys", component:Analys},
				{path: "analysAll", component:analysAll},
				{path: "detailRes", component:DetailRes},
				{path: "showList", component: ShowList },
				{path: "transpond", component: Transpond },
				{path: "qrcodeProduct", component: QrcodeProduct },
			]
		},
		{path: '', component: Home},
	]
});
