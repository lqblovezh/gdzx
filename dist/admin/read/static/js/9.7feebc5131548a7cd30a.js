(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1030:function(t,e,i){"use strict";i.r(e);var a=i(1117),s=i(504);for(var r in s)"default"!==r&&function(t){i.d(e,t,function(){return s[t]})}(r);i(1031);var o=i(0),n=Object(o.a)(s.default,a.a,a.b,!1,null,null,null);e.default=n.exports},1031:function(t,e,i){"use strict";var a=i(506);i.n(a).a},1032:function(t,e,i){"use strict";var a=i(507);i.n(a).a},1083:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index clearfix"},[i("div",{staticClass:"dialogs"},[t.moveToOtherDiaolog?i("MoveGroup",{attrs:{currGroup:t.currGroup,groupList:t.groupList},on:{back:function(e){t.moveToOtherDiaolog=!1},submit:t.moveToSubmit}}):t._e(),t.upShelfDiaolog?i("Grounding",{on:{back:function(e){t.upShelfDiaolog=!1},upShelf:t.upShelf}}):t._e(),t.previewArticleDialog?i("PreviewArticle",{attrs:{item:t.detailData},on:{cancle:function(e){t.previewArticleDialog=!1}}}):t._e(),t.detailDialog?i("el-dialog",{attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(e){t.detailDialog=e}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[i("Detail",{attrs:{typeDetail:"课件",type:t.detailDialoaType,detailData:t.detailData,services:t.services},on:{back:function(e){t.detailDialog=!1},change:t.change,delete:t.delVersion}})],1),i("div",{staticClass:"dialog-footer btns",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.detailDialog=!1}}},[t._v("取消")])],1)]):t._e()],1),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap"},[i("div",{staticClass:"title"}),i("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),t._m(0),i("span",{staticClass:"group-inline right"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.query}},[t._v("搜索")])],1)])]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[t._v("全部 "),t.page?i("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.moveToOther}},[t._v("移动分组")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.showUpShelf(null,!0)}}},[t._v("上架")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.downShelf()}}},[t._v("下架")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.delChoosen()}}},[t._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"table-check"},[i("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),i("th",[t._v("名称")]),i("th",[t._v("作者")]),i("th",[t._v("标签")]),i("th",{attrs:{width:"150"}},[t._v("创建时间")]),i("th",{attrs:{width:"70"}},[t._v("上架状态")]),i("th",{attrs:{width:"70"}},[t._v("使用版本")]),i("th",{attrs:{width:"80"}},[t._v("操作")])])]),t.list?i("tbody",t._l(t.list,function(e){return e.books_info?i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("th",[i("img",{staticClass:"cover-photo",attrs:{src:e.books_info.img_src}}),i("div",{staticClass:"th-name bookName",attrs:{title:e.books_info.name}},[t._v(t._s(e.books_info.name))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.books_info.author))])]),i("th",[i("div",{staticClass:"th-name",attrs:{title:e.books_info.tag}},[t._v(t._s(e.books_info.tag))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.create_time))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.status_name))])]),i("th",["0"!=e.status?i("div",{staticClass:"th-name"},[t._v(t._s(e.version_id))]):t._e(),"0"==e.status?i("div",{staticClass:"th-name"},[i("select",{on:{change:function(i){return t.versionChage(i,e)}}},t._l(e.version_list,function(a,s){return i("option",{domProps:{value:a,selected:e.version_id==s}},[t._v(t._s(s))])}),0)]):t._e()]),i("th",[i("div",{staticClass:"btns"},["1"!=e.status?i("Icon",{attrs:{type:"icon-wms_msgComment",title:"设置"},on:{click:function(i){return t.putSet(e)}}}):t._e(),"0"!=e.status?i("Icon",{attrs:{type:"icon-reject",size:"mini",title:"下架"},on:{click:function(i){return t.downShelf(e.id)}}}):t._e(),"0"==e.status?i("Icon",{attrs:{type:"icon-upload",title:"上架"},on:{click:function(i){return t.showUpShelf(e)}}}):t._e(),i("Icon",{attrs:{type:"icon-detail",title:"预览"},on:{click:function(i){return t.preArt(e)}}})],1)])]):t._e()}),0):t._e()]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),t.pustSetDialog?i("el-dialog",{attrs:{title:"价格设置",visible:t.pustSetDialog,width:"500px"},on:{"update:visible":function(e){t.pustSetDialog=e}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"pustSetForm"},[i("form",{attrs:{id:"pustSetForm"}},[i("div",{staticClass:"group"},[i("span",{staticClass:"left"},[t._v("组名称")]),i("span",{staticClass:"right"},[t._v("价格")]),i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currentPut.id}})]),t._l(t.currentPut.theme_extend_list,function(e,a){return i("div",{staticClass:"group"},[i("span",{staticClass:"left",domProps:{textContent:t._s(e.version_id)}}),i("span",{staticClass:"right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"item.price"}],staticClass:"form-control info",attrs:{name:"prices",disabled:e.is_put},domProps:{value:e.price},on:{input:function(i){i.target.composing||t.$set(e,"price",i.target.value)}}}),i("input",{staticClass:"hide",attrs:{name:"ids",disabled:e.is_put},domProps:{value:e.xread_book_id}})])])})],2)])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small",type:"info"},on:{click:function(e){t.pustSetDialog=!1}}},[t._v("取消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.pustSetSave}},[t._v("确定")])],1)]):t._e()],1),i("div",{staticClass:"gruopList"},[i("GroupList",{attrs:{groupList:t.groupList,currGroup:t.currGroup},on:{addGroup:t.addGroup,updateGroup:t.updateGroup,delGroup:t.delGroup,groupChange:t.groupChange}})],1)])])])])])},s=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"group-inline"},[e("select",{staticClass:"form-control width-small",attrs:{placeholder:"标签",name:"status"}},[e("option",{attrs:{value:""}},[this._v("选择状态")]),e("option",{attrs:{value:"1"}},[this._v("已上架")]),e("option",{attrs:{value:"0"}},[this._v("未上架")])])])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},1117:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[i("div",{staticClass:"mask"},[i("div",{staticClass:"phoneWrap"},[i("div",{staticClass:"phone"},[i("div",{staticClass:"close",attrs:{type:"info"},on:{click:function(e){return t.$emit("cancle")}}}),i("div",{staticClass:"content"},[i("div",{staticClass:"phoneTop"},[t._v("公众号")]),i("div",{staticClass:"main"},[i("div",{staticClass:"title"},[t._v(t._s(t.html.title))]),i("div",{staticClass:"msg"},[i("span",{staticClass:"time"},[t._v(t._s(t.html.time))]),i("span",{staticClass:"author"},[t._v(t._s(t.html.author))])]),i("div",{staticClass:"rich",domProps:{innerHTML:t._s(t.html.preview)}})])])])])])])},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},254:function(t,e,i){"use strict";i.r(e);var a=i(1083),s=i(502);for(var r in s)"default"!==r&&function(t){i.d(e,t,function(){return s[t]})}(r);i(1032);var o=i(0),n=Object(o.a)(s.default,a.a,a.b,!1,null,"56272156",null);e.default=n.exports},299:function(t,e,i){"use strict";i.r(e);var a=i(300),s=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);e.default=s.a},300:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},r=i(289),o=(a=r)&&a.__esModule?a:{default:a},n=(i(290),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(334)));e.default={props:["pustSetDialog","putData"],data:function(){return{services:n,currentPut:null,radio2:"2",radio:"1",currType:"1",currIndex:"books",putDetailData:{},twoList:{value:"",list:[]},oneList:{value:"",list:[]},threeList:{value:"",list:[]}}},created:function(){log(this.putData),this.setDate()},methods:{setDate:function(){var t=this.putData.prices;for(var e in t)if(t[e]&&t[e].chapters&&t[e].chapters.length>0){switch(this.currIndex=e,e){case"books":this.currType="1";break;case"pictures":this.currType="2";break;case"audios":this.currType="3";break;case"videos":this.currType="4";break;case"resources":this.currType="5";break;default:this.currType="1"}break}this.currentPut=this.putData,this.putDetailData.books_free_ids=this.getFreeids(t.books),this.putDetailData.pictures_free_ids=this.getFreeids(t.pictures),this.putDetailData.audios_free_ids=this.getFreeids(t.audios),this.putDetailData.videos_free_ids=this.getFreeids(t.videos),this.putDetailData.resources_free_ids=this.getFreeids(t.resources),this.putDetailData.books_all_price=t.books&&t.books.price||"",this.putDetailData.picture_all_price=t.pictures&&t.pictures.price||"",this.putDetailData.audio_all_price=t.audios&&t.audios.price||"",this.putDetailData.video_all_price=t.videos&&t.videos.price||"",this.putDetailData.resources_all_price=t.resources&&t.resources.price||"",this.radio2=this.putData.prices.books&&this.putData.prices.books.price_type?this.putData.prices.books.price_type.toString():1,this.putDetailData.put_audio=this.putData.put_audio,this.putDetailData.put_video=this.putData.put_video,this.oneList.list=this.putData.book_store.cate_list,this.oneList.value=this.getValue(this.oneList.list),this.twoList.list=this.getTwoList(this.putData.book_store.cate_list),this.twoList.value=this.getValue(this.twoList.list),this.threeList.list=this.putData.book_store.head_book,this.threeList.value=this.getValue(this.threeList.list)},getValue:function(t){var e=t.find(function(t){return t.is_select});return e?e.id:null},getFreeids:function(t){var e=[];if(!t||!t.chapters)return[];var i=t.chapters,a=!0,s=!1,r=void 0;try{for(var o,n=i[Symbol.iterator]();!(a=(o=n.next()).done);a=!0){var l=o.value;0==l.price&&e.push(l.id)}}catch(t){s=!0,r=t}finally{try{!a&&n.return&&n.return()}finally{if(s)throw r}}return e},getTwoList:function(t){var e=[];if(!t)return[];var i=!0,a=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var n=r.value;n.is_select&&n.children&&(e=n.children)}}catch(t){a=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(a)throw s}}return e},oneChange:function(t){var e=this.oneList.list.find(function(e){return e.id===t}).children;this.twoList.list=e||[],this.twoList.value=e.length?e[0].id:""},noFree:function(t,e){var i=this.putDetailData[this.currIndex+"_free_ids"],a=this.currentPut.prices[this.currIndex].chapters.findIndex(function(e){return e.id===t}),s=i.indexOf(t);s>-1&&i.splice(s,1);var r=this.currentPut.prices[this.currIndex].chapters[a].old_price;this.currentPut.prices[this.currIndex].chapters[a].price=r>0?r:null},free:function(t,e){var i=this.putDetailData[this.currIndex+"_free_ids"],a=this.currentPut.prices[this.currIndex].chapters.findIndex(function(e){return e.id===t}),s=i.indexOf(t);s>-1&&i.splice(s,1),i.push(t),this.currentPut.prices[this.currIndex].chapters[a].price="0"},pustSetSave:function(){var t=this,e=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),i=(0,o.default)(document.getElementById("pustSetForm"),{hash:!0});log(i,this.threeList.value),this.services.putSave(s({},this.putDetailData,{book_id:this.currentPut.product_id},i,{put_audio:i.put_audio,put_video:i.put_video,category_id:i.put_category?0==this.twoList.list.length?this.oneList.value:this.twoList.value:"",head_book_id:i.put_head_book?this.threeList.value:""})).then(function(i){e.close(),t.$emit("save")}).catch(function(i){var a=i.payload;for(var s in e.close(),a.messages){t.$message.error(a.messages[s]);break}})},changeCurrType:function(t,e){this.currType=e,this.currIndex=t},computePrice:function(){var t=this,e=document.querySelector("."+this.currIndex+"_all_price").value;log(e);var i=(0,o.default)(document.getElementById("pustSetForm"),{hash:!0}),a=this.putDetailData[this.currIndex+"_free_ids"];if(!e)return this.$message.error("请填写价格");this.services.computePrice({book_id:this.currentPut.product_id,type:i.books_type,resource_type:this.currType,all_price:e,id:a}).then(function(e){t.currentPut.prices[t.currIndex]=e.data})},getText:function(t){switch(this.currIndex){case"pictures":return"图片"+t;case"audios":return"音频"+t;case"videos":return"视频"+t;case"resources":return"资源"+t;case"books":default:return"章节"+t}},clickChebox:function(t){this.currentPut[t]=this.currentPut[t]>0?"0":"1"},handleClose:function(){this.$emit("close")}},computed:{constitute:function(){var t=this.currentPut.prices[this.currIndex];return"books"==this.currIndex?t?t.chapters:[]:t&&t.chapters||[]}},watch:{putData:function(){this.setDate()}}}},301:function(t,e,i){},324:function(t,e,i){"use strict";i.r(e);var a=i(329),s=i(299);for(var r in s)"default"!==r&&function(t){i.d(e,t,function(){return s[t]})}(r);i(325);var o=i(0),n=Object(o.a)(s.default,a.a,a.b,!1,null,"d16a1812",null);e.default=n.exports},325:function(t,e,i){"use strict";var a=i(301);i.n(a).a},329:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[t.pustSetDialog?i("el-dialog",{attrs:{title:"上架设置",visible:t.pustSetDialog,width:"1000px",top:"50px","before-close":t.handleClose}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"上架设置",name:"detail"}})],1),t.putData.version_list?i("div",{staticClass:"choiceVersion"},[i("span",[t._v("版本选择")]),t._v(" "),i("select",{on:{change:function(e){return t.$emit("change",e,t.putData)}}},t._l(t.putData.version_list,function(e,a){return i("option",{domProps:{value:e,selected:t.putData.version_id==a}},[t._v(t._s(a))])}),0)]):t._e(),i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"pustSetForm"},[i("form",{attrs:{id:"pustSetForm"}},[i("div",{staticClass:"group constiuteGroup"},[i("div",{staticClass:"label"},[t._v("图书构成:")]),i("span",{staticClass:"constiute"},[t.currentPut.prices.books?i("span",{staticClass:"li",class:{isCurrType:"1"==t.currType},on:{click:function(e){return t.changeCurrType("books","1")}}},[t._v("阅读")]):t._e(),t.currentPut.prices.resources?i("span",{staticClass:"li",class:{isCurrType:"5"==t.currType},on:{click:function(e){return t.changeCurrType("resources","5")}}},[t._v("资源")]):t._e(),t.currentPut.prices.audios?i("span",{staticClass:"li",class:{isCurrType:"3"==t.currType},on:{click:function(e){return t.changeCurrType("audios","3")}}},[t._v("音频")]):t._e(),t.currentPut.prices.videos?i("span",{staticClass:"li",class:{isCurrType:"4"==t.currType},on:{click:function(e){return t.changeCurrType("videos","4")}}},[t._v(" 视频")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.computePrice()}}},[t._v("计算价格")])],1),i("div",{staticClass:"line"}),i("div",{staticClass:"headerNav"},[i("div",{staticClass:"left",attrs:{id:"all_price"}},[i("span",{domProps:{textContent:t._s(t.getText("合集定价:"))}}),i("input",{directives:[{name:"show",rawName:"v-show",value:"books"==t.currIndex,expression:'currIndex=="books"'},{name:"model",rawName:"v-model",value:t.putDetailData.books_all_price,expression:"putDetailData.books_all_price"}],staticClass:"form-control books_all_price",attrs:{type:"text",name:"books_all_price"},domProps:{value:t.putDetailData.books_all_price},on:{input:function(e){e.target.composing||t.$set(t.putDetailData,"books_all_price",e.target.value)}}}),i("input",{directives:[{name:"show",rawName:"v-show",value:"resources"==t.currIndex,expression:'currIndex=="resources"'},{name:"model",rawName:"v-model",value:t.putDetailData.resources_all_price,expression:"putDetailData.resources_all_price"}],staticClass:"form-control resources_all_price",attrs:{type:"text",name:"resources_all_price"},domProps:{value:t.putDetailData.resources_all_price},on:{input:function(e){e.target.composing||t.$set(t.putDetailData,"resources_all_price",e.target.value)}}}),i("input",{directives:[{name:"show",rawName:"v-show",value:"audios"==t.currIndex,expression:'currIndex=="audios"'},{name:"model",rawName:"v-model",value:t.putDetailData.audio_all_price,expression:"putDetailData.audio_all_price"}],staticClass:"form-control audios_all_price",attrs:{type:"text",name:"audio_all_price"},domProps:{value:t.putDetailData.audio_all_price},on:{input:function(e){e.target.composing||t.$set(t.putDetailData,"audio_all_price",e.target.value)}}}),i("input",{directives:[{name:"show",rawName:"v-show",value:"videos"==t.currIndex,expression:'currIndex=="videos"'},{name:"model",rawName:"v-model",value:t.putDetailData.video_all_price,expression:"putDetailData.video_all_price"}],staticClass:"form-control videos_all_price",attrs:{type:"text",name:"video_all_price"},domProps:{value:t.putDetailData.video_all_price},on:{input:function(e){e.target.composing||t.$set(t.putDetailData,"video_all_price",e.target.value)}}}),i("span",[t._v("元")])]),i("div",{staticClass:"right"},[i("span",{domProps:{textContent:t._s(t.getText("定价策略:"))}}),"books"!=t.currIndex?i("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("平均定价")]):t._e(),"books"==t.currIndex?i("el-radio",{attrs:{label:"1",name:"books_type"},model:{value:t.radio2,callback:function(e){t.radio2=e},expression:"radio2"}},[t._v("平均定价")]):t._e(),"books"==t.currIndex?i("el-radio",{attrs:{label:"2",name:"books_type"},model:{value:t.radio2,callback:function(e){t.radio2=e},expression:"radio2"}},[t._v("篇幅定价")]):t._e()],1)]),t.currentPut?i("div",{staticClass:"tableBox"},[i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{domProps:{textContent:t._s(t.getText("名称"))}}),i("th",{domProps:{textContent:t._s(t.getText("价格"))}}),i("th",[t._v("操作")])])]),i("tbody",t._l(t.constitute,function(e,a){return i("tr",["books"==t.currIndex?i("td",[i("div",{staticClass:"th-name"},[t._v(t._s(e.name))])]):t._e(),"books"==t.currIndex?i("td",[i("div",{staticClass:"th-name"},[t._v(t._s(e.price))])]):t._e(),"books"!=t.currIndex?i("td",[i("div",{staticClass:"th-name"},[t._v(t._s(e.name))])]):t._e(),"books"!=t.currIndex?i("td",[i("div",{staticClass:"th-name"},[t._v(t._s(e.price))])]):t._e(),i("td",[i("div",{staticClass:"th-name"},[0==e.price?i("el-button",{attrs:{size:"mini","data-type":"free",type:"primary",plain:""},domProps:{textContent:t._s("已免费")},on:{click:function(i){return t.noFree(e.id,i)}}},[t._v("已免费")]):t._e(),0!=e.price?i("el-button",{attrs:{size:"mini","data-type":"nofree",type:"primary",plain:""},domProps:{textContent:t._s(t.getText("免费"))},on:{click:function(i){return t.free(e.id,i)}}}):t._e()],1)])])}),0)])]):t._e(),i("div",{staticClass:"line"})]),i("div",{staticClass:"group putPlate"},[i("label",{staticClass:"label"},[t._v("上架板块:")]),t.currentPut.prices.audios?i("div",{staticClass:"div"},[i("input",{ref:"put_audio",attrs:{type:"checkbox",name:"put_audio",disabled:t.currentPut.audios_disabled,value:"1"},domProps:{checked:t.currentPut.put_audio>0},on:{click:function(e){return t.clickChebox("put_audio")}}}),i("span",[t._v("听读")])]):t._e(),t.currentPut.prices.videos?i("div",{staticClass:"div"},[i("input",{ref:"put_video",attrs:{type:"checkbox",name:"put_video",disabled:t.currentPut.videos_disabled,value:"1"},domProps:{checked:t.currentPut.put_video>0},on:{click:function(e){return t.clickChebox("put_video")}}}),i("span",[t._v("视读")])]):t._e(),i("div",{staticClass:"div"},[i("input",{ref:"put_category",attrs:{type:"checkbox",name:"put_category",value:"1"},domProps:{checked:t.currentPut.put_category>0},on:{click:function(e){return t.clickChebox("put_category")}}}),i("span",[t._v("书城分类")]),t.oneList.list?i("el-select",{staticClass:"select",attrs:{name:"category_id"},on:{change:function(e){return t.oneChange(e)}},model:{value:t.oneList.value,callback:function(e){t.$set(t.oneList,"value",e)},expression:"oneList.value"}},t._l(t.oneList.list,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1):t._e(),t.twoList.list.length?i("el-select",{staticClass:"select",attrs:{name:"category_id"},model:{value:t.twoList.value,callback:function(e){t.$set(t.twoList,"value",e)},expression:"twoList.value"}},t._l(t.twoList.list,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1):t._e()],1),i("div",{staticClass:"div"},[i("input",{ref:"put_head_book",attrs:{type:"checkbox",name:"put_head_book",value:"1"},domProps:{checked:t.currentPut.put_head_book>0},on:{click:function(e){return t.clickChebox("put_head_book")}}}),i("span",[t._v("书城头部")]),t.threeList.list?i("el-select",{staticClass:"select",attrs:{name:"head_book_id"},model:{value:t.threeList.value,callback:function(e){t.$set(t.threeList,"value",e)},expression:"threeList.value"}},t._l(t.threeList.list,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1):t._e()],1)]),i("div",{staticClass:"line"}),i("div",{staticClass:"group putPlate"},[i("label",{staticClass:"label"},[t._v("分销设置:")]),i("div",{staticClass:"div"},[i("input",{ref:"distribute",attrs:{type:"checkbox",id:"fenxiao",name:"distribute",value:"1"},domProps:{checked:t.currentPut.distribute>0},on:{click:function(e){return t.clickChebox("distribute")}}}),i("label",{attrs:{for:"fenxiao"}},[t._v("启用分销")])])])])])],1),i("div",{staticClass:"dialog-footer btns",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){return t.$emit("close")}}},[t._v("取消")]),"1"!=t.putData.status?i("el-button",{attrs:{type:"primary"},on:{click:t.pustSetSave}},[t._v("确定")]):t._e()],1)],1)]):t._e()],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},502:function(t,e,i){"use strict";i.r(e);var a=i(503),s=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);e.default=s.a},503:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s=v(i(333)),r=(v(i(289)),i(290)),o=v(i(365)),n=v(i(335)),l=v(i(324)),u=d(i(691)),c=(d(i(77)),i(44)),p=v(i(1030));function d(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}function v(t){return t&&t.__esModule?t:{default:t}}e.default={components:{GroupList:s.default,Detail:o.default,MoveGroup:n.default,putSetPage:l.default,PreviewArticle:p.default},mixins:[r.main],data:function(){return{services:u,detailDialog:!1,detailDialoaType:"xq",detailData:null,putDetailData:{},moveToOtherDiaolog:!1,moveIds:null,toId:null,previewArticleDialog:!1,pustSetDialog:!1}},methods:a({setList:function(t){this.setMediaBooklist(t)},setGroupList:function(t){this.setMediaBookGrouplist(t)},setPage:function(t){this.setMediaBooklistPage(t)}},(0,c.mapMutations)(["setMediaBooklist","setMediaBookGrouplist","setMediaBooklistPage"]),{preArt:function(t){this.detailData=t,this.detailData.preview=t.books_info.components.article,this.previewArticleDialog=!0},putSet:function(t){this.currentPut={theme_extend_list:t.theme_extend_list},this.pustSetDialog=!0},pustSetSave:function(){var t=this;this.services.putSave(this.currentPut).then(function(e){t.pustSetDialog=!1,t.getList()})}}),computed:a({},(0,c.mapState)({list:function(t){return t.mediaBook.list},groupList:function(t){return t.mediaBook.groupList},page:function(t){return t.mediaBook.page}}))}},504:function(t,e,i){"use strict";i.r(e);var a=i(505),s=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);e.default=s.a},505:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);e.default=t}(i(77));e.default={props:["item"],created:function(){var t=this.item;log(t.preview);var e=t.preview,i=t.name,a=t.author,s=t.create_time;this.html={preview:e,title:i,author:a,time:s}},mounted:function(){},data:function(){return{showImgUrl:null,html:{}}},methods:{test:function(){}}}},506:function(t,e,i){},507:function(t,e,i){}}]);