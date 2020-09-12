import makeMap from './makeMap'

// 是否是一元标签
var unaryTags = 'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr'
var isUnaryTag = makeMap(unaryTags)

function isPlainTextElement() {
    return false
}



export {
    isPlainTextElement,
    isUnaryTag
}