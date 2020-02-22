import { request } from "./request";

export function getProfileInfo(uid) {
  return request({
    url: "/profile",
    params: {
      uid
    }
  });
}
