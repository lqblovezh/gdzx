import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Wms = resolve => require(['@/components/wms'], resolve)
const Home = resolve => require(['@/components/wms/0-home'], resolve)
const Resource = resolve =>
  require(['@/components/wms/1-resourceLibrary'], resolve)
const Course = resolve => require(['@/components/wms/2-courseLibrary'], resolve)
const PubCourse = resolve =>
  require(['@/components/wms/2-courseLibrary/pubCourse'], resolve)
const CourseBill = resolve =>
  require(['@/components/wms/2-courseLibrary/bill'], resolve)
const CourseClass = resolve =>
  require(['@/components/wms/2-courseLibrary/class'], resolve)
const CourseStudent = resolve =>
  require(['@/components/wms/2-courseLibrary/student'], resolve)
const CourseDiscuss = resolve =>
  require(['@/components/wms/2-courseLibrary/discuss'], resolve)
const ClassLibrary = resolve =>
  require(['@/components/wms/3-classLibrary'], resolve)
const ClassCode = resolve =>
  require(['@/components/wms/3-classLibrary/code'], resolve)
const ApplyClass = resolve =>
  require(['@/components/wms/3-classLibrary/apply'], resolve)
const AuditClass = resolve =>
  require(['@/components/wms/3-classLibrary/audit'], resolve)
const Marking = resolve => require(['@/components/wms/4-marking'], resolve)
const MarkinEexercise = resolve =>
  require(['@/components/wms/4-marking/exercise'], resolve)

const Msg_private = resolve => require(['@/components/wms/5-message'], resolve)
const Msg_message = resolve =>
  require(['@/components/wms/5-message/msg'], resolve)
const Msg_answer = resolve =>
  require(['@/components/wms/5-message/answer'], resolve)
const Msg_leaving = resolve =>
  require(['@/components/wms/5-message/leavingMsg'], resolve)
const Msg_showPrivate = resolve =>
  require(['@/components/wms/5-message/showMsg'], resolve)
const Lives = resolve => require(['@/components/wms/6-lives'], resolve)
const Lives_verify = resolve =>
  require(['@/components/wms/6-lives/verify'], resolve)
const Signin = resolve => require(['@/components/common/signin'], resolve)
const PerfectInfo = resolve =>
  require(['@/components/common/perfectInfo'], resolve)
const Login = resolve => require(['@/components/common/login'], resolve)

const Banner = resolve =>
  require(['@/components/wms/9-setting/banner'], resolve)
const Ad = resolve => require(['@/components/wms/9-setting/ad'], resolve)
const Advert = resolve =>
  require(['@/components/wms/9-setting/advert'], resolve)
const Commend = resolve =>
  require(['@/components/wms/9-setting/commend'], resolve)
const FooterSetting = resolve =>
  require(['@/components/wms/9-setting/footer'], resolve)
const Lession = resolve =>
  require(['@/components/wms/9-setting/lession'], resolve)
const Teacher = resolve =>
  require(['@/components/wms/9-setting/teacher'], resolve)

const Member = resolve => require(['@/components/wms/11-member'], resolve)
const PersonalInfo = resolve =>
  require(['@/components/wms/7-personalInfo'], resolve)
const Editorial = resolve =>
  require(['@/components/wms/12-editorial/index'], resolve)
const Audit = resolve =>
  require(['@/components/wms/12-editorial/audit'], resolve)
const DeductPercent = resolve =>
  require(['@/components/wms/12-editorial/deductPercent'], resolve)
const IntegralMall = resolve =>
  require(['@/components/wms/10-integralMall/index'], resolve)
const BookOrder = resolve =>
  require(['@/components/wms/10-integralMall/bookOrder'], resolve)
const Setting = resolve =>
  require(['@/components/wms/10-integralMall/setting'], resolve)
const ConvertRecord = resolve =>
  require(['@/components/wms/10-integralMall/convertRecord'], resolve)
const GetRecord = resolve =>
  require(['@/components/wms/10-integralMall/getRecord'], resolve)
const CourseOrder = resolve =>
  require(['@/components/wms/8-dealInfo/index'], resolve)
const AuthorizeOrder = resolve =>
  require(['@/components/wms/8-dealInfo/authorizeOrder'], resolve)
const ResourceAuthorize = resolve =>
  require(['@/components/wms/8-dealInfo/resourceAuthorize'], resolve)
const UserStatement = resolve =>
  require(['@/components/wms/13-statement/index'], resolve)
const ProfileStatement = resolve =>
  require(['@/components/wms/13-statement/profileStatement'], resolve)
const Colleges = resolve => require(['@/components/wms/14-colleges'], resolve)
const ArVr = resolve => require(['@/components/wms/15-ArVr'], resolve)

export default new Router({
  routes: [
    { path: '/', redirect: '/wms/home' },
    { path: '/#', component: Home },
    {
      path: '/wms/',
      component: Wms,
      children: [
        { path: 'home', component: Home },

        { path: 'resource', component: Resource },
        { path: 'course', component: Course },
        { path: 'pubCourse', component: PubCourse },
        { path: 'course/bill', name: 'CourseBill', component: CourseBill },
        { path: 'course/class', name: 'CourseClass', component: CourseClass },
        {
          path: 'course/student',
          name: 'CourseStudent',
          component: CourseStudent,
        },
        {
          path: 'course/discuss',
          name: 'CourseDiscuss',
          component: CourseDiscuss,
        },
        { path: 'course', component: Course },
        { path: 'class', component: ClassLibrary },
        { path: 'class/code', name: 'ClassCode', component: ClassCode },
        { path: 'applyClass', component: ApplyClass },
        { path: 'auditClass', component: AuditClass },
        { path: 'message', component: Msg_private },
        { path: 'message/msg', component: Msg_message },
        { path: 'message/answer', component: Msg_answer },
        { path: 'message/leaving', component: Msg_leaving },
        { path: 'message/show', component: Msg_showPrivate },
        { path: 'lives', component: Lives },
        { path: 'lives/verify', component: Lives_verify },
        { path: 'setting/banner', component: Banner },
        { path: 'setting/ad', component: Ad },
        { path: 'setting/advert', component: Advert },
        { path: 'setting/commend', component: Commend },
        { path: 'setting/footer', component: FooterSetting },
        { path: 'setting/lession', component: Lession },
        { path: 'setting/teacher', component: Teacher },
        { path: 'member', component: Member },
        { path: 'personalInfo', component: PersonalInfo },
        { path: 'editorial', component: Editorial },
        { path: 'audit', component: Audit },
        { path: 'deductPercent', component: DeductPercent },
        { path: 'integralMall', component: IntegralMall },
        { path: 'bookOrder', component: BookOrder },
        { path: 'setting', component: Setting },
        { path: 'convertRecord', component: ConvertRecord },
        { path: 'getRecord', component: GetRecord },
        { path: 'marking', component: Marking },
        { path: 'marking/exe', component: MarkinEexercise },
        { path: 'courseOrder', component: CourseOrder },
        { path: 'authorizeOrder', component: AuthorizeOrder },
        { path: 'resourceAuthorize', component: ResourceAuthorize },
        { path: 'userStatement', component: UserStatement },
        { path: 'profileStatement', component: ProfileStatement },
        { path: 'colleges', component: Colleges },
        { path: 'ArVr', component: ArVr },
      ],
    },
    { path: '/perfectInfo', component: PerfectInfo },
    { path: '/signin', component: Signin },
    { path: '/login', component: Login },
    { path: '', component: Home },
  ],
})
