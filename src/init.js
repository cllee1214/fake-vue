
// 将data代理到_data上
// 访问 vm.xxx就相当于访问 vm._data.xxx
function initData (vm) {
    console.log('initData')
    console.log(vm)
    var data = vm.$options.data
    if(data){
        //data可以是一个对象，也可以是一个函数
        // 如： data: function () {
        //         return { a: 1 }
        //      }
        // 实际的取值是 {a:1}
        if(typeof data === 'function'){
            data = vm._data = data.call(vm)
        }else {
           data = vm._data = data
        }
    }

    //todo  
    //检测data属性是否和 methods props冲突


    var keys = Object.keys(data)
    for(let i = 0; i<keys.length; i++){
        Object.defineProperty(vm, keys[i], {
           get: function() {
               return this["_data"][keys[i]]
           },
           set: function(val) {
               console.log('set')
               this["_data"][keys[i]] = val
           }
        })
    }
}





export { initData }