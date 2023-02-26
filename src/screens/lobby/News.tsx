import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text } from "react-native";

const url: string = "https://github.com/MrBoomDeveloper/platformer/releases.atom";

export default function News() {
	const [news, setNews] = useState("");
	
	const loadNews = async () => {
		fetch(url)
			.then(result => result.text())
			.then(setNews)
			.catch(setNews);
	}
	
	useEffect(() => {
		loadNews();
	}, []);
	
	return (
		<View style={styles.screen}>
			<FlatList ListHeaderComponent={Header} />
		</View>
	);
}

function Header() {
	return (
		<Text style={styles.header}>Recent Updates</Text>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 25
	},
	
	header: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 15
	}
});