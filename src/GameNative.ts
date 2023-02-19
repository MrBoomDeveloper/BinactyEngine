import { NativeModules } from "react-native";

interface Native {
	play(gamemode: number): void;
	playCustom(gamemode: string, room: string, isHost: string);
	
	setupNick(callback: void): void;
	getPlayerData(nick: string): PlayerData;
	
	setkey(key: sting, value: any, type: string): void;
	getKeys(keys, callback: void): any[];
	requestClose(): void;
}

interface PlayerData {
	nick: string;
	level: number;
	progress: number;
	avatar: string;
}

const { GameNative } = NativeModules;

export default GameNative;