export const TK = "TK";
export const R_TK = "R_TK";

// 获取token里的uid
export function getUid() {
  let token = localStorage.getItem(TK) || sessionStorage.getItem(TK);
  let str = false;
  if (token) {
    str = token.split(".")[1];
  }
  if (str) {
    return JSON.parse(atob(str)).uid;
  } else {
    return null;
  }
}

//获取token
export function getToken() {
  let token = localStorage.getItem(TK) || sessionStorage.getItem(TK);
  let refreshToken = localStorage.getItem(R_TK);

  return { token, refreshToken };
}

//清除token
export function removeToken() {
  sessionStorage.removeItem(TK);

  localStorage.removeItem(TK);
  localStorage.removeItem(R_TK);
}
