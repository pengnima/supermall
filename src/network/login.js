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
// 免登录
export function postLoginUser(userInfo, isKeep) {
  return request({
    url: "/login",
    method: "post",
    data: {
      user: userInfo.user,
      password: userInfo.password,
      isKeep
    }
  });
}
//检查token
export function postCheckToken({ token, refreshToken }) {
  return request({
    url: "/login/check",
    method: "post",
    data: {
      token,
      refreshToken
    }
  });
}

export function postQuitLogin(uid, { token, refreshToken }) {
  return request({
    url: "/login/quit",
    method: "post",
    data: {
      uid,
      token,
      refreshToken
    }
  });
}

export function postForgetUser(userInfo) {
  return request({
    url: "/login/forget",
    method: "post",
    data: {
      email: userInfo.email
    }
  });
}
