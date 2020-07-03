import {Platform} from 'react-native';

export const appApi = 'http://120.79.180.135:9700';

export const IS_DEV = __DEV__;
export const IS_IOS = Object.is(Platform.OS, 'ios');
export const IS_ANDROID = !IS_IOS;
