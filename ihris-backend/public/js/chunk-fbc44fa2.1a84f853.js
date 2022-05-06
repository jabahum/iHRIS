(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fbc44fa2"],{"0fd9":function(t,a,e){"use strict";e("99af"),e("4160"),e("caad"),e("13d5"),e("4ec9"),e("b64b"),e("d3b7"),e("ac1f"),e("2532"),e("3ca3"),e("5319"),e("159b"),e("ddb0");var n=e("ade3"),i=e("5530"),r=(e("4b85"),e("a026")),s=e("d9f7"),o=e("80d2"),c=["sm","md","lg","xl"],u=["start","end","center"];function l(t,a){return c.reduce((function(e,n){return e[t+Object(o["F"])(n)]=a(),e}),{})}var d=function(t){return[].concat(u,["baseline","stretch"]).includes(t)},f=l("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(u,["space-between","space-around"]).includes(t)},g=l("justify",(function(){return{type:String,default:null,validator:v}})),h=function(t){return[].concat(u,["space-between","space-around","stretch"]).includes(t)},b=l("alignContent",(function(){return{type:String,default:null,validator:h}})),m={align:Object.keys(f),justify:Object.keys(g),alignContent:Object.keys(b)},p={align:"align",justify:"justify",alignContent:"align-content"};function w(t,a,e){var n=p[t];if(null!=e){if(a){var i=a.replace(t,"");n+="-".concat(i)}return n+="-".concat(e),n.toLowerCase()}}var j=new Map;a["a"]=r["default"].extend({name:"v-row",functional:!0,props:Object(i["a"])(Object(i["a"])(Object(i["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},g),{},{alignContent:{type:String,default:null,validator:h}},b),render:function(t,a){var e=a.props,i=a.data,r=a.children,o="";for(var c in e)o+=String(e[c]);var u=j.get(o);return u||function(){var t,a;for(a in u=[],m)m[a].forEach((function(t){var n=e[t],i=w(a,t,n);i&&u.push(i)}));u.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(n["a"])(t,"align-".concat(e.align),e.align),Object(n["a"])(t,"justify-".concat(e.justify),e.justify),Object(n["a"])(t,"align-content-".concat(e.alignContent),e.alignContent),t)),j.set(o,u)}(),t(e.tag,Object(s["a"])(i,{staticClass:"row",class:u}),r)}})},"2fa4":function(t,a,e){"use strict";e("20f6");var n=e("80d2");a["a"]=Object(n["j"])("spacer","div","v-spacer")},"4bc5":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-main",[e("v-row",{staticStyle:{height:"100vh"},attrs:{align:"center",justify:"center"}},[e("v-col",[e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-avatar",{attrs:{size:"100"}},[e("img",{attrs:{src:"/images/logo.png",alt:"NHWR"}})])],1),e("v-row",{staticClass:"mt-4 mb-4",attrs:{align:"center",justify:"center"}},[e("h2",[t._v("National Health Workers Registry")])]),e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-card",{attrs:{"min-width":"500px"}},[e("v-card-title",{staticClass:"info white--text"},[e("v-row",{attrs:{align:"center",justify:"center"}},[e("h4",[t._v("Request Password Reset")])])],1),e("v-divider"),e("v-card-text",[e("v-form",{ref:"requestPasswordResetForm",staticClass:"elevation-0",attrs:{"lazy-validation":""},model:{value:t.isValid,callback:function(a){t.isValid=a},expression:"isValid"}},[e("v-text-field",{attrs:{label:"Email",filled:""},model:{value:t.form.email,callback:function(a){t.$set(t.form,"email",a)},expression:"form.email"}})],1)],1),e("v-divider"),e("v-card-actions",[e("v-snackbar",{attrs:{absolute:t.absolute,color:"secondary"},model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[t._v(" "+t._s(t.message)+" "),e("v-btn",{attrs:{color:"warning",text:""},on:{click:function(a){t.snackbar=!1}}},[t._v("Close")])],1),e("v-spacer"),e("v-btn",{staticClass:"mx-2",attrs:{color:"success",loading:t.loggingin,disabled:t.loggingin},on:{click:t.submit}},[t._v("Submit")])],1)],1)],1)],1)],1)],1)},i=[],r=(e("d3b7"),e("3ca3"),e("ddb0"),e("2b3d"),{name:"request-password-reset",data:function(){return{dialog:!1,loggingin:!1,message:"",snackbar:!1,form:{email:""},absolute:!0}},methods:{submit:function(){var t=this;this.loggingin=!0;var a=new URLSearchParams;a.append("email",this.form.email),this.$refs.requestPasswordResetForm.validate(),fetch("/auth/password-reset-request",{method:"POST",body:a}).then((function(t){return t.json()})).then((function(a){t.loggingin=!1,a.ok,t.message=a.message,t.snackbar=!0})).catch((function(a){t.loggingin=!1,t.message=a,t.snackbar=!0}))}}}),s=r,o=e("2877"),c=e("6544"),u=e.n(c),l=e("8212"),d=e("8336"),f=e("b0af"),v=e("99d9"),g=e("62ad"),h=e("ce7e"),b=e("4bd4"),m=e("0fd9"),p=e("2db4"),w=e("2fa4"),j=e("8654"),y=Object(o["a"])(s,n,i,!1,null,null,null);a["default"]=y.exports;u()(y,{VAvatar:l["a"],VBtn:d["a"],VCard:f["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VCol:g["a"],VDivider:h["a"],VForm:b["a"],VRow:m["a"],VSnackbar:p["a"],VSpacer:w["a"],VTextField:j["a"]})},"4bd4":function(t,a,e){"use strict";e("4de4"),e("7db0"),e("4160"),e("caad"),e("07ac"),e("2532"),e("159b");var n=e("5530"),i=e("58df"),r=e("7e2b"),s=e("3206");a["a"]=Object(i["a"])(r["a"],Object(s["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(i){i&&(a.errorBag.hasOwnProperty(t._uid)||(n.valid=e(t)))})):n.valid=e(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-fbc44fa2.1a84f853.js.map