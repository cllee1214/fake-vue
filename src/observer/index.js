
import Dep from './dep.js'

class Observer {
  constructor(value) {
    this.value = value
    this.walk(this.value)
  }
  walk (obj) {
    let keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}


function defineReactive (obj, key) {
  let dep = new Dep()
  var value = obj[key]
  Object.defineProperty(obj, key, {
    get () {
      if(Dep.target){
        dep.depend()
      }
      return value
    },
    set () {

    }
  })
}

export default Observer