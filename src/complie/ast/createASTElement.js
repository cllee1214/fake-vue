//将数组形式的attribute转换为map,即key-value形式
//todo 在源码中有检验属性是否重复定义的逻辑
function makeAttrsMap (attrs) {
    var map = {}
    var len = attrs.length;
    for(var i = 0; i < len; i++){
        map[attrs[i].name] = attrs[i].value
    }
    return map
}

//定义AST基本结构
function createASTElement (tag, attrs, parent) {
    return {
        type: 1,
        tag,
        attrList: attrs,
        attrsMap: makeAttrsMap(attrs),
        rawAttrsMap: {},
        parent,
        children: []
    }
}

export default createASTElement