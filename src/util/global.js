import {get, post, remove, put, getImage} from './http';
import {showToast} from './toast';
import Theme from '../style/colors';
import screen from '../style/sizes';
import storage from './storage';
import camera from '../page/Component/Camera'

global.$get = get;
global.$post = post;
global.$remove = remove;
global.$put = put;
global.$getImage = getImage

global.$camera = camera
global.showToast = showToast;
global.Theme = Theme;
global.screen = screen;

global.storage = storage;
