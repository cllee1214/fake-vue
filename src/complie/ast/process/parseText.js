import {defaultTagRE} from '../../../asset/reg.js'

/* 解析文本
  以     msg is {{message}}, age is {{age}} hahah 举例 
*/
function parseText(text) {
    if(defaultTagRE.test(text)){
        // match为每次匹配到的结果
        //index代表匹配到的表达式是从哪个位置开始的
        //lastIndex是前面匹配到表达式是在哪个位置结束的，初始为0
        //test方法会改变lastIndex  所以要重置为0， 否则下面的exec可能匹配不到
        var match, index,tokenValue,rawTokens = [], tokens = [];
        var lastIndex = defaultTagRE.lastIndex = 0

        while(match = defaultTagRE.exec(text)){
            index = match.index
            if(index > lastIndex) {
                //进入这个判断首先肯定是匹配到了表达式的
                //index恒为表达式的最前面花括号的位置
                //lastIndex分两种情况：第一次匹配到表达式的时候lastIndex为0。以后恒为当前匹配到的表达式最后面花括号的位置
                //所以当index大于lastIndex时，text.slice(lastIndex, index)的结果就可能是两种情况：
                //1.文本开头到第一个表达式的最前面花括号所包含的纯文本（ msg is ）
                //2. 两个表达式中间夹杂的纯文本（, age is ）
                tokenValue = text.slice(lastIndex, index)
                rawTokens.push(tokenValue)
                tokens.push(JSON.stringify(tokenValue))
            }

            //这里本该有解析过滤器逻辑 todo
            //处理双花括号中间的表达式
            var expression = match[1]
            tokens.push("_s(" + expression + ")")
            rawTokens.push({ '@binding': expression });
            lastIndex = defaultTagRE.lastIndex   
        }
         
        //经上面的while循环，lastIndex肯定为匹配到的最后一个表达式最后面花括号的位置
        //也就是从这个lastIndex位置开始，一直到文本最后都是纯文本了，text.slice(lastIndex)得到剩下的纯文本 ( hahah)
        if(lastIndex < text.length){
            tokenValue = text.slice(lastIndex)
            rawTokens.push(tokenValue)
            tokens.push(JSON.stringify(tokenValue))
        }
        return {
            expression: tokens.join('+'),
            tokens: rawTokens
        }
    }
}

export default parseText