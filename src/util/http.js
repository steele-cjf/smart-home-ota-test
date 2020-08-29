import { stringify } from 'query-string';
import { appApi, ip } from '../config';
// import { showToast } from './toast';
import RNFetchBlob from 'rn-fetch-blob'
import storage from './storage';
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
  // (async () => {
  //   const accessToken = await storage.get('token');
  //   DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken;
  // })();
  // storage
  //   .get('token')
  //   .then(
  //     accessToken =>
  //       (DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken),
  //   );
  return dispatch => {
    config.headers = Object.assign({}, DEFAULT_CONFIG.headers, config.headers);
    config = Object.assign({}, DEFAULT_CONFIG, config);
    if (
      config.body &&
      config.headers &&
      config.headers['Content-Type'] === 'application/json'
    ) {
      config.body = config.body && JSON.stringify(config.body);
    }
    console.log(config.headers.Authorization, url, 'token');
    return fetch(appApi + url, config)
      .then(response => response.json())
      .then(response => {
        if (config.actionType) {
          dispatch({
            type: config.actionType,
            [config.actionDataKey]: response,
          });
        }
        if (config.successConfig && config.successConfig.callback) {
          config.successConfig.callback(response);
        }
      })
      .catch(error => {
        showToast('请求出错，请联系管理员')
        console.log('error', error);
      });
  };
};

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
        console.log('The file saved to ', res.path())
        callback({
          uri: 'file://' + res.path(),
          name: 'upload.jpg',
          type: 'image/jpeg'
        })
      })
  })
}
// export const getImage = (url, callback) => {
// storage.get('token').then(accessToken => {
//   fetch(url, {
//     credentials: 'include',
//     headers: {
//       Authorization: 'Bearer ' + accessToken
//     },
//   })
//     .then(response => response.blob())
//     .then(blod => {
//       console.log('blod', URL.createObjectURL(blod));
//       let url = 'aa' //URL.createObjectURL(blod);
//       callback(url);
//       return url
//     })
//     .catch(err => {
//       console.log('err:', err)
//       showToast('' + err)
//       callback(err);
//     });
// });
// };


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
