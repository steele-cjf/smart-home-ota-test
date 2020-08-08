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
