import { stringify } from 'query-string';
import { appApi, ip } from '../config';
import RNFetchBlob from 'rn-fetch-blob'
import storage from './storage';
import { AppRoute } from '../navigator/AppRoutes'
import showToast from './toast';
// 默认配置
export const DEFAULT_CONFIG = {
  method: 'GET',
  body: null,
  queryData: {},
  actionType: '',
  extendData: {},
  actionDataKey: 'data',
  successConfig: null,
  failConfig: null,
  includeCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// 构造参数
export const formatURL = (url, params) => {
  let query = '';
  if (params && Object.keys(params).length) {
    query = url.includes('?')
      ? `&${stringify(params)}`
      : `?${stringify(params)}`;
  }
  return `${url}${query}`;
};

// 请求参数
export const httpService = (url, config) => {
  return dispatch => {
    (async () => {
      let token = await storage.get('token')
      console.log('token', token)
      DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + token;
      config.headers = Object.assign({}, DEFAULT_CONFIG.headers, config.headers);
      config = Object.assign({}, DEFAULT_CONFIG, config);
      if (config.body && config.headers && config.headers['Content-Type'] === 'application/json') {
        if (config.body) {
          config.body = JSON.stringify(cleanNullData(config.body))
        }
      }
      return fetch(appApi + url, config)
        .then(response => response.json())
        .then(response => {
          if (response.code == 401 || (response.error && response.error == "invalid_token")) {
            NavigatorService.navigate(AppRoute.LOGIN)
          }
          if (config.actionType) {
            dispatch({
              type: config.actionType,
              [config.actionDataKey]: response,
            });
          }
          if (config.successConfig && config.successConfig.callback) {
            config.successConfig.callback(response);
          }
          // if (response.code !== 401 && response.code !== 0) {
          //   showToast(response.message)
          // }
        })
        .catch(error => {
          showToast('请求出错，请联系管理员')
        });
    })();
  };
}

export const get = (url, config) => {
  config.method = 'GET';
  url = formatURL(url, config.queryData);
  return httpService(url, config);
};

export const post = (url, config) => {
  config.method = 'POST';
  return httpService(url, config);
};
export const put = (url, config) => {
  config.method = 'PUT';
  return httpService(url, config);
};

export const remove = (url, config) => {
  config.method = 'DELETE';
  url = formatURL(url, config.queryData);
  return httpService(url, config);
};
// image如果需要token时的处理,isAbsolute:true 绝对路径
export const getImage = (url, callback, isAbsolute) => {
  fetchGetImage('GET', url, callback, isAbsolute)
}
export const postImage = (url, callback, isAbsolute) => {
  fetchGetImage('POST', url, callback, isAbsolute)
}
function cleanNullData(json) {
  console.log('&&&&&22222start', json)
  // if (!json) return {}
  let result = {}
  for (var i in json) {
    if (json[i] != null) {
      result[i] = json[i]
    }
  }
  // console.log('&&&&&22222', result)
  return json
}

function fetchGetImage(method, url, callback, isAbsolute) {
  let uri = isAbsolute && ip + url || appApi + url
  storage.get('token').then(accessToken => {
    RNFetchBlob
      .config({
        fileCache: true,
      })
      .fetch(method, uri, {
        Authorization: 'Bearer ' + accessToken
      })
      .then((res) => {
        if (callback) {
          // the temp file path
          callback({
            uri: 'file://' + res.path(),
            name: 'upload.jpg',
            type: 'image/jpeg'
          })
        } else {
          return {
            uri: 'file://' + res.path(),
            name: 'upload.jpg',
            type: 'image/jpeg'
          }
        }

      })
  })
}


export default {
  get,
  post,
  put,
  remove,
  getImage,
  postImage,
  DEFAULT_CONFIG,
  appApi
};
