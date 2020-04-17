// 简化 匹配 <div 
var startTagOpen = /^<([a-zA-Z][\-\.a-zA-Z0-9]*)/

// 匹配 >  有无^区别巨大
// 这里捕获 斜杠 的原因是有可能是 <img /> <br/> 标签这种，而一般的，如div，是成对出现的
var startTagClose = /^\s*(\/?)>/

/* 
这里直接抄自源码
匹配 id='app'（后面都以这个举例），需要捕获的实际上 是 id, 等号，app。
带有？：是不捕获的分组
之所以这么长，实际上是兼容了有可能存在的很多写法:
空格 比如 id   ='app'等等
分号是双引号还是单引号 id='app'  或者 id="app"
*/
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;


/*
动态属性匹配
分支条件分别对应几种情况：
v-[\w-]匹配 v-on v-bind v-xxx 这种的
@匹配 v-on的简写
:匹配 v-bind简写
\[[^=]+\][^\s"'<>\/=]* 匹配动态事件，如@[event]或者v-on:[event]这种写法。这里对应[event],见文档 https://cn.vuejs.org/v2/api/#v-on
\s*(=)\s* 匹配 等号，兼容前后空格
剩下的匹配事件监听的函数名字。兼容双引号和单引号以及不写单双引号的情况
*/
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;


var endTag = /^<\/[a-zA-Z][\-\.a-zA-Z0-9]*>/

/*解析v-for的值
根据官方文档，这里有好几种写法：
1）item in items
2) (item, index) in items,带索引的
3）(val, key) in object,带key
4) (val, name, index) in object,带别名

v-for的值分为三部分，抽象出来就是 (part1) (of或者in) (part2) 三部分
对应的，正则表达式也是三部分

第一部分，([\s\S]*?),一正一反，匹配任意字符，且尽量少匹配。
又根据文档，第一部分就是 item或(item, index)或者(val, key)或者(val, name, index)
第二部分，(?:in|of) 对应中间部分，且不捕获
第三部分，同样的匹配0个或者多个字符

三个部分中间的空格由\s+匹配
*/
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/

//结合上面v-for解析注释
//第一部分中有三种写法带括号，此正则表达式的作用在于去除两边的括号。（stripParens直译剥皮有点形象）
//具体实现为全局查找，将括号替换为空
var stripParensRE = /^\(|\)$/g

//再结合上面去除括号后的结果，第一部分就被处理成了这样的： item, index
//此正则的目的是把 ,index 或者 ,name解析出来
// [^,\}\]]* 为除开这几种特殊符号都匹配，且以逗号开头，实际上是匹配是 ,index这样的。这里重复了两次，且后面一次带了问号，
//即可能不存在，原因是实际情况可能开头文档里面的第二三种写法，也可能为第四种写法。
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/

export {
    startTagOpen,
    startTagClose,
    attribute,
    dynamicArgAttribute,
    endTag,

    forAliasRE,
    stripParensRE,
    forIteratorRE
}