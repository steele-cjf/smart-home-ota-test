export function getUserInfo(callback) {
  return $get('/user/me', {
    actionType: 'USER_INFO',
    successConfig: {
      callback,
    },
  });
}

// user info
export function userInfo(state = null, action) {
  console.log(22222, action);
  if (action.type === 'USER_INFO') {
    return action.data || null;
  }
  return state;
}

export default {
  userInfo,
};
