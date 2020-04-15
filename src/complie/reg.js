// 简化 匹配 <div 
var startTagOpen = /^<([a-zA-Z][\-\.a-zA-Z0-9]*)/

// 匹配 >  有无^区别巨大
var stargTagClose = /^\s*(\/?)>/

// 这里直接抄自源码
//匹配 id='app'（后面都以这个举例），需要捕获的实际上 是 id, 等号，app。
//带有？：是不捕获的分组

/*
之所以这么长，实际上是兼容了有可能存在的很多写法:
空格 比如 id   ='app'等等
分号是双引号还是单引号 id='app'  或者 id="app"
*/
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;


export {
    startTagOpen,
    stargTagClose,
    attribute
}