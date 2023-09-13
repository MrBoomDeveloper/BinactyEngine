import { memo, useEffect, useState } from "react";
import { View, Text, Image, NativeEventEmitter, StyleSheet, TouchableOpacity } from "react-native";
import { setupList as setupGamemodesList, setupProgresses as setupGamemodeProgresses, Progresses } from "@context/gamemodes";
import { setMoney as loadMoney, setProfile as loadProfile } from "@context/profile";
import { SettingsItem, setup as setupSettings } from "@context/settings";
import { setup as setupPacks } from "@context/packs";
import Button from "@components/Button";
import settingsAll from "@data/settings.json";
import { GameNative, AppBridge, PackBridge } from "@native";
import { SetScreenProps } from "App";
import * as constants from "@data/constants.json";
import { useAppDispatch, useAsyncMemo, useTheme } from "@util/hooks";
import { FadingView } from "features/effects/FadingView";

let isGameStarted = false;

interface LoadingStepProps {
	setLoaded: (props: {progress: number, task: string}) => void,
	dispatch: (payload: any) => void
}

function Loading({setScreen, target, args}: {
	setScreen: SetScreenProps,
	target: string,
	args: any
}) {
	const [loaded, setLoaded] = useState({progress: 0, task: "account"});
	const [isFirstGame, setIsFirstGame] = useState(false);
	const [isSigned, setIsSigned] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const dispatch = useAppDispatch();

	const debugInfo = useAsyncMemo(async () => await AppBridge.getDebugMap(), null);

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
		AppBridge.startMusic();

		if(await AppBridge.getKey("boolean", "isFirstGame", true)) {
			setIsFirstGame(true);
			setIsSigned(false);
			PackBridge.getPacks();
			return;
		}

		try {
			if((await AppBridge.getKey("boolean", "beta", false)) && !(await AppBridge.isSignedIn())) {
				setIsSigned(false);
				return;
			}
			
			setLoaded({progress: 10, task: "packs"});
			dispatch(setupPacks(await PackBridge.getPacks()));

			await loadGamemodes({setLoaded, dispatch});
			await loadSettings({setLoaded, dispatch});

			setLoaded({progress: 50, task: "profile"});
			dispatch(loadProfile(await AppBridge.getMyData()));

			setLoaded({progress: 60, task: "money"});
			const coins = await AppBridge.getKey("int", "coins", 0);

			setLoaded({progress: 70, task: "money"});
			const diamonds = await AppBridge.getKey("int", "diamonds", 0);

			setLoaded({progress: 80, task: "money"});
			dispatch(loadMoney({coins, diamonds}));

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

			const gameOverListener = new NativeEventEmitter(GameNative).addListener("GameOver", e => {
				setScreen("gameover");
				isGameStarted = false;
				gameOverListener.remove();
			});
			
			AppBridge.stopMusic();
			GameNative.play(args);
			isGameStarted = true;
		}
		
		new NativeEventEmitter(GameNative).addListener("ForceExit", e => {
			setScreen("loading", { target: "lobby" });
			loadStuff();
			isGameStarted = false;
		});
	}, [target]);
	
	return (
		<FadingView style={styles.screen} duration={400}>
			<Image style={styles.banner} resizeMode="cover" source={require("@static/banner/loading_poster.jpg")} />
			<Shadow />

			<View style={{flex: 1, paddingHorizontal: constants.size.inlineScreenPadding}}>
				{debugInfo != null && <View style={{flex: 1, paddingTop: 10, flexDirection: "row"}}>
					<Text style={styles.debugText}>Version: {debugInfo.buildVersionName}</Text>
					<View style={{flexGrow: 1}} />
					<Text style={styles.debugText}>Device: {debugInfo.deviceBrand} {debugInfo.deviceModel}</Text>
				</View>}

				{(isSigned && !isFirstGame) && (<>
					<Text style={styles.progressPercentage}>Loading {loaded.task}:  {loaded.progress}%</Text>
					<View style={[styles.progressBar, {width: loaded.progress + "%"}]} />
				</>)}

				{(!isSigned) && <View style={{opacity: (isProcessing ? 0.5 : 1)}}>
					<Text style={styles.loginTitle}>Welcome to the Binacty Engine</Text>
					<Text style={styles.loginDescription}>A powerful mobile game engine for beautiful 2d games.</Text>

					{!isFirstGame ? (<>
						<View style={styles.loginOptions}>
							<Button text="Continue with BoomID"
								style={{paddingLeft: 10, paddingRight: 12}}
								styleIcon={{height: 24, marginRight: 4}}
								icon={require("@static/icon/person_black_outlined.png")}
								onPress={() => login("name")}
								theme="white" />
							
							<Button text="Continue as Guest"
								style={{paddingLeft: 10, paddingRight: 12}}
								styleIcon={{height: 24, marginRight: 4}}
								icon={require("@static/icon/time_black_outlined.png")}
								onPress={() => login("guest")}
								theme="white" />
						</View>
					</>) : (
						<TouchableOpacity onPress={async () => {
							await AppBridge.setKey("boolean", "isFirstGame", false);
							setIsFirstGame(false);
							setIsSigned(true);

							try {
								await AppBridge.startFirstGame();
							} catch(e) {
								console.error(e);
								loadStuff();
							}
						}}>
							<Text style={styles.touchToStart}>Touch here to start the game</Text>
						</TouchableOpacity>
					)}
				</View>}
			</View>
		</FadingView>
	);
}

