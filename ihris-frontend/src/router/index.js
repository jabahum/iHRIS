import Vue from "vue"
import VueRouter from "vue-router"
import SignIn from "../views/auth/login.vue";
import VerifyOtp from "../views/auth/verify-otp.vue";
import Dashboard from "../views/dashboard.vue";


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn
  },
  {
    path: '/verifyOtp',
    name: 'verifyOtp',
    component: VerifyOtp
  },
  {
    path: "/home",
    name: "home",
    component: Dashboard,
    children: [

      {
        path: "/dashboard/:id",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "dashboard" */ "../views/kibana-dashboard.vue")
      },

      {
        path: "/resource/view/:page/:id",
        name: "resource_view",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "resource" */ "../views/fhir-page-view.vue")
      },
      {
        path: "/resource/search/:page",
        name: "resource_search",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "resource" */ "../views/fhir-page-search.vue")
      },
      {
        path: "/resource/report/:report",
        name: "resource_report",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "report" */ "../views/fhir-report.vue")
      },
      {
        path: "/resource/add/:page",
        name: "resource_add",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "resource-add" */ "../views/fhir-page-add.vue")
      },
      {
        path: "/questionnaire/:questionnaire/:page",
        name: "questionnaire",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "questionnaire" */ "../views/fhir-page-questionnaire.vue")
      },

      {
        path: "/bulk-registration",
        name: "bulk_registration",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "questionnaire" */ "../views/bulk-registration")
      },
    ]
  },

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
