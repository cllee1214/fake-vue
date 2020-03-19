
import { initData } from './init.js'

function Vue (options) {
    var vm = this
    console.log(options)
    vm.$options = options

    initData(vm)

}

export default Vue