async function loadSettings({setLoaded, dispatch}: LoadingStepProps) {
	setLoaded({progress: 40, task: "settings"});

	const settingsList: SettingsItem[] = settingsAll.reduce((all: SettingsItem[], next) => {
		next.data.forEach(item => all.push(item as SettingsItem));
		return all;
	}, []);
		
	dispatch(setupSettings(await AppBridge.getKeys(settingsList)));
}

async function loadGamemodes({setLoaded, dispatch}: LoadingStepProps) {
	setLoaded({progress: 20, task: "gamemodes list"});

	const gamemodes = await PackBridge.getGamemodes();
	dispatch(setupGamemodesList({
		list: gamemodes,
		latest: await AppBridge.getKey("string", "latestGamemode", "") as string
	}));
			
	setLoaded({progress: 30, task: "gamemode progresses"});

	const progresses: Progresses = {};
	const pending: SettingsItem[] = [];
	for(const cat of gamemodes) {
		for(const gamemode of cat.data) {
			pending.push({
				id: `gm_${gamemode.id}__latestLevel`,
				type: "string",
				value: "{\"category\":\"\", \"level\": \"\"}"
			});
		}
	}

	const got = await AppBridge.getKeys(pending);
	for(const item of got) {
		const gamemodeId = item.id.substring(3, item.id.lastIndexOf("__"));

		if(!(gamemodeId in item)) {
			progresses[gamemodeId] = {
				latestLevel: { category: "", level: "" }
			}
		}

		if(item.id.endsWith("__latestLevel")) {
			try {
				progresses[gamemodeId].latestLevel = JSON.parse(item.value as string);
			} catch(e) {
				console.warn(e);
			}
		}
	}

	dispatch(setupGamemodeProgresses(progresses));
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
	touchToStart: {
		width: "100%",
		paddingTop: 30,
		paddingBottom: 45,
		textAlign: "center",
		color: "white",
		fontFamily: "OpenSansRegular",
		fontSize: 15
	},

	progressBar: {
		backgroundColor: "white",
		height: 3,
		width: "100%",
		marginVertical: 8,
		borderRadius: 3
	},

	progressPercentage: {
		color: "white",
		fontSize: 25,
		fontFamily: "HeeboRegular",
		marginBottom: 10
	},

	debugText: {
		fontFamily: "OpenSansRegular",
		color: "#ffffff90"
	},

	shadowBottom: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		height: 150,
		opacity: 0.5
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

	loginTitle: {
		color: "white",
		textAlign: "center",
		fontFamily: "HeeboBold",
		textShadowColor: "black",
		textShadowRadius: 5,
		fontSize: 27
	},

	loginDescription: {
		color: "#ffffff",
		textAlign: "center",
		textShadowColor: "black",
		textShadowRadius: 5,
		fontFamily: "OpenSansMedium",
		marginTop: 8,
		marginBottom: 10
	},
	
	loginOptions: {
		justifyContent: "center",
		flexDirection: "row",
		paddingBottom: 35,
		paddingTop: 10,
		gap: 12
	}
});

export default memo(Loading);