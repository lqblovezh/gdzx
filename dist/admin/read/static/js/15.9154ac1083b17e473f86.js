(window.webpackJsonp=window.webpackJsonp||[]).push([[15,41],{1048:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/read/buttons",t)},e.save=function(t){var e=t.id,i=c(t,["id"]);if(e)return(0,n.request_put)(u({id:e}),i);return(0,n.request_post)("/read/buttons",i)},e.detail=function(t){var e=t.id,i=c(t,["id"]);return(0,n.request_get)(u({id:e}),i)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/read/buttons/delete",t)},e.sort=function(t){var e=t.id,i=c(t,["id"]);return(0,n.request_put)(l({id:e}),i)},e.show=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/read/buttons/status",t)};var s,n=i(76),a=i(106),r=(s=a)&&s.__esModule?s:{default:s};function c(t,e){var i={};for(var s in t)e.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s]);return i}var u=r.default.compile("/read/buttons/:id"),l=r.default.compile("/read/buttons/sort/:id")},1049:function(t,e,i){"use strict";var s=i(539);i.n(s).a},1108:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Nav"),i("div",{staticClass:"content"},[t._m(0),i("el-radio",{attrs:{label:1},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[t._v("圆形")]),i("div",{staticClass:"box"},t._l(t.circular,function(e,s){return i("div",{staticClass:"item",on:{click:function(e){return t.update("circular",s,"1")}}},[i("p",{staticClass:"icon",style:{backgroundImage:"url("+e.img_src}}),i("p",{staticClass:"txt"},[t._v(t._s(e.name))])])}),0),i("div",{staticClass:"line"},[t._v("分割线")]),i("el-radio",{attrs:{label:2},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[t._v("方形")]),i("div",{staticClass:"box"},t._l(t.block,function(e,s){return i("div",{staticClass:"item"},[i("el-button",{staticClass:"btn",style:{background:"#ccc url("+e.img_src+") no-repeat 80% center"},on:{click:function(e){return t.update("block",s,"2")}}},[t._v(t._s(e.name))])],1)}),0),i("el-dialog",{attrs:{title:"",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("span",{staticClass:"dialog"},[i("el-form",{ref:"form",attrs:{"label-width":"60px"}},[i("el-form-item",{attrs:{label:"图标 : "}},[i("input",{ref:"icon",staticClass:"hide",attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:function(e){return t.previewImg(e)}}}),i("img",{staticClass:"icon",attrs:{src:t.src_img}}),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.$refs.icon.click()}}},[t._v(" 替换")])],1),i("p",{staticClass:"imgSize"},[i("span",{staticClass:"bannerSize"},[t._v("建议图片大小:126*126px")])]),i("el-form-item",{attrs:{label:"名称 : "}},[i("el-input",{model:{value:t.addlist.name,callback:function(e){t.$set(t.addlist,"name",e)},expression:"addlist.name"}})],1),i("el-form-item",{attrs:{label:"排序 : "}},[i("el-input",{attrs:{type:"number"},model:{value:t.addlist.number,callback:function(e){t.$set(t.addlist,"number",e)},expression:"addlist.number"}})],1),i("el-checkbox",{model:{value:t.addlist.src_status,callback:function(e){t.$set(t.addlist,"src_status",e)},expression:"addlist.src_status"}},[t._v("链接")]),i("el-form-item",{attrs:{label:"https://"}},[i("el-input",{model:{value:t.addlist.src,callback:function(e){t.$set(t.addlist,"src",e)},expression:"addlist.src"}})],1)],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.save()}}},[t._v("确定")])],1)])],1)],1)},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info"},[e("img",{attrs:{src:i(327)}}),e("span",[this._v("系统默认圆形按钮显示4个按钮，名称限制为2-3个汉字，方形按钮显示4-8个，名称限制为3-5汉字。")])])}];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return n})},247:function(t,e,i){"use strict";i.r(e);var s=i(328),n=i(302);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i(326);var r=i(0),c=Object(r.a)(n.default,s.a,s.b,!1,null,"60b6ee89",null);e.default=c.exports},263:function(t,e,i){"use strict";i.r(e);var s=i(1108),n=i(537);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i(1049);var r=i(0),c=Object(r.a)(n.default,s.a,s.b,!1,null,"8fbdbf3a",null);e.default=c.exports},302:function(t,e,i){"use strict";i.r(e);var s=i(303),n=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e.default=n.a},303:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{navTab:[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"栏目设置",href:"/wms/indexSettings/columns",active:""},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href,query:{index:"/wms/indexSettings"}})},checkSrc:function(){var t=!0,e=!1,i=void 0;try{for(var s,n=this.navTab[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var a=s.value;this.$route.path==a.href?a.active="active":"/wms/indexSettings"==this.$route.path?this.navTab[0].active="active":a.active=""}}catch(t){e=!0,i=t}finally{try{!t&&n.return&&n.return()}finally{if(e)throw i}}}},created:function(){this.navTab.push({txt:"盛典设置",href:"/wms/indexSettings/grand",active:""}),log(this.navTab),this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},304:function(t,e,i){},326:function(t,e,i){"use strict";var s=i(304);i.n(s).a},327:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGPSURBVDhPhVO/S8NQEL57TwuZhEhpQRAEoVAsOOkg2oxOddLBraODiILiZGgXUVxc/CMsKAj+BwXBtRgMiEInoeAkDoXX865p07RN2sALvLvv7rsf30MY+fLusW1gdhsJ1wkg23UjtQjImwF68Co339EQjF5y7tk+EJTZlhpN3M2DaIjg0V/5vIO9muna+sCce1oFwuIgEH/Y2exVsMCB6dCH0NBgnXiVSluJMWCOBouVnt6rV0dyOPh5qCKCgqG/Q7Ep6blX9hCG2YP+Ez8s5d3zZSUDS+p5cgIAQ2ZHybTjgWhPS8ANrKlwVePocBOEMBefjLIKkfQ0JmaxkjB63tnYYmcmBtDOOMWvtLOZ7WDHicMgQkvx+vyE7HaHTFkOb2QxDiPqVBpNTRQ2CkDAj74OeM0vsSQaa0q0LfKcNodxAqj7F9eNQMr3uzr3tnTLTIUBUKRMr3InwFX+R4XV1GgdsJR/w7eQd91UIE8sTdQfQF2hdSnBght6jWIQeYrCRCR9Vpm2DAy4Zyk7SvAPCiiObi2O17AAAAAASUVORK5CYII="},328:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"settingsNavTab"},[i("ul",t._l(t.navTab,function(e,s){return i("li",{class:e.active,on:{click:function(e){return t.handleNavClick(s)}}},[t._v(t._s(e.txt))])}),0)]),i("router-view")],1)},n=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return n})},537:function(t,e,i){"use strict";i.r(e);var s=i(538),n=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e.default=n.a},538:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=c(i(15)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(1048)),a=i(77),r=c(i(247));function c(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Nav:r.default},data:function(){return{block:[],circular:[],dialogVisible:!1,iconImg:"",src_img:"",status:"",addlist:{name:"",img:"",number:"",src:"",src_status:!1,type:"",status:!1,id:""}}},created:function(){this.getList()},methods:{getList:function(){var t=this;n.getList().then(function(e){t.block=e.data.block,t.circular=e.data.circular,log(t.block[0]),"true"==t.block[0].status?t.status=2:t.status=1})},update:function(t,e,i){this.addlist.type=i;var s=this[t][e];this.src_img=s.img_src,this.addlist.name=s.name,this.addlist.src=s.src,this.addlist.id=s.id,s.src_status?this.addlist.src_status=!0:this.addlist.src_status=!1,i==this.status?this.addlist.status=!0:this.addlist.status=!1,this.addlist.number=s.number,this.dialogVisible=!0},previewImg:function(t){var e=t.target.files[0];this.src_img=URL.createObjectURL(e)},add:function(t){this.addlist.type=t,this.src_img="",this.addlist.name="",this.addlist.src="",this.addlist.id=null,this.addlist.num="",this.dialogVisible=!0},save:function(){var t,e=(t=s.default.mark(function t(){var e,i,r=this;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(log(this.addlist),e=this.$refs.icon.files[0],i=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),t.prev=3,!e){t.next=7;break}return t.next=7,(0,a.getTask)(e).then(function(t){r.addlist.img=t.data.path});case 7:setTimeout(function(){i.close()},500),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),i.close();case 13:this.dialogVisible=!1,n.save(this.addlist).then(function(t){r.getList()});case 15:case"end":return t.stop()}},t,this,[[3,10]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function s(n,a){try{var r=e[n](a),c=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(c).then(function(t){s("next",t)},function(t){s("throw",t)});t(c)}("next")})});return function(){return e.apply(this,arguments)}}()},watch:{status:function(){1==this.status?n.show({type:1}):2==this.status&&n.show({type:2})}}}},539:function(t,e,i){}}]);