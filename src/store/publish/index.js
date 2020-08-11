/* eslint-disable no-undef */
export function getPublishHouseDetail(id) {
    return $get(`/publish/${id}`, {
      actionType: 'PUBLISH_HOUSE_DETAIL',
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
  