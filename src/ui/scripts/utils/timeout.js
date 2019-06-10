export default function (fn, message, ms) {
  return Promise.race([
    fn,
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(message)), ms)
    })
  ])
}
