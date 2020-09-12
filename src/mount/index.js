
import Watcher from '../observer/watcher'

function updateComponent () {
  console.log('更新了组件,相关值为：', this.message)
}

function noop() {}


function mount (el) {
  console.log('mount on:', el)

  new Watcher(this, updateComponent.bind(this), noop, {}, true)
}

export default mount