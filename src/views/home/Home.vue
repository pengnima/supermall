<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>
    <home-swiper :sun_banners="banners"></home-swiper>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getHomeMultiData } from "network/home.js";
import HomeSwiper from "./childComps/HomeSwiper.vue";
export default {
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
      recomments: []
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
      this.recomments = res[0].data.recommend.list;
    })();
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
