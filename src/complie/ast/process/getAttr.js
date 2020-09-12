//从attrsMap中拿到值，拿到之后从attrsList中删除这个属性
//删除的原因是每次解析属性之后避免重复解析
function getAttr(element, name) { 
    var value = element.attrsMap[name]
    var attrList = element.attrList
    if(value){
        for(var i = 0; i < attrList.length; i++){
            if(attrList[i].name == name){
                attrList.splice(i,1)
            }
        }
    }
    return value
}

export default getAttr