import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import Toast from "components/common/toast/index.js";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;

//Vue实例有$on,$emit等方法，所以可以作为$bus的事件总线
Vue.prototype.$bus = new Vue();
Vue.use(Toast);
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/placeholder.png")
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
