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
