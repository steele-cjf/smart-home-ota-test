import {Dimensions} from 'react-native';
import {IS_IOS} from '../config';

export const safeAreaViewTop = 44;
export const safeAreaViewBottom = 34;
export const defaultHeaderHeight = IS_IOS ? 44 : 56;

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

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
};
