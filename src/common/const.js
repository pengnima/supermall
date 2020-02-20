export const TK = "TK";
export const R_TK = "R_TK";

export function getUid() {
  let token = localStorage.getItem(TK) || sessionStorage.getItem(TK);
  if (token) {
    return JSON.parse(atob(token.split(".")[1])).uid;
  } else {
    return null;
  }
}
export function getToken() {
  let token = localStorage.getItem(TK) || sessionStorage.getItem(TK);
  let refreshToken = localStorage.getItem(R_TK);

  return { token, refreshToken };
}
