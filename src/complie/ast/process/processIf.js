import getAttr from './getAttr'

function processIf (element) {
    var exp = getAttr(element, 'v-if')
    if(exp){
        element.if = exp
        if(!element.ifConditions){
            element.ifConditions = []
        }
        element.ifConditions.push({
            exp,
            block: element
        })
    }
}

export default processIf