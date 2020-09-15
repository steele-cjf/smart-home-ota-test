/**
 * @register app
 */
import './src/util/global';
import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import App from "./example/App"; //<-- simply point to the example js!

// AppRegistry.registerComponent("MyAwesomeApp", () => App);
AppRegistry.registerComponent(appName, () => App);
