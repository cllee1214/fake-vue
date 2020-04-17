import createASTElement from './createASTElement'

//AST树父节点，根节点没有父节点，所以初始为空
var currentParent;

function start(tag, attrs, unary, start, end) {
    console.log(arguments)
    var element = createASTElement(tag, attrs, currentParent)
    
}

export {
    start,
}