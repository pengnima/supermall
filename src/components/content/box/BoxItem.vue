<template>
  <div id="box_item">
    <a :href="itemInfo.link" class="item">
      <img :src="itemInfo.img" alt="" />
    </a>
    <div class="item_text">
      {{ itemInfo.text }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
#box_item {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.1rem;
}
.item img {
  margin: 0 auto;
  display: block;
  width: 1rem;
  height: 1rem;
}
.item_text {
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.2rem;
}
</style>
