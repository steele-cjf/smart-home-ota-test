export function publishHouse(data, callback) {
  return $post('/publish', {
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
