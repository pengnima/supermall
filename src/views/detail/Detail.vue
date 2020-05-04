<template>
  <div id="detail">
    <detail-nav-bar ref="navBarRef" @itemClickEvent="changeScrollOffset" />
    <scroll class="detail_wrapper" ref="scroll" :probe-type="3" @scrollEvent="scrollOn">
      <detail-swiper :topImgs="topImages" ref="swiperRef" />
      <detail-goods :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgOk" />
      <detail-params :paramInfo="paramInfo" ref="paramsRef" />
      <detail-comment :comment="comment" ref="commentRef" />
      <goods-list :sun_goods="recommend" ref="recommendRef"></goods-list>
    </scroll>
    <transition name="back-top">
      <back-top v-show="isShowTop" @click.native="backClick" />
    </transition>
    <detail-bottom-bar @addEvent="addToCart" />
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getDetailRecommend
} from "network/detail.js";

import Scroll from "components/common/scroll/Scroll.vue";
import Toast from "components/common/toast/Toast.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { deBounce } from "common/utils.js";
import { itemListenerMinxin, backTopMinxin } from "common/mixin.js";

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
    DetailBottomBar,

    Scroll,
    Toast,
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
      comment: {},
      recommend: [],
      theme: ["swiperRef", "paramsRef", "commentRef", "recommendRef"],
      themePosY: [0],
      bcFuncTheme: null,
      detailIndex: 0
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    //详情数据
    this.getDetail(this.iid);

    //推荐数据
    this.getDetailRecommend();
  },
  mixins: [itemListenerMinxin, backTopMinxin],
  mounted() {
    this.$bus.$on("goodsImgLoadEvent", this.bcFunc);

    //给跳转做防抖
    this.bcFuncTheme = deBounce(() => {
      this.themePosY = [0];
      this.themePosY.push(this.$refs.paramsRef.$el.offsetTop);
      this.themePosY.push(this.$refs.commentRef.$el.offsetTop);
      this.themePosY.push(this.$refs.recommendRef.$el.offsetTop);
      this.themePosY.push(Infinity);
      // console.log("处理了一次", this.themePosY);
    }, 100);
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

    addToCart() {
      //把信息发送到vuex里
      const obj = {
        iid: this.iid,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        title: this.goods.title,
        img: this.topImages[0]
      };
      this.$store
        .dispatch("ChangeCart", obj)
        .then(() => {
          this.$toast.show("加入购物车");
        })
        .catch(() => {
          this.$toast.show("购买数量+1");
        });
    },

    changeScrollOffset(index) {
      this.$refs.scroll.scrollToElement(this.$refs[this.theme[index]].$el, 200);
    },
    loadImgOk() {
      this.bcFunc();
      this.bcFuncTheme();
    },
    scrollOn(pos) {
      this.isShowTop = -pos.y > 1000;
      for (let i = 0; i < this.themePosY.length - 1; ++i) {
        if (
          this.detailIndex != i &&
          -pos.y >= this.themePosY[i] &&
          -pos.y < this.themePosY[i + 1]
        ) {
          //console.log(i);
          this.detailIndex = i;
          this.$refs.navBarRef.currIndex = i;
          break;
        }
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
  top: 1.9rem;
  bottom: 2.09rem;
  left: 0;
  right: 0;
  overflow: hidden;
}

/**
* 给回到顶部按钮做了一个过渡效果
*/
.back-top-enter,
.back-top-leave-to {
  transform: translateX(1rem);
  opacity: 0;
}
.back-top-enter-active {
  transition: all 1s;
}
.back-top-leave-active {
  transition: all 1s;
}
</style>
