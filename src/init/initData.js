
import Observer from '../observer/index.js'

/*
initData 做两件事情：

1.将data代理到_data上， 访问 vm.xxx就相当于访问 vm._data.xxx
2. 让数据是响应式的（完成依赖收集）

依赖收集相关的几个问题：

为什么要有依赖收集？
现在data中有a、b、c三个变量。其中页面中只是渲染了a、b(如 {{a}}  {{b}})，c没有被渲染在页面中。那么如果c的值改变的话，页面应该是不会重新渲染的。
所以需要知道到底是哪些变量被使用了。只有使用过的变量改变才去重新渲染页面。

实际上就变成了两件事情：
收集被渲染的变量  和   当这些被收集到的变量改变的时候如何通知执行渲染

那如何知道哪些变量被使用（渲染）了呢？
利用defineProperty的get去收集。因为第一次渲染是需要知道这个a或者b的值是什么。那么在获取的时候肯定会走get的逻辑。那么就知道哪些变量被渲染了。

变量改变的时候通知渲染用set。

*/


function initData (vm) {
    console.log('initData')
    var data = vm.$options.data
    proxy(vm, data)
    observe(vm, data)
}


//数据代理
function proxy (vm, data) {
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

function observe (vm, data) {
    let ob = new Observer(data)
}


export  default initData