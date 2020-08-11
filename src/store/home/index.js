/* eslint-disable no-undef */
export function getUserInfo(callback) {
  return $get('/user/me', {
    actionType: 'USER_INFO',
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
// 获取发布房源列表
export function getHousingList(data, callback) {
  return $get('/publish/list', {
    queryData: data,
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
// 获取我的房源列表
export function getMyHouseList(callback) {
  return $get('/house/listMine', {
    actionType: 'MY_HOUSE_LIST',
    successConfig: {
      callback,
    },
  });
}
// 业主的房源列表
export function getHouseListByHolder(data, callback) {
  return $get('/house/listHolderMine', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}
// 获取房源推荐
export function getMyPublishList(data, callback) {
  return $get('/publish/listByHouse', {
    queryData: data,
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
// 删除房源
export function deleteHouse(data, callback) {
  return $delete(`/house/${data.id}`, {
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

// my house
export function myHouseList(state = null, action) {
  if (action.type === 'MY_HOUSE_LIST') {
    return action.data || null;
  }
  return state;
}
export default {
  userInfo,
  verfityResult,
  myHouseList,
};
