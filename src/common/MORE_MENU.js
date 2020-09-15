import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MORE_MENU = {
  Owner: {
    name: '我是业主',
    Icons: Ionicons,
    icon: 'md-checkbox-outline',
  },
  Tenement: {
    name: '我是租户',
    Icons: AntDesign,
    icon: 'home'
  },
  House_Collect: {
    name: '房源收藏',
    Icons: Ionicons,
    icon: 'color-palette',
  },
  Setting: {name: '我的设置', Icons: Ionicons, icon: 'md-checkbox-outline'},

  Privacy_Policy: {name: '隐私政策', Icons: Ionicons, icon: 'bookmarks'},
  Feedback: {name: '意见反馈', Icons: MaterialIcons, icon: 'feedback'},
  About: {name: '关于APP', Icons: Ionicons, icon: 'logo-github'},

  HouseDetail: {name: '房屋详情', Icons: Ionicons, icon: 'bookmarks'},
  TemporaryKey: {name: '临时钥匙', Icons: Ionicons, icon: 'logo-github'},
  // Member: {name: '家庭成员', Icons: Ionicons, icon: 'md-checkbox-outline'},
  Record: {name: '开门记录', Icons: Ionicons, icon: 'logo-github'},
  Declare: {name: '门锁/设备配置', Icons: Ionicons, icon: 'logo-github'},
  ComponentTest: {name: '组件预研', Icons: Ionicons, icon: 'logo-github'},
};
