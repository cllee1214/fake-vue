
import  init from './init/index.js'
import parseHtml from './complie/parse/index'

function Vue (options) {
    this._init(options)

    var ele = document.querySelector(options.el)
    var template = ele.outerHTML
    parseHtml(template)
}


function initMixin(Vue) {
    Vue.prototype._init = init
}

initMixin(Vue)


export default Vue