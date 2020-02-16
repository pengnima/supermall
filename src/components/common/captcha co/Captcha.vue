<template>
  <div id="captcha_mask" v-show="isShow">
    <div class="captcha">
      <canvas-scroll :key="count" :imgSrc="img" ref="sun" />
      <div class="cancel" @click="cancelClick"></div>
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
      isShow: false
    };
  },
  methods: {
    cancelClick() {
      this.isShow = !this.isShow;
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

  min-height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
}
.captcha {
  /* width: 350px; */
  /* height: 400px; */
  width: 14.93rem;
  height: 17rem;
  margin: 50% auto;

  background-color: rgba(255, 255, 255, 0.8);

  border-radius: 5px;
  position: relative;
}
.cancel {
  position: absolute;
  bottom: 0.21rem;
  left: 0.85rem;

  width: 1.28rem;
  height: 1.28rem;

  background: url("~assets/img/captcha/scroll.png") 0 -182px no-repeat;
}
.refresh {
  position: absolute;
  bottom: 0.21rem;
  left: 2.56rem;

  width: 1.28rem;
  height: 1.28rem;

  background: url("~assets/img/captcha/scroll.png") 0 -361px no-repeat;
}
</style>
