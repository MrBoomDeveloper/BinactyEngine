import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, NativeEventEmitter, NativeModules, StyleSheet } from "react-native";
import { loadGamemodes, loadSettings, loadMoney, loadProfile, loadNews } from "@context";
import { getNews } from "@screens/Lobby/News";
import settingsPreset from "@data/SettingsData";
import { GameNative, AppBridge } from "@native";

export default function Loading({controller, target, args}) {
	const [loaded, setLoaded] = useState(0);
	const dispatch = useDispatch();
	
	async function loadStuff() {
		try {
			AppBridge.startMusic();
			dispatch(loadGamemodes({list: await GameNative.getGamemodes(), latest: await GameNative.getKey("string", "latestGamemode")}));
			setLoaded(15);
			dispatch(loadSettings(await GameNative.getKeys(settingsPreset)));
			setLoaded(30);
			dispatch(loadProfile(await GameNative.getMyData()));
			setLoaded(45);
			dispatch(loadNews(await getNews()));
			setLoaded(60);
			const coins = await GameNative.getKey("int", "coins");
			setLoaded(75);
			const diamonds = await GameNative.getKey("int", "diamonds");
			setLoaded(90);
			dispatch(loadMoney({coins, diamonds}));
			setLoaded(100);
			controller.setScreen("lobby");
		} catch(e) {
			alert(e);
			setLoaded(100);
			controller.setScreen("lobby");
		}
	}
	
	useEffect(() => {
		if(target == "lobby") loadStuff();
		if(target == "game") {
			new NativeEventEmitter(GameNative).addListener("GameOver", e => {
				controller.setScreen("gameover");
			});
			new NativeEventEmitter(GameNative).addListener("ForceExit", e => {
				loadStuff();
			});
			GameNative.play(args);
		}
	}, [target]);
	
	return (
		<View style={styles.screen}>
			<Image style={styles.banner} resizeMode="cover" source={require("../../../android/assets/packs/fnaf/src/banner.png")} />
			<Text style={styles.text}>Loading...  {loaded}%</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-end"
	},
	
	banner: {
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	
	text: {
		color: "white",
		fontSize: 25,
		fontWeight: "500",
		margin: 25
	}
});