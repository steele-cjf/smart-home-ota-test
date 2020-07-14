import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    Icons: MaterialCommunityIcons,
    icon: 'sort',
  },
  Operating_Record: {
    name: '操作记录',
    Icons: Ionicons,
    icon: 'ios-color-palette',
  },
  Setting: {name: '我的设置', Icons: Ionicons, icon: 'md-checkbox-outline'},

  Privacy_Policy: {name: '隐私政策', Icons: Ionicons, icon: 'ios-bookmarks'},
  Feedback: {name: '意见反馈', Icons: MaterialIcons, icon: 'feedback'},
  About: {name: '关于APP', Icons: Ionicons, icon: 'logo-github'},
};
