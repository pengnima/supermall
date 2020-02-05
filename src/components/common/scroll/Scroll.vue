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
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  },
  mounted() {
    //为了等goodsitem真正创建好，加了延时，如果没延时，BS的实际能滚动的高度会不同
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      //监听滚动
      this.scroll.on("scroll", pos => {
        //console.log(pos);
        //将pos发送给父组件，让其根据pos修改 backTop组件的显示隐藏
        this.$emit("scrollEvent", pos);
      });

      //监听上拉
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUpEvent");
      });
    }, 500);
  }
};
</script>
<style></style>
