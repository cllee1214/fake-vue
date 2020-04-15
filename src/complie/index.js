import {startTagOpen, stargTagClose, attribute} from './reg.js'

function parse (html) {
    console.log(html)
    var stack = []
    var index = 0
    var last, lastTag;

    while(html){
        last = html
        if(!lastTag){
            var textEnd = html.indexOf('<')
            if(textEnd == 0){
                // 如果<的位置是0的话，有很多种可能
                //1. 注释节点
                //2. 条件注释节点，兼容IE的各种，如<!--[if IE]>
                //3.Doctype


                //4. 元素节点，如<div></div>,其中又包含两种情况，
                //可能是前半部分<div>,也可能是后半部份</div>
                var startTagMatch = parseStartTag()
                html = ''

                //5.文本节点，其中就包含{{message}}这种的


            }
        }
    }


    function parseStartTag() {
        var start = html.match(startTagOpen)
        if(start){
            var match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
        }
        advance(start[0].length)

        var end, attr;
        
        while(!(end = html.match(stargTagClose)) && (attr = html.match(attribute))){
            attr.start = index
            advance(attr[0].length)
            attr.end = index
            match.attrs.push(attr)
        }
        if(end){
            console.log(end)
            match.unarySlash = end[1]
            advance(end[0].length)
            match.end = index
            return match
        }
        
    }

    function advance (n) {
        index += n;
        html = html.substring(n);
      }
}



export default parse