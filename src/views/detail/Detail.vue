<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll
      class="detail_wrapper"
      ref="scroll"
      :probe-type="3"
      @scrollEvent="scrollOn"
    >
      <detail-swiper :topImgs="topImages"></detail-swiper>
      <detail-goods :goods="goods"></detail-goods>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @loadImgEvent="loadImgOk"
      ></detail-goods-info>
    </scroll>
    <back-top v-show="isShowTop" @click.native="backClick"></back-top>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoods from "./childComps/DetailGoods.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";

import { getDetail, Goods, Shop } from "network/detail.js";

import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { deBounce } from "common/utils.js";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
    DetailGoodsInfo,

    Scroll,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      func: null,
      isShowTop: false
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    console.log(this.iid);
  },
  mounted() {
    this.getDetail(this.iid);
    this.func = deBounce(this.$refs.scroll.refresh, 200);
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

        //获取宝贝的详细信息
        this.detailInfo = result.detailInfo;
      }
    },
    loadImgOk() {
      this.func();
    },
    scrollOn(pos) {
      this.isShowTop = -pos.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
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
  top: 1.9rem;
  bottom: 2.09rem;
  left: 0;
  right: 0;
  /*  height: calc(100% - 200px);
  overflow: hidden; */
}
</style>
