export function setUrlParams (url, params) {
    if (!params) {
        return url
    }
    url = url + '?'
    let array = []
    for(var key in params) {
        array.push(key + '=' + params[key])
    }
    return url + array.join('&')
}