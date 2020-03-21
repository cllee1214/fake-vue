
import  init from './init/index.js'

function Vue (options) {
    this._init(options)
}


function initMixin(Vue) {
    Vue.prototype._init = init
}

initMixin(Vue)


export default Vue