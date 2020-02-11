<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
BScroll.use(PullUp);

export default {
  props: {
    //这里用的是驼峰，在子组件实例处需要用 probe-type 才行。
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    /**
     * BS的一些方法
     */
    scrollToElement(el, time = 500) {
      this.scroll.scrollToElement(el, time);
    },
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    }
  },
  mounted() {
    //为了等goodsitem真正创建好，加了延时，如果没延时，BS的实际能滚动的高度会不同
    //【注】用了 this.$bus 和 @load 每当图片加载一次就刷新一次，所以不需要加 setTimeout了
    //setTimeout(() => {// }, 500);
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //监听滚动
    if (this.probeType != 0) {
      this.scroll.on("scroll", pos => {
        //将pos发送给父组件，让其根据pos修改 backTop组件的显示隐藏
        this.$emit("scrollEvent", pos);
      });
    }

    //监听上拉，当上拉为true时才监听
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUpEvent");
      });
    }
  }
};
</script>
<style></style>
