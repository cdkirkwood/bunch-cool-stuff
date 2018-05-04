export default function defaultHandler (asyncFunc) {
  return function (...args) {
      return Promise.resolve(asyncFunc.apply(this, args))
      .catch(err => {
          console.error(err)
      })
  }
}
