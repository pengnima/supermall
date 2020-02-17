<template>
  <div id="captcha_mask" v-show="isShow">
    <div class="captcha" :class="{ shake: isShake }">
      <canvas-scroll :key="count" :imgSrc="img" ref="sun" />
      <div class="cancel" @click="itemClick(false)"></div>
      <div class="refresh" @click="refreshClick"></div>
    </div>
  </div>
</template>
<script>
import CanvasScroll from "./CanvasScroll.vue";
export default {
  props: {},
  data() {
    return {
      count: 0,
      img: require("assets/img/captcha/huaji.jpg"),
      imgArr: [
        require("assets/img/captcha/huaji.jpg"),
        require("assets/img/captcha/huaji2.jpg")
      ],
      isShow: false,
      isShake: false
    };
  },
  methods: {
    itemClick(bool) {
      this.isShow = bool;
      // console.log(this.$refs.sun.imgSrc);
    },
    refreshClick() {
      this.count++;
      this.img = this.imgArr[
        Math.abs(this.imgArr.length - this.count) % this.imgArr.length
      ];
    }
  },
  components: {
    CanvasScroll
  }
};
</script>
<style>
#captcha_mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;

  min-height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
}
.captcha {
  width: 300px;
  height: 300px;
  margin: 50% auto;

  background-color: rgba(255, 255, 255, 0.8);

  border-radius: 5px;
  position: relative;

  overflow: hidden;
}
.cancel {
  position: absolute;
  bottom: 5px;
  left: 20px;

  width: 30px;
  height: 30px;

  background: url("~assets/img/captcha/scroll.png") 0 -182px no-repeat;
}
.refresh {
  position: absolute;
  bottom: 5px;
  left: 60px;

  width: 30px;
  height: 30px;

  background: url("~assets/img/captcha/scroll.png") 0 -361px no-repeat;
}

/**
* 动画
*/
.shake {
  animation: shakeAnima 0.25s cubic-bezier(0.85, 0.2, 0.2, 1) 2;
}

@keyframes shakeAnima {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(15px);
  }

  75% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
