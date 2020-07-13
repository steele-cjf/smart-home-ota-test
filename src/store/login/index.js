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

export default {};
