export function createReducer(initialState: Object, handlers: Object): Function {
  return function reducer(state: Object = initialState, action: Object): Object {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export function decodeUTF8(bytes) {
  var s = '';
  var i = 0;
  while (i < bytes.length) {
    var c = bytes[i++];
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= bytes.length) throw 'UTF-8 decode: incomplete 2-byte sequence';
        c = (c & 31) << 6 | bytes[i] & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= bytes.length) throw 'UTF-8 decode: incomplete 3-byte sequence';
        c = (c & 15) << 12 | (bytes[i] & 63) << 6 | bytes[++i] & 63;
      } else if (c > 239 && c < 248) {
        if (i+2 >= bytes.length) throw 'UTF-8 decode: incomplete 4-byte sequence';
        c = (c & 7) << 18 | (bytes[i] & 63) << 12 | (bytes[++i] & 63) << 6 | bytes[++i] & 63;
      } else throw 'UTF-8 decode: unknown multibyte start 0x' + c.toString(16) + ' at index ' + (i - 1);
      ++i;
    }

    if (c <= 0xffff) s += String.fromCharCode(c);
    else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800)
      s += String.fromCharCode(c & 0x3FF | 0xdc00)
    } else throw 'UTF-8 decode: code point 0x' + c.toString(16) + ' exceeds UTF-16 reach';
  }
  return s;
}

export function encodeURIComponentWithSlashes(uri) {
  const components = uri.split('/')
  return components.map(component => encodeURIComponent(component)).join('/')
}

export function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

export function exctractYoutubeVideoId(url) {
  if(!url) return false
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[1] ? match[1] : false)
}