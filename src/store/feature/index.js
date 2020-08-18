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
// 房间列表
export function getRoomList(data, callback) {
  return $get('/room', {
    queryData: data,
    actionType: 'ROOM_LIST',
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
export function updateRoomName(id, name, callback) {
  return $put(`/room/${id}?name=${name}`, {
    successConfig: {
      callback,
    },
  });
}
// 家庭成员列表
export function getTenantList(data, callback) {
  return $get('/tenant/family/list', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}
// 删除房间
export function deleteRoom(id, callback) {
  return $remove(`/room/${id}`, {
    // body: {id: id},
    successConfig: {
      callback,
    },
  });
}
export function roomList(state = null, action) {
  if (action.type === 'ROOM_LIST') {
    return action.data || null;
  }
  return state;
}

export default {
  roomList,
};
