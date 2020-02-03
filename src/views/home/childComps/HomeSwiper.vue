<template>
  <div>
    <swiper>
      <template>
        <swiper-item v-for="(item, index) in sun_banners" :key="item.acm">
          <template>
            <a :href="item.link"><img :src="item.image" alt=""/></a>
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    sun_banners: {
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>
<style></style>
