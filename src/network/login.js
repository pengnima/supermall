import { request } from "./request";

export function postRegisterUser(userInfo) {
  return request({
    url: "/register",
    method: "post",
    data: {
      user: userInfo.user,
      email: userInfo.email,
      password: userInfo.password
    }
  });
}

export function postLoginUser(userInfo) {
  return request({
    url: "/login",
    method: "post",
    data: {
      user: userInfo.user,
      password: userInfo.password
    }
  });
}

export function postForgetUser(userInfo) {
  return request({
    url: "/login",
    method: "post",
    data: {
      email: userInfo.email
    }
  });
}
