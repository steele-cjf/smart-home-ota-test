/* eslint-disable no-undef */
export function getPublishHouseDetail(id) {
    return $get(`/publish/${id}`, {
      actionType: 'PUBLISH_HOUSE_DETAIL',
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
  
