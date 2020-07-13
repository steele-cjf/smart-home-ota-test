import {stringify} from 'query-string';
import {appApi} from '../config';
import {showToast} from './toast';
import storage from './storage';

// 默认配置
const DEFAULT_CONFIG = {
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
  // const accessToken = await storage.get('token');
  // if (accessToken) {
  //   DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken;
  // }
  storage
    .get('token')
    .then(
      accessToken =>
        (DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken),
    );
  if (config.body) {
    config.body = config.body && JSON.stringify(config.body);
  }
  return dispatch => {
    config = Object.assign({}, DEFAULT_CONFIG, config);
    return fetch(appApi + url, config)
      .then(response => response.json())
      .then(response => {
        console.log('config', response);
        // let data = JSON.stringify(response);
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
        console.log(error);

        showToast('networkError');
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
  return httpService(url, config);
};

export default {
  get,
  post,
  put,
  remove,
};
