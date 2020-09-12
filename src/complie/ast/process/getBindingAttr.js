
function getBindingAttr(element, name) {
    return element.attrsMap[':' + name] || element.attrsMap['v-bind:' + name]
}

export default getBindingAttr