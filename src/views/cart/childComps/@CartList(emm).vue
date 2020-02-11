<template>
  <div id="cart_list">
    <scroll ref="scroll" class="cart_scroll">
      <template>
        <div
          v-for="(item, index) in $store.state.cartList"
          :key="index"
          class="cart_list_item"
        >
          <div class="item_check" @click="itemClick(index)">
            <div
              class="check_box"
              :class="{ checked: filterCheck(index) }"
            ></div>
          </div>
          <div class="item_img" @click="itemClick(index)">
            <img :src="item.img" alt="" />
          </div>
          <div class="item_info" @click="infoClick(item)">
            <p class="item_title">{{ item.title }}</p>
            <p class="item_desc">{{ item.desc }}</p>
            <span class="item_price">￥{{ item.price }}</span>
            <span class="item_count">x{{ item.count }}</span>
          </div>
        </div>
      </template>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  data() {
    return {
      checkedList: []
    };
  },
  components: {
    Scroll
  },
  methods: {
    itemClick(index) {
      let checkFlag = false;
      for (let i = 0; i < this.checkedList.length; ++i) {
        if (this.checkedList[i] == index) {
          this.checkedList.splice(i, 1);
          checkFlag = true;
          break;
        }
      }
      if (checkFlag != true) {
        this.checkedList.push(index);
      }
    },
    filterCheck(i) {
      return this.checkedList.some(value => i == value);
    },

    //信息点击事件
    infoClick(item) {
      this.$router.push("/detail/" + item.iid);
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.9rem - 2.09rem);
}
.cart_list_item {
  width: 100%;
  height: 5.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 0.4rem;
  padding-left: 0rem;
}
.item_check {
  width: 1.2rem;
}
.check_box {
  position: relative;
  top: calc(50% - 0.35rem);
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 auto;
  border-radius: 0.35rem;

  border: 0.04rem solid rgba(128, 128, 128, 0.4);
}

.check_box.checked {
  width: 1rem;
  height: 1rem;
  border-style: none;
  top: calc(50% - 0.5rem);
  background: url("~assets/img/cart/yes.svg") 0 0/90% no-repeat;
}

.item_img {
  width: 3.5rem;
  height: 100%;
}
.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item_info {
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
}
.item_desc {
  font-size: 0.6rem;
  color: gray;
}
.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}

/**
* scroll
*/
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>
