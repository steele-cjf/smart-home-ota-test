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
  storage
    .get('token')
    .then(
      accessToken =>
        (DEFAULT_CONFIG.headers.Authorization = 'Bearer ' + accessToken),
    );
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
    console.log('config', config.headers.Authorization)
    return fetch(appApi + url, config)
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
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
// image如果需要token时的处理
export const getImage = (url, callback) => {
  storage.get('token').then(accessToken => {
    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(response => response.blob())
      .then(blod => {
        let url = URL.createObjectURL(blod);
        callback(url);
      })
      .catch(err => {
        callback(err);
      });
  });
};

export default {
  get,
  post,
  put,
  remove,
  getImage,
};
