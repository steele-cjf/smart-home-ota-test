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

let timeoutPromise = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("timeout");
      reject("err");
    }, timeout);
  });
}

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
      let fetchService = function (appApi, url, config) {
        console.log(appApi + url, config)
        return fetch(appApi + url, config)
          .then(response => response.json())
          .then(response => {
            if (response.code == 401 || (response.error && response.error == "invalid_token")) {
              NavigatorService.reset(AppRoute.LOGIN)
            }
            if (config && config.actionType) {
              dispatch({
                type: config.actionType,
                [config.actionDataKey]: response,
              });
            }
            if (config && config.successConfig && config.successConfig.callback) {
              config.successConfig.callback(response);
            }
          })
          .catch(error => {
            console.log('error', error)
            if (error.message === "Network request failed") {
              showToast('网络出错')
            } else {
              showToast('请求出错，请联系管理员')
            }
            if (config.failConfig && config.failConfig.callback) {
              config.failConfig.callback(error);
            }
          });
      }
      //fetchService(appApi, url, config);
      Promise.race([timeoutPromise(30 * 1000), fetchService(appApi, url, config)])
        .then(resp => {
          //console.log(11111, resp);
          if (resp === 'timeout') {
            showToast('网络请求超时');
            if (config.failConfig && config.failConfig.callback) {
              config.failConfig.callback(resp);
            }
          }
        })
        .catch(error => {
          console.log(2222, error);
        })

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
  // if (!json) return {}
  let result = {}
  for (var i in json) {
    if (json[i] != null) {
      result[i] = json[i]
    }
  }
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
        // the temp file path
        callback({
          uri: 'file://' + res.path(),
          name: 'upload.jpg',
          type: 'image/jpeg'
        })
      }).catch((error) => {
        callback({
          uri: '',
          name: 'upload.jpg',
          type: 'image/jpeg'
        })
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
