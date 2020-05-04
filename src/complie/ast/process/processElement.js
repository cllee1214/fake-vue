import getAttr from './getAttr'
import {bindRE, dirRE, dynamicArgAttribute} from '../../../asset/reg'

function processElement (element) {

    //处理属性key
    processKey(element)
    
    //是否是原生元素，也就是不带任何vue相关的属性
    element.plain = !element.key

    //处理style,包含静态的style和动态绑定的style
    processStyle(element)

    //处理剩下的属性
    processAttr(element)

    return element
}

function processKey (element) {
    var expression = getAttr(element, 'key')
    element.key = expression
}

function processStyle (element) {
    var staticStyle = getAttr(element, 'style')
    if(staticStyle){
        var rs = {}
        staticStyle.split(';').forEach(function(item){
            if(item){
                var tmp = item.split(':')
                if(tmp.length){
                    rs[tmp[0].trim()] = tmp[1].trim()
                }
            }
        })
        element.staticStyle = JSON.stringify(rs)
    }
}

//
function processAttr (element) {
    console.log(element)
    var attrList = element.attrList
    var len = attrList.length
    for(var i = 0; i < len; i++){
        var name = attrList[i].name
        var value = attrList[i].value
        // 是不是以 v-  @  # :开头的
        if(dirRE.test(name)){

        }else{
            //ast上面开辟一个atts的节点，把静态属性添加进去
            addAttr(element, name, value)
        }
    }
}

//dynamic为true则在ast上条件动态的属性， false添加静态的属性
function addAttr(element, name, value, range, dynamic) {
    var attrs;
    if(dynamic){
        attrs = element.dynamicAttrs || (element.dynamicAttrs = [])
    }else{
        attrs = element.attrs || (element.attrs = [])
    }
    attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
    element.plain = false;
}

function rangeSetItem (item,range) {
    if (range) {
      if (range.start != null) {
        item.start = range.start;
      }
      if (range.end != null) {
        item.end = range.end;
      }
    }
    return item
  }


export default processElement