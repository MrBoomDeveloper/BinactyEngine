import React, { useState, useEffect } from "react";
import { StatusBar, Pressable, StyleSheet, View, Text, NativeModules } from 'react-native';
import { Header, Navigation, Pager } from "@components";
import { colors, sizes } from "@util/variables";
const { GameNative } = NativeModules;
import { NavItems } from "@data/HomeData";
import Home from "@screens/lobby/Home";
import News from "@screens/lobby/News";

const Wip = () => {
	return (
		<View style={{flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 25, paddingBottom: 50}}>
			<Text style={{color: "white", fontSize: 15}}>This page is currently under development.</Text>
		</View>
	);
}

function App() {
	const [playerData, setPlayerData] = useState({});
	const [currentPage, setCurrentPage] = useState("home");
	
	useEffect(() => {
		GameNative.getMyData(setPlayerData);
	}, []);
	
	return (
		<View style={styles.screen}>
			<StatusBar hidden={true}/>
			<Header player={playerData} />
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
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		display: "flex",
		flexGrow: 1,
		flexDirection: "row"
	}
});

export default App;