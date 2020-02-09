<template>
  <div id="detail">
    <detail-nav-bar />

    <scroll
      class="detail_wrapper"
      ref="scroll"
      :probe-type="3"
      @scrollEvent="scrollOn"
    >
      <detail-swiper :topImgs="topImages" />
      <detail-goods :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgOk" />
      <detail-params :paramInfo="paramInfo" />
      <detail-comment :comment="comment" />
      <goods-list :sun_goods="recommend"></goods-list>
    </scroll>
    <back-top v-show="isShowTop" @click.native="backClick" />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoods from "./childComps/DetailGoods.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParams from "./childComps/DetailParams.vue";
import DetailComment from "./childComps/DetailComment.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getDetailRecommend
} from "network/detail.js";

import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { itemListenerMinxin } from "common/mixin.js";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,

    Scroll,
    BackTop,

    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      isShowTop: false,
      comment: {},
      recommend: []
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    //详情数据
    this.getDetail(this.iid);

    //推荐数据
    this.getDetailRecommend();
  },
  mixins: [itemListenerMinxin],
  mounted() {
    this.$bus.$on("goodsImgLoadEvent", this.bcFunc);
  },
  beforeDestroy() {
    this.$bus.$off("goodsImgLoadEvent", this.bcFunc);
    console.log("销毁Detail的bus");
  },
  methods: {
    /**
     * 获取网络数据
     */
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

        //获取商品的参数
        this.paramInfo = new GoodsParam(
          result.itemParams.info,
          result.itemParams.rule
        );

        //获取评论
        if (result.rate.cRate != 0) {
          this.comment = result.rate.list[0];
        }
      }
    },
    async getDetailRecommend() {
      let res = await getDetailRecommend();
      this.recommend = res.list;
    },

    /**
     * 各类事件
     */
    loadImgOk() {
      this.bcFunc();
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
  overflow: hidden;
  /*  height: calc(100% - 200px);
  overflow: hidden; */
}
</style>
