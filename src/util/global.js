import http from './http';
import {showToast} from './toast';
import Theme from '../style/colors';
import screen from '../style/sizes';

global.http = http;
global.showToast = showToast;
global.Theme = Theme;
global.screen = screen;
