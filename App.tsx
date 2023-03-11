import React, { useState, useEffect } from "react";
import { StatusBar, Pressable, StyleSheet, View, Text, BackHandler } from 'react-native';
import { Header, Navigation, Pager, Button } from "@components";
import { Settings } from "@screens";
import GameNative from "@native";
import { colors, sizes } from "@util/variables";
import { NavItems } from "@data/HomeData";
import { Provider, useDispatch } from "react-redux";
import Home from "@screens/lobby/Home";
import News from "@screens/lobby/News";
import { store } from "@context/store";
import { load as loadGamemodes } from "@context/gamemodes";
import { load as loadSettings } from "@context/settings";
import { load as loadNews } from "@context/news";
import { getNews } from "@screens/lobby/News";
import settingsPreset from "@data/SettingsData";

const Wip = () => {
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

function Screen() {
	const [playerData, setPlayerData] = useState({});
	const [currentPage, setCurrentPage] = useState("home");
	const [settingsVisibility, setSettingsVisibility] = useState(false);
	const dispatch = useDispatch();
	
	useEffect(() => {
		GameNative.getKeys(settingsPreset, result => {
			dispatch(loadSettings(result));
		});
		
		GameNative.getGamemodes(result => {
			dispatch(loadGamemodes(result));
		});
		
		getNews(result => {
			dispatch(loadNews(result));
		});
		
		GameNative.getMyData(setPlayerData);
	}, []);
	
	const actions = [
		{ key: "settings", icon: require("@static/icon/settings.png"), onPress() { setSettingsVisibility(true) } }
	];
	
	return (
		<View style={styles.screen}>
			<Header player={playerData} actions={actions}/>
			<View style={styles.dualContainer}>
				<Navigation items={NavItems} onSelect={setCurrentPage}/>
				<Pager select={currentPage}>
					<Home id="home"/>
					<Wip id="skills" />
					<Wip id="shop" />
					<News id="logs"/>
					<Wip id="about" />
				</Pager>
			</View>
			
			<Settings visible={settingsVisibility} onClose={() => setSettingsVisibility(false)} />
		</View>
	);
}

export default function App() {
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			GameNative.requestClose();
			return true;
		});
	}, []);
	
	return (
		<View style={{flex: 1}}>
			<Provider store={store}>
				<StatusBar hidden={true}/>
				<Screen />
			</Provider>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		height: "100%",
		width: "100%",
		flex: 1,
		flexDirection: "column",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		flexGrow: 1,
		flexDirection: "row",
	}
});