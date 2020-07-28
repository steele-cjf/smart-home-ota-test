export function publishHouse(id, data, callback) {
  return $put(`/house/${id}/publish`, {
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
