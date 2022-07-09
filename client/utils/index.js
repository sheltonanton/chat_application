export function debounce(func, time) {
  let timeout = null;

  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(self, ...args);
    }, time);
  };
}
