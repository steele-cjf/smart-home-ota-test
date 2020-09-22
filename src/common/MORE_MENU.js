import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icomoon from './Icomoon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MORE_MENU = {
  Owner: {
    name: '我是业主',
    Icons: Icomoon, //Ionicons,
    icon: 'woshifangdong', //'md-checkbox-outline',
  },
  Tenement: {
    name: '我是租户',
    Icons: Icomoon, //AntDesign,
    icon: 'woshizufang', //'home'
  },
  House_Collect: {
    name: '房源收藏',
    Icons: Ionicons,
    icon: 'color-palette',
  },
  Setting: {name: '我的设置', Icons: Icomoon, icon: 'shezhi'},

  Privacy_Policy: {name: '隐私政策', Icons: Icomoon, icon: 'yinsizhengce'},
  Feedback: {name: '意见反馈', Icons: Icomoon, icon: 'yijianfankui'},
  About: {name: '关于APP', Icons: Icomoon, icon: 'guanyuapp'},

  HouseDetail: {name: '房屋详情', Icons: Icomoon, icon: 'fangwu'},
  TemporaryKey: {name: '临时钥匙', Icons: Icomoon, icon: 'linshiyaoshi'},
  // Member: {name: '家庭成员', Icons: Ionicons, icon: 'md-checkbox-outline'},
  Record: {name: '开门记录', Icons: Icomoon, icon: 'kaimenjilu'},
  Declare: {name: '门锁/设备配置', Icons: Icomoon, icon: 'mensuo'},
  ComponentTest: {name: '组件预研', Icons: Icomoon, icon: 'guzhangshenbao'},
};
