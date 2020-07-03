import {stringify} from 'query-string';
import {appApi} from '../config';
import {showToast} from './toast';

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
export const httpService = (url, options) => {
  const defaultOptions = {
    includeCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(appApi + url, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .catch(error => {
      showToast('networkError');
    });
};

export const get = (url, getParams) => {
  return httpService(formatURL(url, getParams), {method: 'GET'});
};

export const post = (url, data) => {
  return httpService(url, {method: 'POST', body: JSON.stringify(data)});
};

export const put = (url, data) => {
  return httpService(url, {method: 'PUT', body: JSON.stringify(data)});
};

export const remove = (url, data) => {
  return httpService(url, {method: 'DELETE', body: JSON.stringify(data)});
};

export default {
  get,
  post,
  put,
  remove,
};
