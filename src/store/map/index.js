
import { setUrlParams } from '../../util/changeUrl'
export function getSearchSummaries(data, callback) {
    let url = setUrlParams('/house/search/summaries', data)
    return $get(url, {
      actionType: 'SEARCH_SUMMARIES',
      successConfig: {
        callback
      },
    });
  }