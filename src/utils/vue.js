/*
 * @Author: bingbing.geng
 * @Date: 2022-11-14 10:15:39
 * @LastEditTime: 2022-11-14 10:31:29
 * @FilePath: \cicd-vue\src\utils\vue.js
 * 
 * Proxy只能拦截对象，如果层次过深也是无法拦截的，需要递归解构拦截，
 * 如果是字符串，需要将其改为对象才能狗进行拦截，
 * 因此vue3中通过ref定义的数据，访问需要通过.value进行访问（vue中对其进行了封装）
 * 
 * 解构会失去响应式，需要通过toRef进行包裹，因为解构后很多数据就变为了非对象
 * 
 * const obj = { a: 1, b: { b1: 11, b2: 22 } }
 * 上面数据解构后，a将失去响应式，b则未失去
 */
export const isObject = (value) => {
  return typeof value === 'object' && value !== null
}

export const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if(isObject(target[key])) {
        return reactive(target[key])
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
}

