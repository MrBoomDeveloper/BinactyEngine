import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, BackHandler, NativeEventEmitter } from "react-native";
import { useSelector } from "react-redux";
import { Header, Navigation, Pager, Button } from "@components";
import { Settings } from "@screens";
import Home from "@screens/Lobby/Home";
import News from "@screens/Lobby/News";
import { colors } from "@util/variables";
import { NavItems } from "@data/HomeData";
import Character from "./character/Character";
import About from "./about/About";
import GameNative, { PackBridge, AppBridge } from "@native";

export default function Lobby({controller}) {
	const [currentPage, setCurrentPage] = useState("home");
	const [settingsVisibility, setSettingsVisibility] = useState(false);
	const profile = useSelector(state => state.profile.value.me);
	const money = useSelector(state => state.profile.value.money);
	
	const settings = useSelector(state => state.settings.value);
	const isBeta = useMemo(() => settings.find(({id}) => id == "beta").initial, [settings]);
	
	const actions = [
		{ key: "settings", icon: require("@static/icon/settings.png"), onPress() { setSettingsVisibility(true) } }
	];
	
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", e => {
			GameNative.requestClose();
			return true;
		});
		
		new NativeEventEmitter(PackBridge).addListener("reload", e => {
			AppBridge.stopMusic();
			controller.setScreen("loading", {target: "lobby"});
		});
	}, []);
	
	return (
		<View style={styles.screen}>
			<Header player={profile} values={money} actions={actions}>
				<View style={{flexDirection: "row", justifyContent: "center"}}>
					<Button text="Manage Installed Packs"
						onPress={() => PackBridge.managePacks()}
						theme="popup" fill={true}
						style={{paddingHorizontal: 50}}
						rippleColor="rgba(250, 250, 250, .1)" />
				</View>
			</Header>
			
			<View style={styles.dualContainer}>
				<Navigation items={NavItems} onSelect={setCurrentPage}/>
				<Pager select={currentPage}>
					<Home controller={controller} id="home"/>
					{isBeta ? <Character id="character" /> : <Wip id="character" />}
					<Wip id="skills" />
					<Wip id="shop" />
					<News id="logs"/>
					{isBeta ? <About id="about" /> : <Wip id="about" />}
				</Pager>
			</View>
			
			<Settings visible={settingsVisibility} onClose={() => setSettingsVisibility(false)} />
		</View>
	);
}

function Wip() {
	return (
		<View style={{
			width: "100%",
			flexGrow: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			paddingRight: 25, 
			paddingBottom: 50}}>
			
			<Text style={{color: "white", fontSize: 16, marginBottom: 20}}>This page is currently under development.</Text>
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