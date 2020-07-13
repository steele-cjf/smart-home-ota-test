import {get, post, remove, put} from './http';
import {showToast} from './toast';
import Theme from '../style/colors';
import screen from '../style/sizes';
import storage from './storage';

global.$get = get;
global.$post = post;
global.$remove = remove;
global.$put = put;

global.showToast = showToast;
global.Theme = Theme;
global.screen = screen;

global.storage = storage;
