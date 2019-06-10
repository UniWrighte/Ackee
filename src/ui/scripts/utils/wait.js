export default (fn, ms) => setTimeout(() => {
  window.requestAnimationFrame(fn)
}, ms)
