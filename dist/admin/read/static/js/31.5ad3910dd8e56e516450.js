(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1073:function(e,t,a){"use strict";var i=a(582);a.n(i).a},1092:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("div",{staticClass:"part"},[a("div",{staticClass:"title"},[e._v("分销说明")]),a("el-form",{ref:"form",staticClass:"content"},[a("el-form-item",[a("el-input",{staticClass:"area",attrs:{type:"textarea",rows:"8"},model:{value:e.infoData.distribute_rule,callback:function(t){e.$set(e.infoData,"distribute_rule",t)},expression:"infoData.distribute_rule"}})],1),a("el-form-item",[a("el-button",{on:{click:e.send}},[e._v("提交")])],1)],1)],1),a("div",{staticClass:"part"},[a("div",{staticClass:"title"},[e._v("奖励及提现设置")]),a("div",{staticClass:"content"},[a("div",{staticClass:"other"},[a("div",{staticClass:"lside"},[e._v("分销奖励")]),a("div",{staticClass:"rside"},[a("el-radio",{staticClass:"radio",attrs:{label:"0"},model:{value:e.infoData.reward_type,callback:function(t){e.$set(e.infoData,"reward_type",t)},expression:"infoData.reward_type"}},[e._v("按比例"),a("el-input",{staticClass:"w",model:{value:e.infoData.reward_money,callback:function(t){e.$set(e.infoData,"reward_money",t)},expression:"infoData.reward_money"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),a("br"),a("el-radio",{staticClass:"radio",attrs:{label:"1"},model:{value:e.infoData.reward_type,callback:function(t){e.$set(e.infoData,"reward_type",t)},expression:"infoData.reward_type"}},[e._v("按固定"),a("el-input",{staticClass:"w",model:{value:e.infoData.reward_money,callback:function(t){e.$set(e.infoData,"reward_money",t)},expression:"infoData.reward_money"}})],1)],1)]),a("div",{staticClass:"other"},[a("div",{staticClass:"lside"},[e._v("提现渠道：")]),a("div",{staticClass:"rside"},[a("el-checkbox",{model:{value:e.infoData.pay_type[0],callback:function(t){e.$set(e.infoData.pay_type,0,t)},expression:"infoData.pay_type[0]"}},[e._v("银行转账")]),a("el-checkbox",{model:{value:e.infoData.pay_type[1],callback:function(t){e.$set(e.infoData.pay_type,1,t)},expression:"infoData.pay_type[1]"}},[e._v("支付宝")])],1)]),a("div",{staticClass:"other"},[a("div",{staticClass:"lside"},[e._v("提现手续费：")]),a("div",{staticClass:"rside"},[a("el-radio",{staticClass:"radio",attrs:{label:"0"},model:{value:e.infoData.service_type,callback:function(t){e.$set(e.infoData,"service_type",t)},expression:"infoData.service_type"}},[e._v("按比例"),a("el-input",{staticClass:"w",model:{value:e.infoData.service_money,callback:function(t){e.$set(e.infoData,"service_money",t)},expression:"infoData.service_money"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),a("br"),a("el-radio",{staticClass:"radio",attrs:{label:"1"},model:{value:e.infoData.service_type,callback:function(t){e.$set(e.infoData,"service_type",t)},expression:"infoData.service_type"}},[e._v("按固定"),a("el-input",{staticClass:"w",model:{value:e.infoData.service_money,callback:function(t){e.$set(e.infoData,"service_money",t)},expression:"infoData.service_money"}})],1)],1)])])])])},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},275:function(e,t,a){"use strict";a.r(t);var i=a(1092),n=a(580);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);a(1073);var s=a(0),o=Object(s.a)(n.default,i.a,i.b,!1,null,"7a8ec0b6",null);t.default=o.exports},388:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.info=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/setting",e)},t.save=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/read/distribute/setting",e)},t.cashList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/cash",e)},t.cashDetail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(o(e),e)},t.cashUpdata=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)(c(e),e)},t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/distributes",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(l(e),e)},t.settlement=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/read/distribute/cashs",e)},t.educe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/distribute/export",e)},t.educes=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/cash/export",e)};var i,n=a(76),r=a(106),s=(i=r)&&i.__esModule?i:{default:i};var o=s.default.compile("/read/distribute/cash/:id"),l=s.default.compile("/read/distribute/distributes/:id"),c=s.default.compile("/read/distribute/cash/:id")},580:function(e,t,a){"use strict";a.r(t);var i=a(581),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);t.default=n.a},581:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a(388));t.default={data:function(){return{infoData:{service_money:"",reward_money:"",distribute_rule:"",reward_type:"0",service_type:"1",pay_type:[!0,!1]}}},methods:{info:function(){var e=this;i.info().then(function(t){e.infoData.distribute_rule=t.data.distribute_rule,e.infoData.service_money=t.data.service_money,e.infoData.reward_money=t.data.reward_money,e.infoData.reward_type=String(t.data.reward_type),e.infoData.service_type=String(t.data.service_type),e.infoData.pay_type=t.data.pay_type.map(function(e){return"false"!==e&&("true"===e||void 0)})})},send:function(){var e=this;i.save(this.infoData).then(function(t){e.info(),e.$message.success("修改成功")})}},created:function(){this.info()}}},582:function(e,t,a){}}]);