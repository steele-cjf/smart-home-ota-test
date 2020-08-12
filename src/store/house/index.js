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
// 房源详情
export function getHouseDetail(id, callback) {
  return $get(`/house/${id}`, {
    successConfig: {
      callback,
    },
    actionType: 'HOUSE_DETAIL',
  });
}
// 编辑房源审核信息
export function updateHouse(id, data, callback) {
  return $put(`/house/${id}`, {
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
  return $remove(`/house/${data.id}`, {
    body: data,
    successConfig: {
      callback,
    },
  });
}
// 我是租客房源列表
export function getTenantHouseList(data, callback) {
  return $get('/house/listTenantMine', {
    queryData: data,
    successConfig: {
      callback,
    },
  });
}
// HOUSE_DETAIL
export function houseDetail(state = null, action) {
  if (action.type === 'HOUSE_DETAIL') {
    return action.data || null;
  }
  return state;
}

export default {
  houseDetail,
};
