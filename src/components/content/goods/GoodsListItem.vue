<template>
  <div class="goods_item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad" />

    <div class="goods_info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsItem: Object
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("goodsImgLoadEvent");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods_item {
  padding: 5px;
  width: 48%;
  position: relative;
  padding-bottom: 40px;
}
.goods_item img {
  width: 100%;
  border-radius: 5px;
}
.goods_info {
  /* 信息 */
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods_info p {
  /* 标题 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.price {
  /* 价格 */
  color: var(--color-high-text);
  margin-right: 20px;
}

.collect::before {
  display: inline-block;
  content: "";
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  position: relative;
  top: 1px;
  right: 2px;
  height: 14px;
  width: 14px;
}
</style>
