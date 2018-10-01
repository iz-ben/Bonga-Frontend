/**
 * Throttles functions run a lot of times
 * @param func
 * @param delay
 * @returns {Function}
 */
export const debounce = (func, delay) => {
  let inDebounce;
  return () => {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
