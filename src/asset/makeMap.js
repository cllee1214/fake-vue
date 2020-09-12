

function makeMap (str) {
    var map = {}
    var list = str.split(',')
    for(var i = 0; i<list.length; i++) {
        map[list[i]] = true
    }
    return function (key) {
        return map[key]
    }
}

export default makeMap