import initData from './initData'
import initMethods from './initMethods'

function init (options) {
    var vm = this
    vm.$options = options

    initData(vm)
    initMethods(vm)
}


export default init