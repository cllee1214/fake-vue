import createASTElement from './createASTElement'
import {processFor, processIf,parseText} from './process/index.js'

//AST树父节点，根节点没有父节点，所以初始为空
var currentParent;

function start(tag, attrs, unary, start, end) {
    console.log(arguments)
    var element = createASTElement(tag, attrs, currentParent)
    
    element.attrList.forEach(function(attr){
        element.rawAttrsMap[attr.name] = attr
    })
    console.log(element)

    processFor(element)
    processIf(element)

    // todo processOnce
    
}


function chars (text, start, end) {
    if(text = text.trim()){
        console.log(text)
        parseText(text)
    }
}



export {
    start,
    chars
}