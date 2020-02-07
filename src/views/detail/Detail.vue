<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="detail_wrapper" ref="scroll">
      <detail-swiper :topImgs="topImages"></detail-swiper>
      <detail-goods :goods="goods"></detail-goods>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <ul>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
        <li>你好</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
/* import Swiper from ''; */

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoods from "./childComps/DetailGoods.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";

import { getDetail, Goods, Shop } from "network/detail.js";

import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,

    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    console.log(this.iid);
  },
  mounted() {
    this.getDetail(this.iid);
  },
  methods: {
    async getDetail(iid) {
      let res = await getDetail(iid);
      console.log(res);
      if (res) {
        const result = res.result;
        this.topImages = result.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(
          result.itemInfo,
          result.columns,
          result.shopInfo.services
        );

        //获取店铺信息
        this.shop = new Shop(result.shopInfo);
      }
    }
  }
};
</script>
<style scoped>
#detail {
  /* 利用z-index覆盖 tabbar，不过这样不好，想换种方法 */
  position: relative;
  /* z-index: 10;
  background-color: #fff; */
  height: 100vh;
}
.detail_wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /*  height: calc(100% - 200px);
  overflow: hidden; */
}
</style>
