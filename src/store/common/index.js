// 打开相机
export function openCamera(options) {
  /**
   * options对象：{
   *  open (必填) false, true
   *  result 获取扫描后的结果，选填
   * }
   */
  return dispatch => {
    dispatch({
      type: 'CAMERA_DETAIL',
      data: options,
    });
  };
}

// 打开相机
export function getScanResult(url, callback) {
  return $get(url, {
    actionType: 'SCAN_RESULT',
    successConfig: {
      callback,
    },
  });
}

// 设置数据字典
export function setCodeInfo(info) {
  return dispatch => {
    dispatch({
      type: 'CODE_INFO',
      data: info,
    });
  };
}

export function setDictionaryMappings(data) {
  return dispatch => {
    dispatch({
      type: 'DICTIONARY_MAPPINGS',
      data,
    });
  };
}

// websocket接受到信息
export function setWebSocketInfo(info) {
  return dispatch => {
    dispatch({
      type: 'WEB_SOCKET_INFO',
      data: Object.assign({}, info),
    });
  };
}
// 获取websock的数据
export function webSocketInfo(state = null, action) {
  
  if (action.type === 'WEB_SOCKET_INFO') {
    return Object.assign(action.data) || null;
  }
  return state;
}
// HOUSE_DETAIL
export function cameraOpt(state = null, action) {
  if (action.type === 'CAMERA_DETAIL') {
    return action.data || null;
  }
  return state;
}
// 获取数据字典
export function codeInfo(state = null, action) {
  if (action.type === 'CODE_INFO') {
    return action.data || null;
  }
  return state;
}
// 获取数据字典
export function dictionaryMappings(state = null, action) {
  if (action.type === 'DICTIONARY_MAPPINGS') {
    return action.data || null;
  }
  return state;
}


export default {
  cameraOpt,
  webSocketInfo,
  codeInfo,
  dictionaryMappings
};
