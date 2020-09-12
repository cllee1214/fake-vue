import createASTElement from './createASTElement'
import {processFor, processIf,parseText, processElement} from './process/index.js'
import { startTagOpen } from '../../asset/reg';

var root;
var currentParent;
var stack = []

function start(tag, attrs, unary, start, end) {

    //在每次初始化的时候就把上一次的元素作为父元素
    var element = createASTElement(tag, attrs, currentParent)
    
    element.attrList.forEach(function(attr){
        element.rawAttrsMap[attr.name] = attr
    })
    console.log(element)

    processFor(element)
    processIf(element)

    // todo processOnce

    if(!root){
        root = element
    }
    if(!unary){
        currentParent = element
        stack.push(element)
    }
    
}


function chars (text, start, end) {
    if(text = text.trim()){
        console.log(text)
        var res = parseText(text)   
        if(res){
            currentParent.children.push({
                type: 2,
                expression: res.expression,
                tokens: res.tokens,
                text: text,
                start,
                end,
            })
        }else{
            currentParent.children.push({
                type: 3,
                text: text
            })
        }
        
    }
}


function end (tag, start, end) {
    var element = stack.pop()
    currentParent = stack[stack.length - 1]
    closeElement(element)
}

function closeElement (element) {
    element = processElement(element)

    //如果stack为空了，说明已经是根元素了
    if(stack.length){
        currentParent.children.push(element)
    }
}


export {
    start,
    chars,
    end,
    root
}