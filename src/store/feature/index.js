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
// 添加房间
export function addRoom(data, callback) {
  return $post('/room', {
    body: data,
    successConfig: {
      callback,
    },
  });
}
// 更新房间名
export function updateRoomName(id, data, callback) {
  return $put(`/room/${id}`, {
    body: data,
    successConfig: {
      callback,
    },
  });
}
