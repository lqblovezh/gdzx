(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1066:function(t,e,a){"use strict";var s=a(567);a.n(s).a},1099:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"top serachWrap"},[a("form",{attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入用户名搜索",name:"name",clearable:""},model:{value:t.where.name,callback:function(e){t.$set(t.where,"name",e)},expression:"where.name"}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入手机号搜索",name:"phone",clearable:""},model:{value:t.where.phone,callback:function(e){t.$set(t.where,"phone",e)},expression:"where.phone"}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),t._m(0),a("span",{staticClass:"group-inline right"},[a("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.educe()}}},[t._v("导出查询")])],1)])]),a("div",{staticClass:"content"},[a("table",{staticClass:"list"},[t._m(1),a("tbody",t._l(t.list,function(e,s){return a("tr",[a("td",[a("span",[t._v(t._s(s+1))]),a("input",{ref:"ids",refInFor:!0,attrs:{type:"hidden"},domProps:{value:e.id}})]),a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.phone))]),a("td",[t._v(t._s(e.order_paid_count||"0.00"))]),a("td",[t._v(t._s(e.order_paid_money||"0.00"))]),a("td",[t._v(t._s(e.distribute_paid_count||"0.00"))]),a("td",[t._v(t._s(e.distribute_paid_money||"0.00"))]),a("td",[t._v(t._s(e.distribute_reward_money||"0.00"))]),a("td",[t._v(t._s(e.distribute_cashed_money||"0.00"))]),a("td",[t._v(t._s(e.credits||"0"))]),a("td",[t._v(t._s(e.last_login_time))]),a("td",[t._v(t._s("locked"==e.lock_status?"锁定":"正常"))]),a("td",["locked"!=e.lock_status?a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return t.lock(e.id)}}},[t._v("冻结")]):a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return t.unlock(e.id)}}},[t._v("解冻")]),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(a){return t.detail(e.id)}}},[t._v("详情")])],1)])}),0)]),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),a("el-dialog",{attrs:{width:"1055px",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"详情",name:"first"}},[t.infoData?a("dl",{staticClass:"userInfo"},[a("dd",[t._v("头像："),a("img",{staticClass:"photo",attrs:{src:t.infoData.picture_absolute}})]),a("dd",[a("span",[t._v("用户名:")]),a("el-input",{staticClass:"width",attrs:{size:"small"},model:{value:t.infoData.name.substr(0,12),callback:function(e){t.$set(t.infoData.name,"substr(0,12)",e)},expression:"infoData.name.substr(0,12)"}})],1),a("dd",[a("span",[t._v("昵称:")]),a("el-input",{staticClass:"width",attrs:{size:"small"},model:{value:t.infoData.nick_name,callback:function(e){t.$set(t.infoData,"nick_name",e)},expression:"infoData.nick_name"}})],1),a("dd",[a("el-checkbox",{model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}}),a("span",{staticClass:"small"},[t._v("重置密码为：123456")])],1),a("dd",{staticClass:"other"},[a("span",{staticClass:"sex"},[a("el-radio",{attrs:{label:"男"},model:{value:t.infoData.sex,callback:function(e){t.$set(t.infoData,"sex",e)},expression:"infoData.sex"}},[t._v("男")]),a("el-radio",{attrs:{label:"女"},model:{value:t.infoData.sex,callback:function(e){t.$set(t.infoData,"sex",e)},expression:"infoData.sex"}},[t._v("女")]),a("el-radio",{attrs:{label:"保密"},model:{value:t.infoData.sex,callback:function(e){t.$set(t.infoData,"sex",e)},expression:"infoData.sex"}},[t._v("保密")])],1)]),a("dd",{staticClass:"other"},[a("span",[t._v("出生日期: ")]),a("el-date-picker",{staticClass:"width",attrs:{size:"small",type:"date",placeholder:"选择日期"},model:{value:t.infoData.date_of_birth,callback:function(e){t.$set(t.infoData,"date_of_birth",e)},expression:"infoData.date_of_birth"}})],1),a("dd",{staticClass:"other"},[a("span",[t._v("绑定手机号: ")]),a("el-input",{staticClass:"width",attrs:{size:"small"},model:{value:t.infoData.phone,callback:function(e){t.$set(t.infoData,"phone",e)},expression:"infoData.phone"}})],1),a("dd",{staticClass:"other"},[a("span",[t._v("联系邮箱: ")]),a("el-input",{staticClass:"width",attrs:{size:"small"},model:{value:t.infoData.email,callback:function(e){t.$set(t.infoData,"email",e)},expression:"infoData.email"}})],1),a("dd",{staticClass:"other w "},[a("span",[t._v("角色权限:")]),a("el-checkbox-group",{model:{value:t.infoData.roles,callback:function(e){t.$set(t.infoData,"roles",e)},expression:"infoData.roles"}},t._l(t.roleList,function(e,s){return a("el-checkbox",{key:s,staticClass:"roles",attrs:{label:e.id}},[t._v(t._s(e.name))])}),1)],1),a("dd",{staticClass:"other w sale"},[a("span",[t._v("消费金额： "+t._s(t.infoData.order_paid_money||"0.00"))]),a("span",[t._v("支付订单数： "+t._s(t.infoData.order_paid_count||"0.00"))]),a("span",[t._v("分销次数： "+t._s(t.infoData.distribute_paid_count||"0.00"))]),a("span",[t._v("分销总金额： "+t._s(t.infoData.distribute_paid_money||"0.00"))]),a("span",[t._v("累计奖励金额： "+t._s(t.infoData.distribute_reward_money||"0.00"))]),a("span",[t._v("累计提现金额： "+t._s(t.infoData.distribute_cashed_money||"0.00"))]),a("span",[t._v("用户积分： "+t._s(t.infoData.credits||"0"))])])]):t._e(),a("div",{staticClass:"title"},[t._v("已购产品")]),t.infoData?a("div",{staticClass:"imgList"},t._l(t.infoData.bought_goods,function(e){return a("div",{staticClass:"item"},[a("div",{staticClass:"img",style:{backgroundImage:"url("+e.img_src+")"}}),a("div",{staticClass:"goodsname"},[a("span",[t._v(t._s(e.name))])])])}),0):a("div",{staticClass:"info"},[t._v("暂无数据")])])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.save}},[t._v("保存")])],1)],1)],1)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"group-inline"},[e("select",{staticClass:"form-control width-small",attrs:{name:"lock_status"}},[e("option",{attrs:{value:""}},[this._v("所有")]),e("option",{attrs:{value:"normal"}},[this._v("正常")]),e("option",{attrs:{value:"locked"}},[this._v("冻结")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{width:"40"}},[t._v("序号")]),a("th",{attrs:{width:"165"}},[t._v("用户名")]),a("th",{attrs:{width:"150"}},[t._v("绑定手机号")]),a("th",[t._v("支付订单数")]),a("th",[t._v("累计消费金额")]),a("th",[t._v("分销次数")]),a("th",[t._v("分销总金额")]),a("th",[t._v("累计奖励金额")]),a("th",[t._v("累计提现金额")]),a("th",[t._v("用户积分")]),a("th",{attrs:{width:"200"}},[t._v("最近登录时间")]),a("th",[t._v("用户状态")]),a("th",[t._v("操作")])])])}];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return i})},270:function(t,e,a){"use strict";a.r(e);var s=a(1099),i=a(564);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);a(1066);var r=a(0),o=Object(r.a)(i.default,s.a,s.b,!1,null,"45cc3054",null);e.default=o.exports},524:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/user/users",t)},e.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)(o(t),t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(l(t),t)},e.lock=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(c(t),t)},e.Unlock=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_delete)(c(t),t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/user/export",t)};var s,i=a(76),n=a(106),r=(s=n)&&s.__esModule?s:{default:s};var o=r.default.compile("/common/user/:id"),l=r.default.compile("/read/user/users/:id"),c=r.default.compile("/read/user/lock/:id")},564:function(t,e,a){"use strict";a.r(e);var s=a(565),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);e.default=i.a},565:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r(a(524)),i=r(a(566)),n=a(290);function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}e.default={mixins:[n.publicMixin],data:function(){return{services:s,pickerOptions:{},ctimePick:"",list:[],currentPage:1,page:"",multipleSelection:[],status:[{txt:"所有",value:""},{txt:"正常",value:"normal"},{txt:"冻结",value:"locked"}],imgListSrc:[{src:"../../../static/images/member/u6294.png"},{src:"../../../static/images/member/u6302.png"},{src:"/static/images/member/u6306.png"},{src:"/static/images/member/u6312.png"},{src:"/static/images/member/u6314.png"}],nameList:[],infoData:null,backMsg:"",stateValue:"",value:"",userInfo:{},checked:!1,where:{pageOffset:10,pageStart:0,name:"",phone:"",lock_status:"",time_start:"",time_end:""},dialogVisible:!1,activeName:"first"}},methods:{getList:function(t){var e=this;s.getList(t).then(function(t){e.list=t.data,e.page=t.page})},addInfo:function(){this.dialogVisible=!0},lock:function(t){var e=this;s.lock({id:t}).then(function(t){e.getList(e.where)})},unlock:function(t){var e=this;s.Unlock({id:t}).then(function(t){e.getList(e.where)})},addsend:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return alert("error submit!!"),!1;s.save(e.infoAdd).then(function(t){e.getList(e.where)}),e.dialogVisible=!1,e.infoAdd={contents:"",title:"",type:""}})},search:function(){this.getList(this.where)},handleSizeChange:function(t){this.where.pageOffset=t,this.getList(this.where)},handleCurrentChange:function(t){this.where.pageStart=(t-1)*this.where.pageOffset,this.getList(this.where)},handleClick:function(){},detail:function(t){var e=this;s.detail({id:t}).then(function(t){e.infoData=t.data,e.infoData.roles=e.infoData.roles.map(function(t){return t.id}),e.infoData.reset_pwd=!1,e.dialogVisible=!0})},backMsgSend:function(){var t=this;s.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(function(e){t.$message.success("回复成功"),t.backMsg="",t.detail(t.infoData.data.id)})},save:function(t){var e=this;this.checked&&(this.infoData.reset_pass=1),this.infoData.roles.length||(this.infoData.roles=this.domList(this.roleList)),s.save(this.infoData).then(function(t){e.dialogVisible=!1,e.$message.success("设置成功！！")})},domList:function(t){var e={};return t.forEach(function(t){e[t.id]=0}),e}},created:function(){var t=this;this.getList(this.where),i.getList().then(function(e){t.roleList=e.data})},watch:{ctimePick:function(){this.where.time_start=this.ctimePick[0],this.where.time_end=this.ctimePick[1]}}}},566:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/read/user/roles",t)},e.save=function(t){var e=t.id,a=function(t,e){var a={};for(var s in t)e.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(t,s)&&(a[s]=t[s]);return a}(t,["id"]);if(e)return(0,i.request_put)(r({id:e}),a);return(0,i.request_post)("/read/user/roles",a)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(r(t),t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/read/user/roles/delete",t)};var s,i=a(76),n=a(106);var r=((s=n)&&s.__esModule?s:{default:s}).default.compile("/read/user/roles/:id")},567:function(t,e,a){}}]);