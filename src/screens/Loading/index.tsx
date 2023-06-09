import { Reducer, ReducerAction, useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, NativeEventEmitter, StyleSheet } from "react-native";
import { load as loadGamemodes } from "@context/gamemodes";
import { load as loadNews } from "@context/news";
import { setMoney as loadMoney, setProfile as loadProfile } from "@context/profile";
import { load as loadSettings } from "@context/settings";
import Button from "@components/Button";
import { getNews } from "@screens/Lobby/News";
import settingsPreset from "@data/SettingsData.json";
import { GameNative, AppBridge, PackBridge } from "@native";
import { SetScreenProps } from "App";

interface LoadingProps {
	setScreen: SetScreenProps,
	target: string,
	args: any
}

let isGameStarted = false;

export default function Loading({setScreen, target, args}: LoadingProps) {
	const [loaded, setLoaded] = useState({progress: 0, task: "account"});
	const [isSigned, setIsSigned] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const dispatch = useDispatch();

	async function login(method: string) {
		if(isProcessing) return;
		try {
			setIsProcessing(true);
			await AppBridge.signIn(method);
			setIsSigned(true);
			loadStuff();
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
			setLoaded({progress: 10, task: "gamemodes"});
			
			dispatch(loadGamemodes({list: await GameNative.getGamemodes(), latest: await GameNative.getKey("string", "latestGamemode")}));
			setLoaded({progress: 20, task: "settings"});
			
			dispatch(loadSettings(await GameNative.getKeys(settingsPreset)));
			setLoaded({progress: 30, task: "profile"});
			
			dispatch(loadProfile(await AppBridge.getMyData()));
			setLoaded({progress: 40, task: "money"});
			
			const coins = await GameNative.getKey("int", "coins");
			setLoaded({progress: 50, task: "money"});
			
			const diamonds = await GameNative.getKey("int", "diamonds");
			setLoaded({progress: 60, task: "money"});
			
			dispatch(loadMoney({coins, diamonds}));
			setLoaded({progress: 70, task: "packs"});
			
			await PackBridge.getPacks();
			setLoaded({progress: 80, task: "news"});

			setTimeout(() => setScreen("lobby"), 2500);

			dispatch(loadNews(await getNews()));
			setLoaded({progress: 90, task: "lobby"});
			
			setScreen("lobby");
			AppBridge.startMusic();
		} catch(e) {
			console.error(e);
			setLoaded({progress: 90, task: "lobby"});
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
			{isSigned && (<>
				<Text style={styles.text}>Loading {loaded.task} {loaded.progress}%</Text>
				<View style={[styles.progressBar, {width: loaded.progress + "%"}]} />
			</>)}

			{(!isSigned) && <View style={[styles.loginOptions, {opacity: (isProcessing ? 0.5 : 1)}]}>
				{/* <Button text="Continue with Google"
					icon={require("@static/icon/google.jpg")}
					styleIcon={{width: 22, height: 22, marginHorizontal: 5}}
					onPress={() => login("google")} 
					theme="white" fill={true}/>
					
				<Button text="Continue as Guest"
					style={{paddingHorizontal: 20}}
					onPress={() => login("guest")} 
					theme="white" fill={true} /> */}

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
	progressBar: {
		backgroundColor: "white",
		height: 8,
		width: "100%"
	},

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
		margin: 25,
		marginBottom: 10
	},
	
	loginOptions: {
		position: "absolute",
		left: 0,
		bottom: 0,
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
		padding: 35,
		gap: 10
	}
});