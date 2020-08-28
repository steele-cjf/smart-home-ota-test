import { Platform } from 'react-native';
export const ip = 'http://47.112.238.28:9700';

export const appApi = ip + '/app';

export const IS_DEV = __DEV__;
export const IS_IOS = Object.is(Platform.OS, 'ios');
export const IS_ANDROID = !IS_IOS;
