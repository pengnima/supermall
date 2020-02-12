const obj = {};

import Toast from "./Toast.vue";

obj.install = function(Vue) {
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //通过构造器创建组件实例
  const toast = new toastConstructor();

  //将实例挂载到元素上，并添加到DOM中
  toast.$mount(document.createElement("div"));

  document.body.appendChild(toast.$el);

  //给Vue原型添加上挂载后的实例
  Vue.prototype.$toast = toast;
};

export default obj;
