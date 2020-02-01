import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import request from "./network/request.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");

request({
  url: "home",
  params: {},
  method: "GET"
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
