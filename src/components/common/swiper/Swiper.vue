<template>
  <div id="pnm_swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <div class="bullet">
      <div
        class="bullet_item"
        v-show="slideCount > 1"
        v-for="(item, index) in slideCount"
        :class="setBulletActive(index)"
        :key="index"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currIndex: 1,
      swiperStyle: {}, //swiper样式
      slideWidth: null, //一张slide的宽度
      moveTimer: null,
      startPos: 0,
      distance: 0,
      slideCount: 0
    };
  },
  props: {
    moveRatio: {
      type: Number,
      default: 0.2
    },
    animDuration: {
      type: Number,
      default: 300
    }
  },
  mounted() {},
  methods: {
    // 0. 启动函数
    slideOn() {
      this.initDom();
      if (this.slideCount > 1) {
        this.moveAuto();
      }
    },
    // 1. 初始化DOM，并获取必要的数据
    initDom() {
      let swiperEl = document.querySelector(".swiper");
      let slides = swiperEl.querySelectorAll(".slide");
      this.swiperStyle = swiperEl.style;
      this.slideCount = slides.length;
      this.slideWidth = swiperEl.offsetWidth;

      if (this.slideCount > 1) {
        let firstSlide = slides[0].cloneNode(true);
        let lastSlide = slides[this.slideCount - 1].cloneNode(true);
        swiperEl.appendChild(firstSlide);
        swiperEl.insertBefore(lastSlide, slides[0]);
        //设置开头位置
        this.setTransform(-this.slideWidth);
      }
    },

    // 2. 自动滚动
    moveAuto() {
      this.moveTimer = setInterval(() => {
        this.currIndex++;
        //每次滚动都需要先进行检测，真正滚动也会在检测里完成
        this.scrollCheck();
      }, 1000);
    },

    // 3. 滚动检测（检测是第一张还是最后一张，让其回滚到正确的位置）
    scrollCheck() {
      // 开启过渡动画并开始滚动
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(-this.currIndex * this.slideWidth);

      //设置一个定时器，等过渡动画结束后执行(判断所处位置是第几张)
      setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        //判断第一张，和最后一张
        if (this.currIndex <= 0) {
          this.currIndex = this.slideCount;
          this.setTransform(-this.currIndex * this.slideWidth);
        } else if (this.currIndex >= this.slideCount + 1) {
          this.currIndex = 1;
          this.setTransform(-this.slideWidth);
        }
      }, this.animDuration);
    },

    //设置swiper的transform的滚动距离
    setTransform(pos) {
      this.swiperStyle.transform = `translateX(${pos}px)`;
    },

    //重置子弹的active
    setBulletActive(index) {
      if (this.currIndex >= this.slideCount + 1) {
        //最后一张的情况
        return { active: index == 0 };
      } else if (this.currIndex <= 0) {
        //第0张的情况
        return { active: index == this.slideCount - 1 };
      } else {
        //一般情况
        return { active: index == this.currIndex - 1 };
      }
    },

    /*
    触屏事件
    */
    touchStart(e) {
      if (this.slideCount > 1) {
        clearInterval(this.moveTimer);
        this.startPos = e.touches[0].pageX;
      }
    },
    touchMove(e) {
      if (this.slideCount > 1) {
        let movePos = e.touches[0].pageX;
        this.distance = movePos - this.startPos;
        let moveDistance = -(this.currIndex * this.slideWidth) + this.distance;
        this.setTransform(moveDistance);
      }
    },
    touchEnd(e) {
      if (this.slideCount > 1) {
        let _Dis = Math.abs(this.distance); //绝对值求出移动的距离

        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          _Dis > this.slideWidth * this.moveRatio
        ) {
          this.currIndex--;
        } else if (
          this.distance < 0 &&
          _Dis > this.slideWidth * this.moveRatio
        ) {
          this.currIndex++;
        }
        //在触碰结束时，由于会触碰第一张或者最后一张，所以需要来一个滚动检测
        this.scrollCheck();
        //上述检测完毕，让其在正确位置之后，在执行 自动翻滚
        this.moveAuto();
      }
    }
  }
};
</script>
<style>
#pnm_swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.bullet {
  display: flex;
  position: absolute;
  bottom: 0.42rem;
  /* 下方2个配合起来可以达到让弹性盒子子元素真正居中 */
  justify-content: center;
  width: 100%;
}
.bullet_item {
  width: 0.34rem;
  height: 0.34rem;
  background-color: white;
  margin: 0 0.21rem;
  border-radius: 0.17rem;
}
.bullet_item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
