<template>
  <div class="recommend">
    <div class="recommend_item" v-for="item in sun_recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sun_recommends: Array
  }
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  /* background-color: rgba(255, 192, 203, 0.384); */
}

.recommend_item {
  flex: 1;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
  border-bottom: 10px solid #eee;
}
.recommend_item img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
}
</style>
