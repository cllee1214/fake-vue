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

export {
    startTagOpen,
    startTagClose,
    attribute,
    dynamicArgAttribute,
    endTag
}