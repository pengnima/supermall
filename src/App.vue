<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="$route.path.indexOf('detail') == -1"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "app",
  components: {
    MainTabBar
  }
};
//做rem自适应屏幕 （IPX是 23.475px == 1rem）
(function() {
  var styleN = document.createElement("style");
  var width = document.documentElement.clientWidth / 16;
  styleN.innerHTML = "html{font-size:" + width + "px!important}";
  document.head.appendChild(styleN);
})();
</script>

<style>
@import "assets/css/base.css";
</style>
