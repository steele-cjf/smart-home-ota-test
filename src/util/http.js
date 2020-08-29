import { stringify } from 'query-string';
import { appApi, ip } from '../config';
// import { showToast } from './toast';
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
// image如果需要token时的处理
export const getImage = (url, callback) => {
  let xx = 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2489377083,111398083&fm=173&app=49&size=f242,162&n=0&g=0n&f=JPEG?s=92BC7884220B0B598A31B4870300E041&sec=1598691919&t=09617e1c106f59304503f04eb2cee0db'

  storage.get('token').then(accessToken => {
    let xx = 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2489377083,111398083&fm=173&app=49&size=f242,162&n=0&g=0n&f=JPEG?s=92BC7884220B0B598A31B4870300E041&sec=1598691919&t=09617e1c106f59304503f04eb2cee0db'
    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        ContentType: 'image/png'
      },
    })
      .then(response => response.blob())
      .then(blod => {
        console.log('blod', blod);
        let url = URL.createObjectURL(blod);
        callback(url);
        return url
      })
      .catch(err => {
        showToast('' + err)
        callback(err);
      });
  });
};

export function post2(url, config) {
  return (dispatch => {
    config.method = 'POST';
    config.headers = Object.assign({}, DEFAULT_CONFIG.headers, config.headers);
    config = Object.assign({}, DEFAULT_CONFIG, config);

    return fetch(appApi + url, config)
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        if (config.successConfig && config.successConfig.callback) {
          config.successConfig.callback(objectURL);
        }
        // return uri
        return objectURL;
      })
      .catch(error => {
        console.log(error);
        showToast('networkError2');
      });
  });
}


export default {
  get,
  post,
  post2,
  put,
  remove,
  getImage,
  DEFAULT_CONFIG,
  appApi
};
