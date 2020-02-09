<template>
  <div id="shop_info" v-if="Object.keys(shop).length != 0">
    <div class="shop_name">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>

    <div class="score_info">
      <div class="score_left">
        <div class="score_sell">
          <div>{{ sellValue }}万</div>
          <div style="font-size: 0.6rem;">总销量</div>
        </div>
        <div class="score_item">
          <div>{{ shop.goods }}</div>
          <div style="font-size: 0.6rem;">全部宝贝</div>
        </div>
      </div>
      <div class="score_right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td :style="{ color: item.isBetter ? 'red' : 'green' }">
              {{ item.score }}
            </td>
            <td
              style="color: white;"
              :style="{ backgroundColor: item.isBetter ? 'red' : 'green' }"
            >
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="come_shop">进店逛逛</div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    sellValue() {
      /* parseFloat(this.shop.sells / 10000).toFixed(1) */
      return Math.round((this.shop.sells / 10000) * 10) / 10;
    },
    betterScore(isBetter) {
      if (isBetter) {
        return "{ backgroundColor: red, color: white}";
      } else {
        return "{ backgroundColor: green, color: white}";
      }
    }
  }
};
</script>

<style scoped>
#shop_info {
  padding: 0.64rem 0.34rem;
  border-bottom: 0.128rem solid rgba(128, 128, 128, 0.2);
  font-size: 0.75rem;
}
.shop_name img {
  width: 1.7rem;
  height: 1.7rem;
  border: 0.042rem solid rgba(128, 128, 128, 0.5);
  border-radius: 0.85rem;
}
.shop_name span {
  margin-left: 0.34rem;
  position: relative;
  top: -0.64rem;
  font-size: 0.768rem;
}

/**
  * 商店信息左右两侧的样式，整个商店信息是弹性盒子，
  * 可左边用弹性盒子做，右边用table做
  */
.score_info {
  padding: 0px 0.512rem;
  display: flex;
}
.score_left,
.score_right {
  flex: 1;
}
/* 给score_left也做弹性盒子，且其子元素以侧轴中心对齐 */
.score_left {
  display: flex;
  align-items: center;
}
.score_left > div {
  flex: 1;
}
.score_sell,
.score_item {
  text-align: center;
}
.score_item {
  border-right: 0.042rem solid gray;
}
/**
  * 右边用table做的
  */
.score_right > table {
  margin: 0 auto;
  font-size: 0.64rem;
  border-spacing: 0.42rem;
}
/**
  * 进店逛逛的样式
  */
.come_shop {
  width: 6.4rem;
  height: 1.28rem;
  line-height: 1.28rem;
  text-align: center;
  border-radius: 0.42rem;
  background-color: rgba(128, 128, 128, 0.3);
  margin: 0 auto;
}
</style>
