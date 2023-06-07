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

let isGameStarted = false;

export default function Loading({setScreen, target, args}: LoadingProps) {
	const [loaded, setLoaded] = useState(0);
	const [isSigned, setIsSigned] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const dispatch = useDispatch();

	function login(method: string) {
		if(isProcessing) return;
		try {
			setIsProcessing(true);
			AppBridge.signIn(method);
		} catch(e) {
			setIsProcessing(false);
			console.error(e);
		}
	}
	
	async function loadStuff() {
		try {
			AppBridge.startMusic();
			
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
			AppBridge.startMusic();
		} catch(e) {
			console.error(e);
			setLoaded(100);
			setScreen("lobby");
		}
	}
	
	useEffect(() => {
		if(target == "lobby") loadStuff();
		
		if(target == "game") {
			if(isGameStarted) {
				loadStuff();
				isGameStarted = false;
				return;
			}

			new NativeEventEmitter(GameNative).addListener("GameOver", e => {
				setScreen("gameover");
				isGameStarted = false;
			});
			
			AppBridge.stopMusic();
			GameNative.play(args);
			isGameStarted = true;
		}
		
		new NativeEventEmitter(GameNative).addListener("ForceExit", e => {
			setScreen("loading", {target: "lobby"});
			loadStuff();
			isGameStarted = false;
		});
	}, [target]);
	
	return (
		<View style={styles.screen}>
			<Image style={styles.banner} resizeMode="cover" source={require("../../../android/assets/packs/official/src/images/banner.jpg")} />
			<Shadow />
			{isSigned && <Text style={styles.text}>Loading...  {loaded}%</Text>}
			{(!isSigned) && <View style={[styles.loginOptions, {opacity: (isProcessing ? 0.5 : 1)}]}>
				<Button text="Continue with Google"
					icon={require("@static/icon/google.jpg")}
					styleIcon={{width: 22, height: 22, marginHorizontal: 5}}
					onPress={() => login("google")} 
					theme="white" fill={true}/>
					
				<Button text="Continue as Guest"
					style={{paddingHorizontal: 20}}
					onPress={() => login("guest")} 
					theme="white" fill={true} />

				<Button text="Continue by Nickname"
					style={{paddingHorizontal: 20}}
					onPress={() => login("name")}
					theme="white" fill={true}/>
			</View>}
		</View>
	);
}

function Shadow() {
    return (
        <>
            <Image resizeMode="stretch"
				style={styles.shadowBottom}
				source={require("@static/ui/gradientShadowBottomTop.png")} />
        </>
    );
}

const styles = StyleSheet.create({
	shadowBottom: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		height: 200,
		opacity: 0.75
	},

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
		gap: 10
	}
});