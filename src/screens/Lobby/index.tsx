import { useEffect } from "react";
import { View, StyleSheet, NativeEventEmitter } from "react-native";
import Header from "@components/Header";
import Button from "@components/Button";
import Home from "@screens/Lobby/Home";
import { colors } from "@util/variables.json";
import { PackBridge, AppBridge } from "@native";
import { SetScreenProps } from "App";
import { useAppSelector } from "@util/hooks";

interface LobbyProps {
	setScreen: SetScreenProps
}

export default function Lobby({setScreen}: LobbyProps) {
	const profile = useAppSelector(state => state.profile.me);
	
	useEffect(() => {
		new NativeEventEmitter(PackBridge).addListener("reload", e => {
			AppBridge.stopMusic();
			setScreen("loading", {target: "lobby"});
		});
	}, []);
	
	return (
		<View style={styles.screen}>
			<Header player={profile} actions={[]}>
				<View style={{flexDirection: "row", justifyContent: "center"}}>
					<Button text="Manage Installed Packs"
						onPress={() => PackBridge.managePacks()}
						theme="popup"
						style={{paddingHorizontal: 50}}
						rippleColor="rgba(250, 250, 250, .1)" />
				</View>
			</Header>
			
			<View style={styles.dualContainer}>
				<Home setScreen={setScreen} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		flexGrow: 1,
		flexDirection: "row",
		overflow: "hidden"
	}
});