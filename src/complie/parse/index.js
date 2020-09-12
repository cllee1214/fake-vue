import {startTagOpen, startTagClose, attribute, dynamicArgAttribute, endTag} from '../../asset/reg.js'
import {isPlainTextElement, isUnaryTag} from '../../asset/is.js'
import {start, chars, end, root} from '../ast/ast.js' 

function parseHtml (html) {

    var index = 0
    var last, lastTag;

    while(html){
        last = html
        if(!lastTag || !isPlainTextElement(lastTag)){
            var textEnd = html.indexOf('<')
            if(textEnd == 0){
                // 如果<的位置是0的话，有很多种可能
                //1. 注释节点
                //2. 条件注释节点，兼容IE的各种，如<!--[if IE]>
                //3.Doctype


                //4. 元素节点，如<div></div>,其中又包含两种情况，
                //可能是前半部分<div>,也可能是后半部份</div>

                var endTagMatch = html.match(endTag)
                if(endTagMatch){
                    //console.log(endTagMatch)
                    var matchEndStart = index
                    advance(endTagMatch[0].length)
                    end(endTagMatch[1], matchEndStart, index)
                    continue
                }

                var startTagMatch = parseStartTag()
                if(startTagMatch){
                    handleStartTag(startTagMatch)
                    continue
                }
                

                //5.文本节点，其中就包含{{message}}这种的


            }
            //
            var text, rest, next;
            if(textEnd >= 0){
                rest = html.slice(textEnd)

                text = html.slice(0, textEnd)
            }
            if(textEnd < 0){
                text = html
            }
            if(text){
                advance(text.length)
                chars(text, index - text.length ,index)
            }
        }
    }

    //解析 <div id='app'>，分为三个步骤：
    function parseStartTag() {
        //1.解析 <div
        var start = html.match(startTagOpen)
        if(start){
            var match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
        
            advance(start[0].length)

            //2. 解析 id='app'，实际情况是不只有id这个属性，可能有很多，因此有个while循环。
            // 这里的逻辑是 一直要遇到 > 或者 />才结束。即整个startTag结束。
            var end, attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute) || html.match(dynamicArgAttribute))){
                attr.start = index
                advance(attr[0].length)
                attr.end = index
                match.attrs.push(attr)
            }
            // 解析 >， 也可能是 />。这里是>
            if(end){
                console.log(end)
                match.unarySlash = end[1]
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }

    function handleStartTag(match) {
        console.log(match)
        var len = match.attrs.length
        var attrs = new Array(len)
        var unary = isUnaryTag(match.unarySlash) || !!match.unarySlash

        for(var i = 0; i < len; i++ ){
            attrs[i] = {
                name: match.attrs[i][1],
                value: match.attrs[i][3],
                start: match.attrs[i].start + match.attrs[i][0].match(/^\s*/).length,
                end: match.attrs[i].end
            }
        }

        // todo
        //入stack 

        start(match.tagName, attrs, unary, match.start, match.end)

    }

    function advance (n) {
        index += n;
        html = html.substring(n);
    }
    
    console.log('root')
    console.log(root)
    return root
}



export default parseHtml