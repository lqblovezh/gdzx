(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1072:function(t,e,a){"use strict";var i=a(579);a.n(i).a},1116:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"top serachWrap"},[a("form",{attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入单号搜索",name:"order",clearable:""},model:{value:t.where.order,callback:function(e){t.$set(t.where,"order",e)},expression:"where.order"}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入用户搜索",name:"user_name",clearable:""},model:{value:t.where.user_name,callback:function(e){t.$set(t.where,"user_name",e)},expression:"where.user_name"}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入手机号搜索",name:"phone",clearable:""},model:{value:t.where.phone,callback:function(e){t.$set(t.where,"phone",e)},expression:"where.phone"}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"],placeholder:["创建起始时间","创建结束时间"]}})],1),a("span",{staticClass:"group-inline"},[a("el-select",{attrs:{placeholder:"选择状态搜索"},model:{value:t.where.status,callback:function(e){t.$set(t.where,"status",e)},expression:"where.status"}},t._l(t.status,function(t){return a("el-option",{key:t.txt,attrs:{label:t.txt,value:t.value}})}),1)],1),a("span",{staticClass:"group-inline right"},[a("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.educes()}}},[t._v("导出查询")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.settlement()}}},[t._v("批量结算")])],1)])]),a("div",{staticClass:"content"},[a("table",{staticClass:"list"},[a("thead",[a("tr",[a("td",[a("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),a("td",{attrs:{width:"155"}},[t._v("兑现单号 ")]),a("td",[t._v(" 用户名")]),a("td",[t._v(" 绑定手机号")]),a("td",[t._v(" 提交时间")]),a("td",[t._v(" 兑现金额")]),a("td",[t._v(" 手续费")]),a("td",[t._v(" 应付金额")]),a("td",[t._v(" 承兑方式")]),a("td",[t._v(" 状态")]),a("td",[t._v(" 操作")])])]),a("tbody",t._l(t.list,function(e,i){return a("tr",[a("td",[a("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox"},domProps:{value:e.id}})]),a("td",[t._v(t._s(e.id))]),a("td",[t._v(t._s(e.distributor_info.distributor_nick))]),a("td",[t._v(t._s(e.distributor_info.distributor_phone))]),a("td",[t._v(t._s(e.create_time))]),a("td",[t._v(t._s(e.money))]),a("td",[t._v(t._s(e.service_money))]),a("td",[t._v(t._s(e.reward_money))]),a("td",[t._v(t._s(e.pay_name))]),a("td",[t._v(t._s(e.pay_status))]),a("td",[a("el-button",{attrs:{size:"medium",type:"primary",plain:""},on:{click:function(a){return t.detail(e.id)}}},[t._v("详情")])],1)])}),0)]),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),t.dialogVisible?a("el-dialog",{staticClass:"dialog",attrs:{width:"60%",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("el-tabs",{attrs:{value:"detail"}},[a("el-tab-pane",{attrs:{label:"详情",name:"detail"}})],1)],1),a("div",{staticClass:"part"},[a("div",{staticClass:"lside"},[t._v("单号信息")]),a("div",{staticClass:"rside"},[a("p",[t._v("订单编号： "+t._s(t.infoData.id))]),a("p",[t._v("兑付用户： "+t._s(t.infoData.user_nick))]),a("p",[t._v("绑定手机号： "+t._s(t.infoData.phone))])])]),a("div",{staticClass:"part"},[a("div",{staticClass:"lside"},[t._v("兑换金额来源")]),a("div",{staticClass:"rside"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.infoData.info,border:"","show-summary":""}},[a("el-table-column",{attrs:{prop:"order_id",label:"订单单号",width:"150"}}),a("el-table-column",{attrs:{prop:"user_id",label:"用户名",width:"160"}}),a("el-table-column",{attrs:{prop:"pay_time",label:"支付时间",width:"160"}}),a("el-table-column",{attrs:{prop:"money",label:"订单金额"}}),a("el-table-column",{attrs:{prop:"distribute_money",label:"分销金额"}}),a("el-table-column",{attrs:{prop:"reward_money",label:"奖励金额"}})],1)],1)]),a("div",{staticClass:"part"},[a("div",{staticClass:"lside"},[t._v("承兑信息")]),a("div",{staticClass:"rside"},[a("p",[t._v("兑现金额： "+t._s(t.infoData.money))]),a("p",[t._v("承兑方式： "+t._s(t.infoData.pay_name))]),a("p",[t._v("开户所在行： "+t._s(t.infoData.pay_info.Bank))]),a("p",[t._v("银行卡号： "+t._s(t.infoData.pay_info.account))]),a("p",[t._v("持卡人姓名： "+t._s(t.infoData.pay_info.name))])])]),a("div",{staticClass:"other"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.payback(t.infoData.id,1)}}},[t._v("已结算")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.payback(t.infoData.id,2)}}},[t._v("驳回兑付       ")])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确定")])],1)]):t._e()],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},274:function(t,e,a){"use strict";a.r(e);var i=a(1116),n=a(577);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1072);var r=a(0),l=Object(r.a)(n.default,i.a,i.b,!1,null,"aed26914",null);e.default=l.exports},388:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.info=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/setting",t)},e.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/read/distribute/setting",t)},e.cashList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/cash",t)},e.cashDetail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(l(t),t)},e.cashUpdata=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)(u(t),t)},e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/distributes",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(o(t),t)},e.settlement=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/read/distribute/cashs",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/export",t)},e.educes=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/cash/export",t)};var i,n=a(76),s=a(106),r=(i=s)&&i.__esModule?i:{default:i};var l=r.default.compile("/read/distribute/cash/:id"),o=r.default.compile("/read/distribute/distributes/:id"),u=r.default.compile("/read/distribute/cash/:id")},577:function(t,e,a){"use strict";a.r(e);var i=a(578),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},578:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(388)),r=a(289),l=(i=r)&&i.__esModule?i:{default:i},o=a(290);e.default={mixins:[o.publicMixin],data:function(){return{pickerOptions:{},ctimePick:"",list:[],currentPage:1,page:"",multipleSelection:[],status:[{txt:"未结算",value:"0"},{txt:"已结算",value:"1"},{txt:"驳回兑付",value:"2"}],infoData:null,backMsg:"",stateValue:"",value:"",where:{pageOffset:10,pageStart:0,order:"",user_name:"",phone:"",status:""},dialogVisible:!1,activeName2:"first"}},methods:{getList:function(t){var e=this;s.cashList(t).then(function(t){log(t),e.list=t.data,e.page=t.page})},addInfo:function(){this.dialogVisible=!0},del:function(t){var e=this;s.del({id:t}).then(function(t){e.getList(e.where)})},addsend:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return alert("error submit!!"),!1;s.save(e.infoAdd).then(function(t){e.getList(e.where)}),e.dialogVisible=!1,e.infoAdd={contents:"",title:"",type:""}})},search:function(){log(this.where),this.getList(this.where)},handleSizeChange:function(t){this.where.pageOffset=t,this.getList(this.where)},handleCurrentChange:function(t){this.where.pageStart=(t-1)*this.where.pageOffset,this.getList(this.where)},handleClick:function(){},detail:function(t){var e=this;s.cashDetail({id:t}).then(function(t){log(t),e.infoData=t.data,e.dialogVisible=!0})},backMsgSend:function(){var t=this;s.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(function(e){t.$message.success("回复成功"),t.backMsg="",t.detail(t.infoData.data.id)})},payback:function(t,e){var a=this;s.cashUpdata({id:t,status:e}).then(function(t){a.$message.success("结算状态修改成功"),a.getList(a.where)}).catch(function(t){a.$message.error("结算状态修改失败")})},settlement:function(t){var e=this,a=[];if(t)a.push(t);else if(!(a=this.$getChecked()))return;s.settlement({id:a}).then(function(t){e.getList()})},educes:function(){var t=this.$getChecked({isShowMessage:!1}),e=(0,l.default)(document.querySelector("#mainForm"),{hash:!0});s.educes(n({id:t},e)).then(function(t){window.location.href=t.data.url})}},created:function(){this.getList(this.where)},watch:{ctimePick:function(){this.where.time_start=this.ctimePick[0],this.where.time_end=this.ctimePick[1]}}}},579:function(t,e,a){}}]);