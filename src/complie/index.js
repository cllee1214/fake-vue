import {startTagOpen, startTagClose, attribute, dynamicArgAttribute, endTag} from './reg.js'

function parseHtml (html) {
    console.log(html)
    var stack = []
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
                    console.log(endTagMatch)
                    advance(endTagMatch[0].length)
                    continue
                }

                var startTagMatch = parseStartTag()
                if(startTagMatch){
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
                console.log(attr)
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

    function advance (n) {
        index += n;
        html = html.substring(n);
      }
}


function isPlainTextElement() {
    return false
}



export default parseHtml