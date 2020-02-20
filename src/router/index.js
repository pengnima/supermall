import Vue from "vue";
import VueRouter from "vue-router";
import { TK, R_TK, getUid, getToken } from "common/const.js";
import { postCheckToken } from "network/login.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("views/home/Home.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import("views/category/Category.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("views/cart/Cart.vue")
  },
  {
    path: "/profile",
    name: "profile",
    beforeEnter(to, from, next) {
      let uid = getUid();
      console.log(uid);
      if (uid) {
        next("/profile/" + uid);
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/profile/:uid",
    name: "profile_uid",
    component: () => import("views/profile/Profile.vue"),
    beforeEnter(to, from, next) {
      //发送请求，检验token
      if (getToken().token != null) {
        postCheckToken(getToken())
          .then(res => {
            console.log(res);
            next();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/detail/:iid",
    name: "detail",
    component: () => import("views/detail/Detail.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
