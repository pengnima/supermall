<template>
  <div class="goods_item" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad" />
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
      //可以在home页面中，单独$off掉home的那个事件。
      this.$bus.$emit("goodsImgLoadEvent");

      /* if (this.$route.path.indexOf("home") != -1) {
        this.$bus.$emit("goodsImgLoadEvent");
      } else if (this.$route.path.indexOf("detail") != -1) {
        this.$bus.$emit("detailScrollEvent");
      } */
    },
    itemClick() {
      if (this.$route.path.indexOf("home") != -1) {
        this.$router.push("/detail/" + this.goodsItem.iid);
      }
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>

<style scoped>
.goods_item {
  padding: 0.21rem;
  width: 48%;
  position: relative;
  padding-bottom: 1.68rem;
}
.goods_item img {
  width: 100%;
  border-radius: 0.21rem;
}
.goods_info {
  /* 信息 */
  font-size: 0.64rem;
  text-align: center;
  position: absolute;
  bottom: 0.21rem;
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
  margin-right: 0.85rem;
}

.collect::before {
  display: inline-block;
  content: "";
  background: url("~assets/img/common/collect.svg") 0 0/0.6rem 0.6rem;
  position: relative;
  top: 0.04rem;
  right: 0.08rem;
  height: 0.6rem;
  width: 0.6rem;
}
</style>
