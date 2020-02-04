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
    <tab-control
      :titles="['流行', '新款', '潮流']"
      class="home_tab_control"
      @tabEvent="tabClick"
    ></tab-control>
    <goods-list :sun_goods="goods[this.currType].list"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommends from "./childComps/HomeRecommends.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getHomeMultiData, getHomeGoods } from "network/home.js";

export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    HomeRecommends,
    HomeFeature
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currType: "pop"
    };
  },
  //利用生命周期函数，组件创建，就发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultiData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 发射事件相关
     */
    tabClick(index) {
      this.currType = ["pop", "new", "sell"][index];
    },

    /**
     * 网络相关
     */
    //获取多种数据
    async getHomeMultiData() {
      let res = await getHomeMultiData();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },

    //获取商品数据
    async getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      let res = await getHomeGoods(type, page);

      //接续list, 3种方法，其中 ...res.list会把 其内的每个元素依次push进this.goods[type].list里
      //[].push.apply(this.goods[type].list, res.list);  //无法做到响应式
      this.goods[type].list.push(...res.list);
      //this.goods[type].list = this.goods[type].list.concat(res.list);

      this.goods[type].page += 1;
    }
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
  z-index: 9;
  width: 100%;
}
.home_tab_control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
