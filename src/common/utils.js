/**
 * 防抖函数 , 防抖函数只执行一次，后面执行的都是其返回的函数
 */
export function deBounce(func, delay) {
  let timer = null; //该timer只会执行一次

  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
