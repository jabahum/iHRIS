(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["report"],{"2fc5":function(t,e,r){"use strict";r.r(e);var o,n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ihris-template",{key:t.$route.path},[t._v(" Loading... ")])},a=[],i=(r("d3b7"),r("a026")),p={name:"fhir-report",props:["report"],data:function(){return{}},created:function(){this.$route.params&&this.$route.params.report?o=this.$route.params.report:this.report&&(o=this.report),this.getTemplate()},methods:{getTemplate:function(){var t=this;fetch("/config/report/"+o).then((function(e){e.json().then((function(e){i["a"].component("ihris-template",{name:"ihris-template",data:function(){return{reportData:e.reportData,dataURL:e.dataURL,terms:{}}},components:{"ihris-report":function(){return Promise.all([r.e("fhir-main~fhir-search~mhero"),r.e("fhir-search")]).then(r.bind(null,"2e2c"))},"ihris-search-term":function(){return Promise.all([r.e("fhir-main~fhir-search~mhero"),r.e("fhir-search")]).then(r.bind(null,"d604"))}},template:e.reportTemplate,methods:{searchData:function(t,e){this.$set(this.terms,t,e)}}}),t.$forceUpdate(),console.log("updated template")})).catch((function(e){console.log(e),i["a"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this report</p>.</div>"}),t.$forceUpdate()}))})).catch((function(e){console.log(e),i["a"].component("ihris-template",{template:"<div><h1>Error</h1><p>An error occurred trying to load this report</p>.</div>"}),t.$forceUpdate()}))}},components:{},beforeCreate:function(){i["a"].component("ihris-template",{template:"<div>Loading...</div>"})}},c=p,h=r("2877"),s=Object(h["a"])(c,n,a,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=report.0c8d6291.js.map