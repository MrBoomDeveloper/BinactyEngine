import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

export default function News() {
	const [news, setNews] = useState("");
	
	const loadNews = async () => {
		const result = await fetch("https://mrboomdev.ru");
		const text = await result.text();
		setNews(text);
	}
	
	useEffect(() => {
		loadNews();
	}, []);
	
	return (
		<ScrollView style={styles.screen}>
			<Text style={styles.title}>Latest news</Text>
			<Text>{news}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 25
	},
	
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 15
	}
});