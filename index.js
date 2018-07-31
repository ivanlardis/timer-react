/** @format */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import Timer from "./presentation/timer/Timer";
import SettingView from "./presentation/setting/Setting";
import App from "./App";
import HistoryView from "./presentation/history/History";

AppRegistry.registerComponent(appName, () => HistoryView);
