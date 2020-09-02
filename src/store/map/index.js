
import { setUrlParams } from '../../util/changeUrl'
export function getSearchSummaries(data, callback) {
    let url = setUrlParams('/publish/search/summaries', data)
    return $get(url, {
      actionType: 'SEARCH_SUMMARIES',
      successConfig: {
        callback
      },
      failConfig: {
        callback
      }
    });
  }
  export function getMarkerList(data, callback) {
    let url = setUrlParams('/publish/search', data)
    return $get(url, {
      actionType: 'MARKER_LIST',
      successConfig: {
        callback
      },
      failConfig: {
        callback
      }
    });
  }
  export function getRecommandList(data, callback) {
    let url = setUrlParams('/publish/recommand', data)
    return $get(url, {
      actionType: 'RECOMMAND_LIST',
      successConfig: {
        callback
      },
      failConfig: {
        callback
      }
    });
  }