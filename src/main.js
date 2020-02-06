import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";

Vue.config.productionTip = false;

//Vue实例有$on,$emit等方法，所以可以作为$bus的事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
