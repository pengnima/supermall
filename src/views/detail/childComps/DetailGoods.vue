<template>
  <div id="detail_goods" v-if="Object.keys(goods).length != 0">
    <div class="title">{{ goods.title }}</div>

    <div class="info">
      <span class="n_price">￥{{ goods.lowNowPrice }}</span>
      <del>
        <span class="o_price">{{ goods.oldPrice }}</span>
      </del>
      <span :style="{ backgroundColor: goods.discountBgColor }" class="discount"
        >{{ goods.discountDesc }}
      </span>
    </div>

    <div class="columns">
      <span v-for="(item, index) in goods.columns">{{ item }}</span>
    </div>

    <div class="services">
      <div v-for="(item, index) in goods.services" v-if="itemShow(item)">
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goods: {}
  },
  computed: {
    itemShow() {
      return function(item) {
        return item.icon && item.name !== "72小时发货";
      };
    }
  }
};
</script>
<style scoped>
#detail_goods {
  padding: 10px;
}
.title {
  font-size: 18px;
}

.info {
  margin: 10px 0;
}
.n_price {
  font-size: 20px;
  color: var(--color-high-text);
}
.o_price {
  margin: 0 5px;
  font-size: 12px;
  color: gray;
}
.discount {
  color: white;
  font-size: 14px;
  padding: 3px;
  border-radius: 5px;
  position: relative;
  top: -5px;
}

.columns {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  /* 孩子span继承下面2个样式 */
  font-size: 14px;
  color: gray;
}

.services {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 3px solid rgba(128, 128, 128, 0.4);
}
.services img {
  width: 12px;
}
</style>
