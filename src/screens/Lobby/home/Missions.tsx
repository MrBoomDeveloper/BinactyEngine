import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import GameNative from "../../../GameNative";

export default function Missions() {
	const [missions, setMissions] = useState([]);
	
	useEffect(() => {
		//TODO: Get missions from GameNative.getMissions();
	}, []);
	
	return (
		<View style={styles.card}>
			<FlatList
			  renderItem={Mission}
			  ListHeaderComponent={Header}
			  ListEmptyComponent={Blank}
			  data={missions} />
		</View>
	);
}

function Header() {
	return (
		<Text style={styles.header}>Missions</Text>
	);
}

function Mission() {
	return (
		<View>
		</View>
	);
}

function Blank() {
	return (
		<View style={styles.blank}>
			<Text style={styles.blankTitle}>Coming soon...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 250,
		borderRadius: 12,
		backgroundColor: "#190A29",
		marginRight: 20
	},
	
	mission: {
		
	},
	
	header: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		padding: 16,
		paddingHorizontal: 24,
		paddingBottom: 6
	},
	
	blank: {
		height: 300,
		justifyContent: "center"
	},
	
	blankTitle: {
		fontSize: 16,
		textAlign: "center"
	}
});