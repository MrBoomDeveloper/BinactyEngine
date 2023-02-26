import { AppRegistry } from 'react-native';
import App from './App';
import GameOver from "@screens/GameOver";
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent("GameOverScreen", () => GameOver);