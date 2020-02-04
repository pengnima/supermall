<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in sun_goods"
      :goodsItem="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: {
    GoodsListItem
  },
  props: {
    sun_goods: Array
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
</style>
