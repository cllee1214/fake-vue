import initData from './initData'
import initMethods from './initMethods'
import initComputed from './initComputed'

function init (options) {
    var vm = this
    vm.$options = options

    initData(vm)
    initMethods(vm)

    if(options.computed){
        initComputed(vm, options.computed)
    }
}


export default init