import { request } from "./request";

export function getCategory() {
  return request({
    url: "/category"
  });
}

export function getCategoryInfo(maitKey) {
  return request({
    url: "/category/info",
    params: {
      maitKey
    }
  });
}
