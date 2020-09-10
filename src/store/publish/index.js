import { setUrlParams } from '../../util/changeUrl'

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
  let url = setUrlParams('/houseCollection', data)
  return $post(url, {
    actionType: 'PUBLISH_SET_COLLECTION',
    successConfig: {
      callback
    },
    failConfig: {
      callback
    }
  });
}
// 删除发布信息
export function deletePublishInfo(id, callback) {
  return $delete(`publish/${id}`, {
    successConfig: {
      callback
    },
    failConfig: {
      callback
    }
  });
}
export default {
};

