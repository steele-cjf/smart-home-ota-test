import {get, post, remove, put, getImage, DEFAULT_CONFIG, appApi} from './http';
import {showToast} from './toast';
import Theme from '../style/colors';
import screen from '../style/sizes';
import storage from './storage';
import camera from '../page/Component/Camera';
import NavigatorService from './navigatorService';

global.$get = get;
global.$post = post;
global.$remove = remove;
global.$put = put;
global.$getImage = getImage;
global.$DEFAULT_CONFIG = DEFAULT_CONFIG;

global.$camera = camera;
global.showToast = showToast;
global.Theme = Theme;
global.$screen = screen;

global.storage = storage;
global.APP_API = appApi;

global.NavigatorService = NavigatorService;
