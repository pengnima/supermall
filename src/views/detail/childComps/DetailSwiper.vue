<template>
  <swiper ref="swiper" class="detail_swiper">
    <swiper-item
      v-for="(item, index) in topImgs"
      :key="index"
      :count="topImgs.length"
      @slideEven="slideLoadOn"
    >
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImgs: Array
  },
  methods: {
    slideLoadOn() {
      this.$refs.swiper.slideOn();
    }
  }
};
</script>
<style scoped>
.detail_swiper {
  height: 12.8rem;
}
</style>
