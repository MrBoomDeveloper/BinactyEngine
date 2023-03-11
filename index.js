import { AppRegistry } from 'react-native';
import App from './App';
import GameOver from "@screens/GameOver";

AppRegistry.registerComponent("GameLobbyScreen", () => App);
AppRegistry.registerComponent("GameOverScreen", () => GameOver);