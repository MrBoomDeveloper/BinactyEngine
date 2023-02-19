import React, { useState, useEffect } from "react";
import { StatusBar, Pressable, StyleSheet, View, Text, BackHandler } from 'react-native';
import { Header, Navigation, Pager } from "@components";
import { Settings } from "@screens";
import GameNative from "./src/GameNative";
import { colors, sizes } from "@util/variables";
import { NavItems } from "@data/HomeData";
import Home from "@screens/lobby/Home";
import News from "@screens/lobby/News";

const Wip = () => {
	return (
		<View style={{
			width: "100%",
			height: "100%",
			flexGrow: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			paddingRight: 25, 
			paddingBottom: 50}}>
			
			<Text style={{color: "white", fontSize: 15}}>This page is currently under development.</Text>
		</View>
	);
}

function App() {
	const [playerData, setPlayerData] = useState({});
	const [currentPage, setCurrentPage] = useState("home");
	const [settingsVisibility, setSettingsVisibility] = useState(false);
	
	useEffect(() => {
		GameNative.getMyData(setPlayerData);
		
		BackHandler.addEventListener("hardwareBackPress", () => {
			GameNative.requestClose();
			return true;
		});
	}, []);
	
	const actions = [
		{ key: "settings", icon: require("@static/icon/settings.png"), onPress() { setSettingsVisibility(true) } }
	];
	
	return (
		<View style={styles.screen}>
			<StatusBar hidden={true}/>
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
};

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		width: "100%",
		flexGrow: 1,
		display: "flex",
		flexDirection: "row"
	}
});

export default App;