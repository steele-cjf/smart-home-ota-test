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
// user info
export function userInfo(state = null, action) {
  if (action.type === 'USER_INFO') {
    return action.data || null;
  }
  return state;
}

export default {
  userInfo,
};