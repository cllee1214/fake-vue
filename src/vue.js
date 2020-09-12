
import  init from './init/index.js'
import mount from './mount/index.js'

function Vue (options) {
    this._watchers = []
    this.init(options)
    this.mount(options.el)
}



Vue.prototype = {
    init,
    mount
}



export default Vue