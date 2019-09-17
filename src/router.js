import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { secure: true }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { guest: true }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: { secure: true }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { guest: true }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { secure: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if no token
    if (localStorage.getItem("token") == null) {
      console.log("no token");
      next({
        path: "/login"
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      console.log("no token");
      next({
        path: "/profile"
      });
    }
  } else {
    next();
  }
});
export default router;
