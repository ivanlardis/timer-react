/** @format */

import {AppRegistry} from 'react-native';
import App from './App';

import SettingView from './presentation/setting/Setting';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SettingView);
