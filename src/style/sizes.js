import {
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native';
import { IS_IOS } from '../config';

export const safeAreaViewTop = 44;
export const safeAreaViewBottom = 34;
export const defaultHeaderHeight = IS_IOS ? 44 : 56;

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;



// 设计图适配的标准
const X_WIDTH = 414;
const X_HEIGHT = 896;


// screen 屏幕宽度
export const SCREEN_WIDTH = Dimensions.get('window').width;
// screen 屏幕高度
export const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
* 屏幕适配,缩放size
* @param size
* @returns size
* @constructor
*/
export function scaleSize(size) {
  var scaleWidth = SCREEN_WIDTH / X_WIDTH;
  var scaleHeight = SCREEN_HEIGHT / X_HEIGHT;
  var scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5));
  return size;
}
export const screen = {
  height: screenHeight,
  width: screenWidth,
  widthHalf: screenWidth * 0.5,
  widthThird: screenWidth * 0.333,
  widthQuarter: screenWidth * 0.25,
  heightSafeArea: screenHeight - safeAreaViewTop,
};
export default {
  screen,
  navbarHeight: IS_IOS ? 50 : 50,
  scaleSize
};
