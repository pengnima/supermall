<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>首页</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '潮流']"
      @tabEvent="tabClick"
      v-show="topCheck"
      class="top_tab_control"
      ref="tabControl2"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scrollEvent="contentScroll"
      @pullingUpEvent="loadMore"
    >
      <template>
        <home-swiper :sun_banners="banners" @SwiperImgLoadEvent="SwiperImgLoad" />
        <home-recommends :sun_recommends="recommends" />
        <home-feature />
        <tab-control :titles="['流行', '新款', '潮流']" @tabEvent="tabClick" ref="tabControl1" />
        <goods-list :sun_goods="goods[this.currType].list" />
      </template>
    </scroll>
    <transition name="back-top">
      <back-top v-show="isShowTop" @click.native="backClick" />
    </transition>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommends from "./childComps/HomeRecommends.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultiData, getHomeGoods } from "network/home.js";

import { itemListenerMinxin, backTopMinxin } from "common/mixin.js";

export default {
  name: "home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
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
      currType: "pop",
      tabControloffsetTop: 0,
      topCheck: false
    };
  },
  mixins: [itemListenerMinxin, backTopMinxin],
  //利用生命周期函数，组件创建，就发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultiData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    console.log("进入home");
  },
  mounted() {},
  activated() {
    //this.bcFunc 混入进来的
    console.log(this.bcFunc);
    this.$bus.$on("goodsImgLoadEvent", this.bcFunc);
  },
  deactivated() {
    // 通过给 $off第二参数传递一个函数，可以让其只销毁home里的事件，而不会销毁detail里的事件
    this.$bus.$off("goodsImgLoadEvent", this.bcFunc);
    console.log("销毁Home的bus");
  },
  methods: {
    /**
     * 该组件的事件
     */
    loadMore() {
      //下拉加载更多goods，但是会有bug，该bug由于DOM高度问题
      //图片的DOM高度是异步加载的，所以没那么快能加载出来，会导致scroll的高度跟不上
      //如何解决？
      //让img每次加载完之后，就refresh()一次滚动条
      if (this.goods[this.currType].page < 2) {
        this.getHomeGoods(this.currType);
      }

      console.log("上拉了");
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 2000);
    },

    /**
     * 发射事件相关
     */
    tabClick(index) {
      this.currType = ["pop", "new", "sell"][index];
      //同步2个tabControl的点击 变红
      this.$refs.tabControl1.currIndex = index;
      this.$refs.tabControl2.currIndex = index;
    },
    contentScroll(pos) {
      //滚动条实时监听
      this.isShowTop = -pos.y > 1000;
      this.topCheck = -pos.y > this.tabControloffsetTop;
    },
    SwiperImgLoad() {
      //等到 swiper的图片加载好之后
      this.tabControloffsetTop = this.$refs.tabControl1.$el.offsetTop;
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
  /**
  * 有了BS之后，可以不需要这2个 
  * padding-top: 44px;
  * padding-bottom: 49px;
  * 下方BS的.wrapper样式里就有 top44 bottom49
  */
  /* 一定要有home的高度，否则其子对象wrapper无法正确显示 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /**
  * 原生滚动时，需要这个，有了BS，就不用下面的了
  *position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%; */
}

/**
  * 由于用了better-scroll已经失效
  * .home_tab_control {
  *   position: sticky;
  *   top: 44px;
  *   z-index: 9; 
  * }
  */
.top_tab_control {
  position: relative;
  z-index: 9;
}
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.9rem;
  bottom: 2.09rem;
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
