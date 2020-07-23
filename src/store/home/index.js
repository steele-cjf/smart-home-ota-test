export function getUserInfo(callback) {
  return $get('/user/me', {
    actionType: 'USER_INFO',
    successConfig: {
      callback,
    },
  });
}
export function getVerifyToken(data, callback) {
  return $get('/rp/verifyToken', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}

// 获取验证结果
export function getVerifyResult(data) {
  return $get('/rp/verifyResult', {
    queryData: data,
    actionType: 'VERIFY_RESULT',
  });
}

export function verifyIdCard(data, callback) {
  return $post('/rp/manualAudit', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
    successConfig: {
      callback,
    },
  });
}
// 获取区域列表
export function getCityList(data, callback) {
  return $get('/region/list', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}
// 房源详情
export function getHouseDetail(id, callback) {
  return $get(`/house/${id}`, {
    successConfig: {
      callback,
    },
  });
}
// 房源审核
export function addHouse(data, callback) {
  return $post('/house', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
    successConfig: {
      callback,
    },
  });
}
// user info
export function userInfo(state = null, action) {
  if (action.type === 'USER_INFO') {
    return action.data || null;
  }
  return state;
}

// verfity result
export function verfityResult(state = null, action) {
  if (action.type === 'VERIFY_RESULT') {
    return action.data || null;
  }
  return state;
}


export default {
  userInfo,
  verfityResult
};
