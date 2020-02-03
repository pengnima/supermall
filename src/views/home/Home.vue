<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>
    <home-swiper :sun_banners="banners"></home-swiper>
    <home-recommends :sun_recommends="recommends"></home-recommends>
    <home-feature></home-feature>
    <tab-control :titles="['流行', '新款', '潮流']"></tab-control>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommends from "./childComps/HomeRecommends.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";

import { getHomeMultiData } from "network/home.js";

export default {
  components: {
    NavBar,
    TabControl,

    HomeSwiper,
    HomeRecommends,
    HomeFeature
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  //利用生命周期函数，组件创建，就发送网络请求
  created() {
    //1.请求多个数据
    (async () => {
      let res = await getHomeMultiData();
      console.log(res);
      //由于是箭头函数，所以该this，实际上是 created()的this指向，即该组件本身
      this.banners = res[0].data.banner.list;
      this.recommends = res[0].data.recommend.list;
    })();
  }
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
}
</style>
