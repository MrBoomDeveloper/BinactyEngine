import React, { useState, useEffect } from "react";
import { StatusBar, Pressable, StyleSheet, Text, View, Image, NativeModules } from 'react-native';
import { colors, sizes } from "./src/util/variables.json";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";
import Button from "./src/components/Button";
const { GameNative } = NativeModules;
//import GameNative from "./src/GameNative";
import { navItems } from "./src/data/HomeData";

function App() {
	const [playerData, setPlayerData] = useState();
	
	useEffect(() => {
		GameNative.getMyData(setPlayerData);
	}, []);
	
	return (<View style={styles.homeScreen}>
		<StatusBar hidden={true}/>
		<Header player={playerData} />
		<View style={styles.dualContainer}>
			<Navigation items={navItems} />
			<View style={styles.pageScroller}>
				<View style={styles.home}>
					<View style={styles.homeMainColumn}>
						<Image source={require("./src/static/banner/gamemode/banner.jpg")} style={styles.homeBanner} />
						<Text style={styles.title}>Demo level</Text>
						<Text style={styles.description}>Hello there! Welcome to the "ActionPlatformer"! (The name will be changed in the future ._.)</Text>
						<View style={styles.actions}>
							<Button label="Play!" onPress={() => GameNative.play(0)} styleOuter={styles.button} />
							<Button label="Change gamemode" style={styles.button} />
						</View>
					</View>
				</View>
			</View>
		</View>
	</View>);
};

const styles = StyleSheet.create({
	homeScreen: {
		height: "100%",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		height: "100%",
		display: "flex",
		flexDirection: "row"
	},
	
	pageScroller: {
		width: "100%"
	},
	
	home: {
		width: "100%"
	},
	
	homeColumn: {
		width: "33%"
	},
	
	homeMainColumn: {
		width: 300,
		padding: 25,
		height: "100%"
	},
	
	homeBanner: {
		width: "100%",
		height: 125,
		backgroundColor: "black"
	},
	
	title: {
		fontSize: 20,
		fontWeight: 500,
		padding: 15,
		paddingTop: 20,
		paddingBottom: 0,
		color: "white"
	},
	
	description: {
		fontSize: 15,
		lineHeight: 22,
		fontWeight: 400,
		padding: 15,
		paddingTop: 10,
		flexGrow: 1,
		color: "white"
	},
	
	actions: {
		padding: 10,
		position: "relative",
		top: -50
	},
	
	button: {
		marginBottom: 5
	}
});

export default App;