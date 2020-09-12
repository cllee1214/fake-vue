import Dep from '../observer/dep'
import Watcher from '../observer/watcher'
function noop() {}

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = {}

  //初始化watcher
  for(var key in computed) {
    watchers[key] = new Watcher(vm, computed[key], noop, {lazy: true})
  }

  //代理到vm上去

  Object.defineProperty(vm, key, {
    get() {
      console.log(`获取计算属性${key}`)
      var watcher = vm._computedWatchers[key]
      if(watcher) {
        //根据dirty  重新计算 or 获取缓存值
        if(watcher.dirty) {
          watcher.evaluate()
        }
        // ??? 页面渲染了计算属性会进入
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    },
    //计算属性是只读的，修改计算属性会给出警告
    set() {
      console.warn(`Computed property + ${key} +  was assigned to but it has no setter.`)
    }
  })
}

export default initComputed