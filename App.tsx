import React, { useState, useEffect } from "react";
import { StatusBar, Pressable, StyleSheet, View, ScrollView, NativeModules } from 'react-native';
import { colors, sizes } from "@util/variables";
import Header from "@components/Header";
import Navigation from "@components/Navigation";
const { GameNative } = NativeModules;
import { navItems } from "@data/HomeData";
import Home from "@screens/lobby/Home";
import News from "@screens/lobby/News";

function App() {
	const [playerData, setPlayerData] = useState();
	
	useEffect(() => {
		GameNative.getMyData(setPlayerData);
	}, []);
	
	return (
		<View style={styles.screen}>
			<StatusBar hidden={true}/>
			<Header player={playerData} />
			<View style={styles.dualContainer}>
				<Navigation items={navItems} />
				<ScrollView style={styles.pageScroller}>
					<Home />
					<News />
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		//height: "100%",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		//height: "100%",
		display: "flex",
		flexDirection: "row"
	},
	
	pageScroller: {
		width: "100%"
	}
});

export default App;