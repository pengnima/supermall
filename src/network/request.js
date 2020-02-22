import axios from "axios";
import qs from "qs";

export function request(my_config) {
  // 1.创建实例
  const instance = axios.create({
    //baseURL: "http://localhost:3000",
    baseURL: "http://192.168.0.105:3000", //手机检测时，换该地址
    timeout: 3000
  });
  // 2.给post请求的data 用qs.stringify转换成URL格式
  if (my_config.data != null && Object.keys(my_config.data).length != 0) {
    my_config.data = qs.stringify(my_config.data);
  }

  // 3.请求拦截
  instance.interceptors.request.use(
    config => {
      //console.log(config);
      return config;
    },
    err => {
      console.log(err);
    }
  );

  // 4.响应拦截
  instance.interceptors.response.use(
    result => {
      //console.log(result);
      return result.data;
    },
    err => {
      console.log(err);
    }
  );

  // 5.返回实例
  return instance(my_config);
}
