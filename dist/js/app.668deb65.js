(function(e){function t(t){for(var r,s,o=t[0],c=t[1],l=t[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},i=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/kodi-remote-subtitles/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("8a23"),a=n.n(r);a.a},"1edf":function(e,t,n){"use strict";var r=n("e006"),a=n.n(r);a.a},"251f":function(e,t,n){},4678:function(e,t,n){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=i,e.exports=a,a.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"app"}},[n("NavBar"),n("SettingsDialog"),n("v-main",[n("v-container",{staticClass:"router-container",attrs:{fluid:""}},[n("router-view")],1)],1),n("v-footer",{attrs:{app:""}},[e._v(" (c) Anatoly Tarnavsky ")])],1)},i=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-app-bar",{attrs:{app:"",dense:""}},[n("v-btn",{attrs:{icon:""},on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}},[n("v-icon",[e._v("fa-bars")])],1),n("v-toolbar-title",[e._v(" Kodi Remote Subtitles ")]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:e.openSettings}},[n("v-icon",{attrs:{color:e.isConnected?"primary":"red"}},[e._v("fa-cog")])],1)],1),n("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{staticClass:"py-0",attrs:{dense:"",nav:""}},e._l(e.items,(function(t){return n("v-list-item",{key:t.title,attrs:{link:"",to:t.to}},[n("v-list-item-icon",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)],1)})),1)],1)],1)},o=[],c=n("5530"),l={methods:{isMobileBrowser:function(){var e=!1;return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(navigator.userAgent.substr(0,4)))&&(e=!0),e}}},u={DISCONNECTED:"DISCONNECTED",CONNECTING:"CONNECTING",OPEN:"OPEN",CLOSED:"CLOSED"},d=n("2f62"),f={name:"NavBar",mixins:[l],data:function(){return{drawer:null,items:[{title:"Home",icon:"mdi-help-box",to:"/"},{title:"Basic View",icon:"mdi-image",to:"/basic"},{title:"Advanced View",icon:"mdi-view-dashboard",to:"/advanced-list"}]}},computed:Object(c["a"])(Object(c["a"])({},Object(d["c"])("kodi",["connectionState"])),{},{isConnected:function(){return this.connectionState===u.OPEN}}),methods:{openSettings:function(){this.$bus.$emit("settings-modal:open")}},components:{}},m=f,p=n("2877"),b=n("6544"),v=n.n(b),_=n("40dc"),T=n("8336"),S=n("132d"),j=n("8860"),g=n("da13"),E=n("5d23"),O=n("34c3"),h=n("f774"),w=n("2fa4"),N=n("2a7f"),C=Object(p["a"])(m,s,o,!1,null,null,null),y=C.exports;v()(C,{VAppBar:_["a"],VBtn:T["a"],VIcon:S["a"],VList:j["a"],VListItem:g["a"],VListItemContent:E["a"],VListItemIcon:O["a"],VListItemTitle:E["b"],VNavigationDrawer:h["a"],VSpacer:w["a"],VToolbarTitle:N["a"]});var k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Kodi Settings")])]),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{col:"12"}},[e._v(" Connection state: "+e._s(e.connectionState)+" ")]),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:"Kodi address ip:port",required:""},model:{value:e.kodiIpPort,callback:function(t){e.kodiIpPort=t},expression:"kodiIpPort"}}),n("v-btn",{attrs:{small:"",color:"primary",dark:""},on:{click:e.CONNECT}},[e._v("Connect")])],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("Save and Close")])],1)],1)],1)},I=[],P={data:function(){return{dialog:!1}},computed:Object(c["a"])(Object(c["a"])({},Object(d["c"])("kodi",["getKodiIpPort","connectionState"])),{},{kodiIpPort:{get:function(){return console.log("getter called"),this.getKodiIpPort},set:function(e){this.SET_KODI_IP_PORT(e)}}}),methods:Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(d["b"])("kodi",["CONNECT"])),Object(d["d"])("kodi",["SET_KODI_IP_PORT"])),{},{open:function(){this.dialog=!0}}),components:{},mounted:function(){this.$bus.$on("settings-modal:open",this.open)},beforeDestroy:function(){this.$bus.$off("settings-modal:open")}},A=P,x=n("b0af"),R=n("99d9"),L=n("62ad"),G=n("a523"),U=n("169a"),D=n("0fd9"),V=n("8654"),M=Object(p["a"])(A,k,I,!1,null,null,null),B=M.exports;v()(M,{VBtn:T["a"],VCard:x["a"],VCardActions:R["a"],VCardText:R["b"],VCardTitle:R["c"],VCol:L["a"],VContainer:G["a"],VDialog:U["a"],VRow:D["a"],VSpacer:w["a"],VTextField:V["a"]});var Y={name:"App",components:{NavBar:y,SettingsDialog:B}},z=Y,K=(n("034f"),n("7496")),$=n("553a"),H=n("f6c4"),F=Object(p["a"])(z,a,i,!1,null,null,null),q=F.exports;v()(F,{VApp:K["a"],VContainer:G["a"],VFooter:$["a"],VMain:H["a"]});var J=n("8c4f"),Q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component-container"},[n("ListView",{ref:"listview",attrs:{"display-subtitles-time":e.displaySubtitlesTime}}),n("div",{staticClass:"buttons-container"},[n("div",{staticClass:"row1-buttons"},[n("v-badge",{attrs:{bordered:"",color:"green",overlap:"",left:"",content:"-15 sec","offset-x":"40"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary",title:""},on:{click:function(t){return e.CHANGE_TO_DELTA_SECONDS(-15)}}},[n("v-icon",[e._v("fa-backward")])],1)],1),n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:e.isPlaying?"red":"green"},on:{click:e.TOGGLE_PLAY_PAUSE}},[e.isPlaying?e._e():n("v-icon",[e._v("fa-play")]),e.isPlaying?n("v-icon",[e._v("fa-pause")]):e._e()],1),n("v-badge",{attrs:{bordered:"",color:"green",overlap:"","offset-x":"40",content:"15 sec"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary"},on:{click:function(t){return e.CHANGE_TO_DELTA_SECONDS(15)}}},[n("v-icon",[e._v("fa-forward")])],1)],1)],1),n("div",{staticClass:"row2-buttons"},[n("v-btn",{staticClass:"mx-2",staticStyle:{margin:"auto"},attrs:{dark:"",large:"",color:"primary"},on:{click:e.scrollToCurrentSubtitles}},[n("v-icon",{staticClass:"ml-2"},[e._v("fa-fast-forward")]),n("v-icon",{staticClass:"ml-2"},[e._v("fa-closed-captioning")])],1),n("v-btn",{staticClass:"mx-2",staticStyle:{margin:"auto"},attrs:{dark:"",large:"",color:"primary"},on:{click:e.pauseAndScrollToCurrentSubtitles}},[n("v-icon",[e._v("fa-pause")]),n("v-icon",{staticClass:"ml-2"},[e._v("fa-fast-forward")]),n("v-icon",{staticClass:"ml-2"},[e._v("fa-closed-captioning")])],1)],1),n("div",{staticClass:"row3-buttons"},[n("v-switch",{attrs:{label:"Display time"},model:{value:e.displaySubtitlesTime,callback:function(t){e.displaySubtitlesTime=t},expression:"displaySubtitlesTime"}}),n("div",{staticStyle:{"margin-top":"auto","margin-bottom":"auto","margin-left":"10px"}},[n("v-btn",{attrs:{color:"success"},on:{click:function(t){return e.$refs.inputUpload.click()}}},[e._v("Upload Subtitles")]),n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"inputUpload",attrs:{type:"file"},on:{change:e.addOriginalSubtitles}})],1)],1)])],1)},W=[],X=(n("96cf"),n("1da1")),Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"scroller-container"},[n("DynamicScroller",{ref:"scroller",staticClass:"scroller",attrs:{items:e.originalSubtitles,"min-item-size":54},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.item,a=t.index,i=t.active;return[n("DynamicScrollerItem",{staticClass:"message",attrs:{item:r,active:i,"size-dependencies":[r.text],"data-index":a,"data-active":i}},[n("ListViewItem",{style:e.highlightedRow===a?"background-color: lightgrey;":"",attrs:{"display-subtitles-time":e.displaySubtitlesTime,"subtitle-row":r},nativeOn:{click:function(t){return e.movePlayerTo(r.start)}}})],1)]}}])})],1)},ee=[],te=n("e508"),ne=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row-container"},[e.displaySubtitlesTime?n("div",{staticClass:"time-container"},[n("div",[e._v(e._s(e.toSrtTime(e.subtitleRow.start)))]),n("div",[e._v(e._s(e.toSrtTime(e.subtitleRow.end)))])]):e._e(),n("div",{staticClass:"text-container"},[n("span",{domProps:{innerHTML:e._s(e.subtitleRow.text)}})])])},re=[],ae=n("046a"),ie={props:{subtitleRow:Object,displaySubtitlesTime:Boolean},data:function(){return{}},watch:{},computed:{},methods:{toSrtTime:ae["b"]},components:{}},se=ie,oe=(n("efb0"),Object(p["a"])(se,ne,re,!1,null,"6590ee9a",null)),ce=oe.exports,le={props:{displaySubtitlesTime:Boolean},data:function(){return{highlightedRow:-1}},watch:{},computed:Object(c["a"])({},Object(d["c"])("subtitles",["originalSubtitles"])),methods:Object(c["a"])(Object(c["a"])({},Object(d["b"])("kodi",["MOVE_TO_SPECIFIC_TIME"])),{},{movePlayerTo:function(e){console.log("double click",e),this.MOVE_TO_SPECIFIC_TIME(e)},scrollToTime:function(e){for(var t=0;t<this.originalSubtitles.length;t++){var n=this.originalSubtitles[t],r=this.originalSubtitles[t+1],a=n.start,i=r?r.start:a+1;if(e>=a&&e<=i)return this.$refs.scroller.scrollToItem(t),void(this.highlightedRow=t);this.highlightedRow=-1}}}),components:{DynamicScroller:te["a"],DynamicScrollerItem:te["b"],ListViewItem:ce}},ue=le,de=(n("1edf"),Object(p["a"])(ue,Z,ee,!1,null,"e317f828",null)),fe=de.exports,me={name:"App",data:function(){return{displaySubtitlesTime:!0}},watch:{},computed:Object(c["a"])(Object(c["a"])({},Object(d["c"])("subtitles",["originalSubtitles"])),Object(d["c"])("kodi",["isPlaying","currentPlayTimeInMilliseconds"])),mounted:function(){this.CONNECT()},methods:Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(d["b"])("subtitles",["addOriginalSubtitles"])),Object(d["b"])("kodi",["TOGGLE_PLAY_PAUSE","CHANGE_TO_DELTA_SECONDS","SYNC_PLAYING_TIME","CONNECT"])),{},{pauseAndScrollToCurrentSubtitles:function(){var e=this;return Object(X["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isPlaying){t.next=3;break}return t.next=3,e.TOGGLE_PLAY_PAUSE();case 3:return t.next=5,e.scrollToCurrentSubtitles();case 5:case"end":return t.stop()}}),t)})))()},scrollToCurrentSubtitles:function(){var e=this;return Object(X["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.SYNC_PLAYING_TIME();case 2:e.$refs.listview.scrollToTime(e.currentPlayTimeInMilliseconds);case 3:case"end":return t.stop()}}),t)})))()}}),components:{ListView:fe}},pe=me,be=(n("666b"),n("4ca6")),ve=n("b73d"),_e=Object(p["a"])(pe,Q,W,!1,null,"a1ef3240",null),Te=_e.exports;v()(_e,{VBadge:be["a"],VBtn:T["a"],VIcon:S["a"],VSwitch:ve["a"]});var Se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-row",{attrs:{align:"start",justify:"center"}},[n("v-badge",{attrs:{bordered:"",color:"green",overlap:"",left:"",content:"-15 sec","offset-x":"40"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary",title:""},on:{click:function(t){return e.CHANGE_TO_DELTA_SECONDS(-15)}}},[n("v-icon",[e._v("fa-backward")])],1)],1),n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:e.isPlaying?"red":"green"},on:{click:e.TOGGLE_PLAY_PAUSE}},[e.isPlaying?e._e():n("v-icon",[e._v("fa-play")]),e.isPlaying?n("v-icon",[e._v("fa-pause")]):e._e()],1),n("v-badge",{attrs:{bordered:"",color:"green",overlap:"","offset-x":"40",content:"15 sec"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary"},on:{click:function(t){return e.CHANGE_TO_DELTA_SECONDS(15)}}},[n("v-icon",[e._v("fa-forward")])],1)],1)],1),n("v-row",{staticClass:"mt-4",attrs:{align:"start",justify:"center"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary"},on:{click:e.INPUT_BACK}},[n("v-icon",[e._v("fa-undo")])],1),n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary"},on:{click:e.TOGGLE_SUBTITLES}},[n("v-icon",[e._v("fa-closed-captioning")])],1)],1),n("v-divider",{staticClass:"mt-5"}),n("v-row",{staticClass:"mt-4",attrs:{align:"start",justify:"center"}},[n("v-btn",{staticClass:"mx-2",attrs:{dark:"",large:"",color:"primary"},on:{click:function(t){return e.MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES(15)}}},[n("v-icon",[e._v("fa-backward")]),n("v-icon",{staticClass:"ml-2"},[e._v("fa-closed-captioning")])],1)],1)],1)],1)],1)},je=[],ge={name:"App",data:function(){return{}},watch:{},computed:Object(c["a"])({},Object(d["c"])("kodi",["connectionState","isPlaying"])),mounted:function(){this.CONNECT()},methods:Object(c["a"])({},Object(d["b"])("kodi",["CONNECT","TOGGLE_PLAY_PAUSE","INPUT_BACK","CHANGE_TO_DELTA_SECONDS","MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES","TOGGLE_SUBTITLES"])),components:{}},Ee=ge,Oe=n("ce7e"),he=Object(p["a"])(Ee,Se,je,!1,null,"1667f4d8",null),we=he.exports;v()(he,{VBadge:be["a"],VBtn:T["a"],VCol:L["a"],VContainer:G["a"],VDivider:Oe["a"],VIcon:S["a"],VRow:D["a"]});var Ne,Ce,ye,ke,Ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Home ")])},Pe=[],Ae={name:"Home",data:function(){return{}},computed:{},methods:{},components:{}},xe=Ae,Re=Object(p["a"])(xe,Ie,Pe,!1,null,"656e30db",null),Le=Re.exports,Ge=[{path:"",component:Le},{path:"/basic",component:we},{path:"/advanced-list",component:Te}],Ue=n("0e44"),De=(n("99af"),n("d81d"),n("d3b7"),n("ac1f"),n("1276"),n("498a"),function(e){var t,n,r=0;for(t=0;t<e.length;t++)n=e.charCodeAt(t),r=(r<<5)-r+n,r|=0;return r}),Ve={namespaced:!0,state:{originalSubtitles:[]},getters:{originalSubtitles:function(e){return e.originalSubtitles}},actions:{addOriginalSubtitles:function(e,t){return Object(X["a"])(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,a=e.dispatch,n.next=3,a("uploadFile",t);case 3:i=n.sent,i=i.map((function(e){return{start:e.start,end:e.end,text:e.text.trim(),id:De("".concat(e.start,"-").concat(e.end,"-").concat(e.text))}})),r("ADD_ORIGINAL_SUBTITLES",i);case 6:case"end":return n.stop()}}),n)})))()},uploadFile:function(e,t){return Object(X["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r=t.target.files||t.dataTransfer.files;if(r.length){var a=r[0],i=new FileReader;i.onload=function(t){var n=t.target.result,r=n.split(",")[1],a=atob(r),i=Object(ae["a"])(a);return e(i)},i.onerror=function(e){return n(e)},i.readAsDataURL(a)}})));case 1:case"end":return e.stop()}}),e)})))()}},mutations:{ADD_ORIGINAL_SUBTITLES:function(e,t){e.originalSubtitles=t}}},Me=n("c1df"),Be=n.n(Me),Ye=(n("4160"),n("b64b"),n("159b"),n("dca8"),n("4478")),ze=n("2909"),Ke=new Proxy(WebSocket,{construct:function(e,t){var n=Object.freeze({0:"CONNECTING",1:"OPEN",2:"CLOSING",3:"CLOSED"}),r=Object(Ye["a"])(e,Object(ze["a"])(t));function a(){r.dispatchEvent(new Event("state")),r.onstate&&"function"===typeof r.onstate&&r.onstate()}r.STATES=n,setTimeout((function(){a()}),0);var i=function(){a()},s=function e(){a(),r.removeEventListener("open",i),r.removeEventListener("close",e)};return r.addEventListener("open",i),r.addEventListener("close",s),r}}),$e={PING:{jsonrpc:"2.0",method:"JSONRPC.Ping",id:"PING"},CURRENT_SPEED:{jsonrpc:"2.0",method:"Player.GetProperties",params:{playerid:1,properties:["speed"]},id:"CURRENT_SPEED"},CURRENT_MOVIE_DETAILS:{jsonrpc:"2.0",id:"CURRENT_MOVIE_DETAILS",method:"Player.GetItem",params:{playerid:1,properties:["art"]}},CURRENT_TIME:{jsonrpc:"2.0",method:"Player.GetProperties",params:{playerid:1,properties:["time"]},id:"CURRENT_TIME"},CHANGE_TO_DELTA_SECONDS:{jsonrpc:"2.0",id:"CHANGE_TO_DELTA_SECONDS",method:"Player.Seek",params:{value:{hours:0,minutes:0,seconds:0,milliseconds:0},playerid:1}},INPUT_BACK:{jsonrpc:"2.0",method:"Input.Back",id:"INPUT_BACK"},TOGGLE_PLAY_PAUSE:{jsonrpc:"2.0",method:"Player.PlayPause",params:{playerid:1},id:"TOGGLE_PLAY_PAUSE"},TOGGLE_SUBTITLES:{jsonrpc:"2.0",method:"Player.SetSubtitle",params:{playerid:1,subtitle:null},id:"SET_SUBTITLE"},IS_SUBTITLES_PLAYING:{jsonrpc:"2.0",method:"Player.GetProperties",params:{playerid:1,properties:["subtitleenabled"]},id:"IS_SUBTITLES_PLAYING"}},He=5e3,Fe={};function qe(){var e=Object.keys(Fe);e.forEach((function(e){var t=performance.now(),n=Fe[e].started;if(t-n>He){var r=Fe[e].reject,a=Error("Timeout of ".concat(He,"ms for request ").concat(e," expired"));console.error(a),r(a),delete Fe[e]}}))}function Je(){Ce.onstate=function(){var e=Ce.STATES[Ce.readyState];ke&&ke(e)},Ce.onmessage=function(e){var t=JSON.parse(e.data),n=t.id;if(Fe[n]){var r=performance.now()-Fe[n].started;t.__duration=r,Fe[n].resolve(t),delete Fe[n]}else ye&&ye(t)}}function Qe(e){Ce.send(JSON.stringify(e))}function We(e,t,n){ye=t,ke=n,Ce&&Xe(),Ce=new Ke(e),Je(),Ne=setInterval(qe,He)}function Xe(){clearInterval(Ne),Ce.close()}function Ze(e){var t=Object.assign({},e),n=new Promise((function(e,n){t.id="".concat(t.id,"-").concat(performance.now()),Fe[t.id]={resolve:e,reject:n,started:performance.now()}}));return Qe(t),n}var et=Ze.bind(null,$e.PING),tt=Ze.bind(null,$e.CURRENT_SPEED),nt=Ze.bind(null,$e.CURRENT_MOVIE_DETAILS),rt=Ze.bind(null,$e.CURRENT_TIME),at=Ze.bind(null,$e.INPUT_BACK),it=Ze.bind(null,$e.TOGGLE_PLAY_PAUSE),st=Ze.bind(null,$e.IS_SUBTITLES_PLAYING);function ot(e,t,n,r){var a=$e.CHANGE_TO_DELTA_SECONDS;return a.params.value.hours=e,a.params.value.minutes=t,a.params.value.seconds=n,a.params.value.milliseconds=r,Ze(a)}function ct(e){var t=$e.TOGGLE_SUBTITLES;return t.params.subtitle=e?"on":"off",Ze(t)}var lt={"Player.OnResume":"Player.OnResume","Player.OnPause":"Player.OnPause","Player.OnAVStart":"Player.OnAVStart","Player.OnStop":"Player.OnStop"},ut={namespaced:!0,state:{kodiIpPort:null,isPlaying:!1,connectionState:u.CLOSED,currentPlayTimeInMilliseconds:0},getters:{getKodiIpPort:function(e){return e.kodiIpPort},connectionState:function(e){return e.connectionState},isPlaying:function(e){return e.isPlaying},currentPlayTimeInMilliseconds:function(e){return e.currentPlayTimeInMilliseconds}},actions:{CONNECT:function(e){var t=e.state,n=e.dispatch,r="ws://".concat(t.kodiIpPort,"/jsonrpc"),a=n.bind(null,"ON_MESSAGE"),i=n.bind(null,"ON_CONNECTION_STATE_CHANGES");We(r,a,i)},DISCONNECT:function(){Xe()},PING:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,et();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))()},REQUEST_CURRENT_SPEED:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,tt();case 2:return t=e.sent,n=t.result.speed,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))()},REQUEST_CURRENT_MOVIE_DETAILS:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,nt();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))()},CHANGE_TO_DELTA_SECONDS:function(e,t){return Object(X["a"])(regeneratorRuntime.mark((function n(){var r,a,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.state,a=e.dispatch,n.next=3,a("SYNC_PLAYING_TIME");case 3:return i=Be.a.duration(r.currentPlayTimeInMilliseconds,"milliseconds"),s=i.clone().add(t,"seconds"),o=s.hours(),c=s.minutes(),l=s.seconds(),u=s.milliseconds(),n.next=11,ot(o,c,l,u);case 11:case"end":return n.stop()}}),n)})))()},REQUEST_CURRENT_TIME:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,rt();case 2:return t=e.sent,n=t.result.time.hours,r=t.result.time.minutes,a=t.result.time.seconds,i=t.result.time.milliseconds,s=1e3*(60*n*60+60*r+a)+i,e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)})))()},INPUT_BACK:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,at();case 2:case"end":return e.stop()}}),e)})))()},TOGGLE_PLAY_PAUSE:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,it();case 2:case"end":return e.stop()}}),e)})))()},TURN_SUBTITLES_ON:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ct(!0);case 2:case"end":return e.stop()}}),e)})))()},TURN_SUBTITLES_OFF:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ct(!1);case 2:case"end":return e.stop()}}),e)})))()},IS_SUBTITLES_PLAYING:function(){return Object(X["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,st();case 2:return t=e.sent,n=t.result.subtitleenabled,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))()},MOVE_TO_SPECIFIC_TIME:function(e,t){return Object(X["a"])(regeneratorRuntime.mark((function n(){var r,a,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,a=e.state,n.next=3,r("SYNC_PLAYING_TIME");case 3:return i=t-a.currentPlayTimeInMilliseconds,s=i/1e3,n.next=7,r("CHANGE_TO_DELTA_SECONDS",s);case 7:case"end":return n.stop()}}),n)})))()},TOGGLE_SUBTITLES:function(e){return Object(X["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.dispatch,t.next=3,n("IS_SUBTITLES_PLAYING");case 3:if(r=t.sent,!r){t.next=9;break}return t.next=7,n("TURN_SUBTITLES_OFF");case 7:t.next=11;break;case 9:return t.next=11,n("TURN_SUBTITLES_ON");case 11:case"end":return t.stop()}}),t)})))()},MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES:function(e,t){return Object(X["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,n.next=3,r("TURN_SUBTITLES_ON");case 3:return n.next=5,r("CHANGE_TO_DELTA_SECONDS",-t);case 5:case"end":return n.stop()}}),n)})))()},SYNC_PLAYING_STATUS:function(e){return Object(X["a"])(regeneratorRuntime.mark((function t(){var n,r,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.dispatch,r=e.commit,a=e.state,a.connectionState===u.OPEN){t.next=4;break}return r("SET_PLAYING_STATUS",!1),t.abrupt("return");case 4:return t.next=6,n("REQUEST_CURRENT_SPEED");case 6:i=t.sent,r("SET_PLAYING_STATUS",0!==i);case 8:case"end":return t.stop()}}),t)})))()},SYNC_PLAYING_TIME:function(e){return Object(X["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.dispatch,r=e.commit,t.next=3,n("REQUEST_CURRENT_TIME");case 3:a=t.sent,r("SET_CURRENT_PLAYING_TIME",a);case 5:case"end":return t.stop()}}),t)})))()},ON_MESSAGE:function(e,t){var n=e.commit,r=e.dispatch,a=t.method;a&&a===lt["Player.OnPause"]||a&&a===lt["Player.OnStop"]?n("SET_PLAYING_STATUS",!1):a&&a===lt["Player.OnResume"]||a&&a===lt["Player.OnAVStart"]?n("SET_PLAYING_STATUS",!0):console.log("UNKNOWN MESSAGE",t),r("SYNC_PLAYING_TIME")},ON_CONNECTION_STATE_CHANGES:function(e,t){var n=e.dispatch,r=e.commit;r("SET_CONNECTION_STATE",t),n("SYNC_PLAYING_STATUS"),t===u.OPEN&&n("SYNC_PLAYING_TIME")}},mutations:{SET_PLAYING_STATUS:function(e,t){e.isPlaying=t},SET_CURRENT_PLAYING_TIME:function(e,t){e.currentPlayTimeInMilliseconds=t},SET_CONNECTION_STATE:function(e,t){e.connectionState=t},SET_KODI_IP_PORT:function(e,t){e.kodiIpPort=t}}};r["a"].use(d["a"]);var dt=new Ue["a"]({paths:["kodi.kodiIpPort"]}),ft=new d["a"].Store({modules:{subtitles:Ve,kodi:ut},plugins:[dt]}),mt=n("f309");n("bf40");r["a"].use(mt["a"]);var pt=new mt["a"]({});r["a"].config.productionTip=!1,r["a"].use(J["a"]),r["a"].use(d["a"]),r["a"].use({install:function(e){e.prototype.$bus=new e}});var bt=new J["a"]({routes:Ge});new r["a"]({render:function(e){return e(q)},router:bt,store:ft,vuetify:pt}).$mount("#app")},"666b":function(e,t,n){"use strict";var r=n("d534"),a=n.n(r);a.a},"8a23":function(e,t,n){},d534:function(e,t,n){},e006:function(e,t,n){},efb0:function(e,t,n){"use strict";var r=n("251f"),a=n.n(r);a.a}});
//# sourceMappingURL=app.668deb65.js.map