<template>
  <div>
    <tab-bar>
      <template #tabbarslot>
        <tab-bar-item
          v-for="(item, index) in tabBarItemList"
          :path="item._path"
          :activeColor="item._color"
          :key="index"
          @click.native="btnClick(index)"
        >
          <template #itemimg>
            <img :src="item._img" alt="" />
          </template>
          <template #itemimg2>
            <img :src="item._imgHover" alt="" />
          </template>
          <template #itemtext>
            <div>{{ item._text }}</div>
          </template>
        </tab-bar-item>
      </template>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  data() {
    return {
      tabBarItemList: [
        /* assets是别名，表示assets目录，只要写上该别名， 不管在哪里都会到assets目录  */
        {
          _path: "/home",
          _img: require("assets/img/tabbar/shouye.svg"),
          _imgHover: require("assets/img/tabbar/shouye_hover.svg"),
          _text: "首页",
          _color: "deepPink"
        },
        {
          _path: "/category",
          _img: require("assets/img/tabbar/fenlei.svg"),
          _imgHover: require("assets/img/tabbar/fenlei_hover.svg"),
          _text: "分类",
          _color: "blue"
        },
        {
          _path: "/cart",
          _img: require("assets/img/tabbar/baoshuicang.svg"),
          _imgHover: require("assets/img/tabbar/baoshuicang_hover.svg"),
          _text: "购物车",
          _color: "green"
        },
        {
          _path: "/profile",
          _img: require("assets/img/tabbar/wo.svg"),
          _imgHover: require("assets/img/tabbar/wo_hover.svg"),
          _text: "我的"
        }
      ]
    };
  },

  components: {
    TabBar,
    TabBarItem
  },
  methods: {
    btnClick(x) {
      /* 自定义组件的实例，使用v-on绑定事件能绑定自定义的事件，即在组件内部使用this.$emit('Eventname')的方式抛出的事件 
          如果在自定义组件实例上绑定原生的事件，需要使用.native的事件修饰符。
          否则会认为监听的是来自Item组件自定义的事件
          div,button不是自定义组件，所以可以直接绑定原生事件(即 @click)
      */
      //console.log("自定义组件实例通过@click.native触发原生事件", x);
    }
  }
};
</script>

<style></style>
