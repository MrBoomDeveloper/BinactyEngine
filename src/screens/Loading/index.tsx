import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, NativeEventEmitter, StyleSheet } from "react-native";
import { load as loadGamemodes } from "@context/gamemodes";
import { load as loadNews } from "@context/news";
import { setMoney as loadMoney, setProfile as loadProfile } from "@context/profile";
import { load as loadSettings } from "@context/settings";
import Button from "@components/Button";
import { getNews } from "@screens/Lobby/News";
import settingsPreset from "@data/SettingsData.json";
import { GameNative, AppBridge } from "@native";
import { SetScreenProps } from "App";

interface LoadingProps {
	setScreen: SetScreenProps,
	target: string,
	args: any
}

export default function Loading({setScreen, target, args}: LoadingProps) {
	const [loaded, setLoaded] = useState(0);
	const [isSigned, setIsSigned] = useState(true);
	const dispatch = useDispatch();
	
	async function loadStuff() {
		try {
			AppBridge.startMusic();
			AppBridge.setVolume(100);
			
			if((await GameNative.getKey("boolean", "beta")) && !(await AppBridge.isSignedIn())) {
				setIsSigned(false);
				return;
			}
			
			dispatch(loadGamemodes({list: await GameNative.getGamemodes(), latest: await GameNative.getKey("string", "latestGamemode")}));
			setLoaded(15);
			
			dispatch(loadSettings(await GameNative.getKeys(settingsPreset)));
			setLoaded(30);
			
			dispatch(loadProfile(await AppBridge.getMyData()));
			setLoaded(45);
			
			const coins = await GameNative.getKey("int", "coins");
			setLoaded(60);
			
			const diamonds = await GameNative.getKey("int", "diamonds");
			setLoaded(75);
			
			dispatch(loadMoney({coins, diamonds}));
			setLoaded(90);
			
			setTimeout(() => setScreen("lobby"), 2500);
			
			dispatch(loadNews(await getNews()));
			setLoaded(100);
			
			setScreen("lobby");
		} catch(e) {
			console.error(e);
			setLoaded(100);
			setScreen("lobby");
		}
	}
	
	useEffect(() => {
		if(target == "lobby") loadStuff();
		
		if(target == "game") {
			new NativeEventEmitter(GameNative).addListener("GameOver", e => {
				setScreen("gameover");
			});
			
			GameNative.play(args);
		}
		
		new NativeEventEmitter(GameNative).addListener("ForceExit", e => {
			setScreen("loading", {target: "lobby"});
			loadStuff();
		});
	}, [target]);
	
	return (
		<View style={styles.screen}>
			<Image style={styles.banner} resizeMode="cover" source={require("../../../android/assets/packs/fnaf/src/banner.png")} />
			{isSigned && <Text style={styles.text}>Loading...  {loaded}%</Text>}
			{(!isSigned) && <View style={styles.loginOptions}>
				<Button text="Continue with Google"
					icon={require("@static/icon/google.jpg")}
					onPress={() => AppBridge.signIn("google")}
					styleIcon={{width: 22, height: 22, marginHorizontal: 5}}
					theme="white" fill={true}/>
					
				<Button text="Continue as Guest"
					style={{paddingHorizontal: 20}}
					onPress={() => AppBridge.signIn("guest")}
					theme="white" fill={true}/>
			</View>}
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
	},
	
	loginOptions: {
		position: "absolute",
		left: 0,
		bottom: 0,
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
		padding: 50,
		gap: 15
	}
});