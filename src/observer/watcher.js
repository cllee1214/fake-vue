import Dep from "./dep"

/**
 * 有几个地方都会实例化Watcher:
 * 
 *    1.初始化计算属性的时候,expOrFn计算属性对应的函数，cb为noop空函数，options.lazy = true
 *      
 *     要用的时候才会去计算最终的值，关键一步：
 *     this.value = this.lazy ? undefined : this.get()
 *      
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

let uid = 0
class Watcher {
  constructor (vm, expOrFn, cb, options, isRenderWatcher) {
    this.id = uid++
    this.vm = vm
    this.cb = cb
    this.deps = []
    this.newDeps = []

    this.depIds = new Set()
    this.newDepIds = new Set()

    if(options){
      this.lazy = options.lazy
    }

    this.dirty = this.lazy

    if(typeof expOrFn === 'function') {
      this.getter = expOrFn
    }
    vm._watchers.push(this)

    //只有计算属性才会用到。一开始实例化watcher时候是不去计算值的
    this.value = this.lazy ? undefined : this.get()
  }
  get () {
    Dep.target = this
    return this.getter.call(this.vm)
    // let value = vm.
  }
  addDep (dep) {
    let id = dep.id
    if(!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if(!this.depIds.has(id)){
        dep.addSub(this)
      }
    }
  }
  //计算属性获取值的时候用到。在计算值的同时修改dirty状态。根据dirty状态决定是重新计算还是获取缓存值
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }
  update() {

  }
}

export default Watcher