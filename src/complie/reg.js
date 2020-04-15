var startTagOpen = /^<([a-zA-Z][\-\.a-zA-Z0-9]*)/
var stargTagClose = /^\s*(\/?)>/

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;


export {
    startTagOpen,
    stargTagClose,
    attribute
}