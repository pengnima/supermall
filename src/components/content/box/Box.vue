<template>
  <div id="box">
    <div class="box_bar">
      <div class="box_info">
        <slot name="infoSlot"></slot>
      </div>
    </div>
    <div class="box_items">
      <slot name="itemSlot"></slot>
    </div>
  </div>
</template>
<script>
import BoxItem from "./BoxItem.vue";
export default {
  components: {
    BoxItem
  }
};
</script>
<style scoped>
#box {
  width: 15rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.5rem;
}
.box_bar {
  height: 2rem;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
.box_info {
  display: flex;
  justify-content: space-between;

  line-height: 2rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
}
.box_items {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  background-color: #fff;
}
</style>
