import AsyncStorage from '@react-native-community/async-storage';

/**
 * 保存
 * @param key
 * @param value
 * @returns {*}
 */
export const set = (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify({data: value}));
};

/**
 * 删除
 * @param key
 * @returns {*}
 */
export const remove = key => {
  return AsyncStorage.removeItem(key);
};

/**
 * 更新
 * @param key
 * @param value
 * @returns {Promise<T>|Promise.<TResult>}
 */
export const update = (key, value) => {
  return AsyncStorage.mergeItem(key, JSON.stringify({data: value}));
};

/**
 * 获取
 * @param key
 * @param defaultValue
 * @returns {Promise<T>|*|Promise.<TResult>}
 */
export const get = (key, defaultValue = null) => {
  return AsyncStorage.getItem(key).then(value => {
    return value ? JSON.parse(value).data : defaultValue;
  });
};

/**
 * 清空
 * @returns {*}
 */
export const clear = () => {
  return AsyncStorage.clear();
};

export default {
  get,
  set,
  remove,
  update,
  clear,
};
