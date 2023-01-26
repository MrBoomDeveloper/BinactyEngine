import { NativeModules } from "react-native";

interface Native {
  play(gamemode: number): void;
  playCustom(gamemode: string, room: string, isHost: string);
  setupNick(callback: void): void;
  getPlayerData(nick: string): PlayerData;
}

interface PlayerData {
  nick: string;
  level: number;
  progress: number;
  avatar: string;
}

const { GameNative: Native } = NativeModules;

export default GameNative;