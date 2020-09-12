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
// 房源住户列表
export function getHouseTenantList(id, callback) {
  return $get(`/tenant/listByHouse?houseId=${id}`, {
    successConfig: {
      callback,
    },
    actionType: 'HOUSE_TENANT_LIST',
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
// 判断房屋是否全部出租
export function checkHouseIsEmpty(id, callback) {
  return $get(`/house/${id}/isAllRented`, {
    queryData: {
      houseId: id
    },
    successConfig: {
      callback
    }
  })
}
// 房源收藏列表
export function getHouseCollectionList(data, callback) {
  return $get('/houseCollection/listMine', {
    queryData: data,
    successConfig: {
      callback,
    }
  })
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
