import {forAliasRE, stripParensRE,forIteratorRE} from '../../../asset/reg'

//处理v-for
function processFor(element) {
    var exp;
    console.log('processFor')
    var exp = getAttr(element, 'v-for')
    if(exp){
        parseFor(exp)
    }

}

function getAttr(element, name) {
    return element.attrsMap[name]
}


/*解析 v-for的值
根据官方文档，这里有好几种写法：
1）item in items
2) (item, index) in items,带索引的
3）(val, key) in object,带key
4) (val, name, index) in object,带别名
*/
function parseFor(expression) {
    var match = expression.match(forAliasRE)
    if(match){
        var res = {}
        res.for = match[2].trim()
        //尝试去除两边的括号
        var alias = match[1].trim().replace(stripParensRE, '')

        // 匹配,index ,name这种格式的
        //匹配成功说明是后面三种写法
        var iteratorMatch = alias.match(forIteratorRE)
        if(iteratorMatch){
            //获取item的方法就是把,index ,name这种格式的替换掉，剩下的就是item了
            res.alias = alias.replace(forIteratorRE, '')
            res.iterator1 = iteratorMatch[1].trim()

            //这里有两个说明是(val, name, index)这种写法
            if(iteratorMatch[2]){
                res.iterator2 = iteratorMatch[2]
            }
        }else{
            //最简单的item in items这种写法
            res.alias = alias
        }
    }
    return res
}

export default processFor