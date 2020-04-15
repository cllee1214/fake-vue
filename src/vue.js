
import  init from './init/index.js'
import parse from './complie/index'

function Vue (options) {
    this._init(options)

    var ele = document.querySelector(options.el)
    var template = ele.outerHTML
    parse(template)
}


function initMixin(Vue) {
    Vue.prototype._init = init
}

initMixin(Vue)


export default Vue