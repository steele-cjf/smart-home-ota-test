export function handleLogin(data, callback) {
  return $post('/auth/login', {
    body: data,
    successConfig: {
      callback,
    },
  });
}
export function getVerifyCode(data, callback) {
  return $post('/sms/loginCode', {
    body: data,
    successConfig: {
      callback,
    },
  });
}
// 获取全部的类型的数据字典
export function getAllData(callback) {
  return $get('/dictionary/listGroupByType', {
    successConfig: {
      callback,
    },
  });
}
export default {};
