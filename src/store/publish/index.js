/* eslint-disable no-undef */
export function getPublishHouseDetail(id, callback) {
  return $get(`/publish/${id}`, {
    actionType: 'PUBLISH_HOUSE_DETAIL',
    successConfig: {
      callback,
    },
  });
}
// 更新发布信息
export function updatePublishInfo(data, id, callback) {
  return $put(`/publish/${id}`, {
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    successConfig: {
      callback,
    },
  });
}

// 收藏房源
export function publishSetCollection(data, callback) {
  return $post("/houseCollection?add=" + data.add + '&publishInfoId=' + data.publishInfoId, {
    actionType: 'PUBLISH_SET_COLLECTION',
    successConfig: {
      callback
    },
    failConfig: {
      callback
    }
  });
}
// user info
export function publishHouseDetail(state = null, action) {
  if (action.type === 'PUBLISH_HOUSE_DETAIL') {
    return action.data || null;
  }
  return state;
}
export default {
  publishHouseDetail
};

