
import  init from './init/index.js'
import mount from './mount/index.js'
import parseHtml from './complie/parse/index'
function Vue (options) {
    this._watchers = []
    this.init(options)
    this.mount(options.el)

    // var ele = document.querySelector(options.el)
    // var template = ele.outerHTML
    // parseHtml(template)
}



Vue.prototype = {
    init,
    mount
}



export default Vue