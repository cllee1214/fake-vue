
function initMethods (vm) {
    var methods = vm.$options.methods
    var noop = function(){}

    // todo
    // 这里也有检测methods的命名是否和props data 冲突

    // 1. 处理methods实际就是把各个方法挂在到vue实例上。同时把这个方法的this指向vue实例。
    // 2. 改变函数this指向可以用apply call bind 因为这里是需要返回一个函数且不是立马执行，所以选择bind
    // 3. 真正的源码里实现了一个bind的Polyfill。本质是先判断参数数量，然后选择call或者apply改变this指向。

    for(var key in methods){
        var fn = methods[key]
        vm[key] = typeof fn == 'function' ? fn.bind(vm) : noop
    }
}

export default initMethods