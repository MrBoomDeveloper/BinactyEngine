import { useState, useEffect, memo } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity, Linking } from "react-native";
import { parse as parseRss } from "rss-to-json";
import moment from "moment";

const url: string = "https://mrboomdev.bearblog.dev/feed/?type=rss";

function News() {
	const [news, setNews] = useState([]);
	
	const loadNews = async () => {
		const result = await parseRss(url);
		setNews(result.items.sort((was, next) => {
			return next.created - was.created;
		}));
	}
	
	useEffect(() => { loadNews() }, []);
	
	return (
		<View style={styles.screen}>
			<FlatList data={news}
			  ListHeaderComponent={Header}
			  ItemSeparatorComponent={<View style={styles.separator} />}
			  ListEmptyComponent={<Text>Loading...</Text>}
			  renderItem={Item}/>
		</View>
	);
}

export function Item({item: {title, description, link, created}}) {
	return (
		<TouchableOpacity onPress={() => Linking.openURL(link)}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{removeHtml(description)}</Text>
			<View style={styles.meta}>
				<Text>{moment(created).fromNow()}</Text>
				<Text>{link}</Text>
			</View>
		</TouchableOpacity>
	);
}

function Header() {
	return (
		<Text style={styles.header}>Recent Updates</Text>
	);
}

function removeHtml(input: string): string {
	let result: string = input.replace(/<div>/g, "");
	result = result.replace(/<\/div>/g, "");
	result = result.replace(/<p>/g, "");
	result = result.replace(/<\/p>/g, "");
	if(result.charAt(result.length - 1) == '\n')
		result = result.substring(0, result.length - 1);
	return result;
}

const styles = StyleSheet.create({
	screen: {
		padding: 25
	},
	
	header: {
		color: "white",
		fontSize: 24,
		fontWeight: "500",
		marginBottom: 20
	},
	
	title: {
		color: "white",
		fontWeight: "500",
		marginBottom: 6,
		fontSize: 19
	},
	
	description: {
		marginVertical: 2,
		lineHeight: 24,
		color: "#fff"
	},
	
	meta: {
		marginTop: 8,
		flexDirection: "row",
		gap: 25
	},
	
	separator: {
		backgroundColor: "#ddd",
		height: 1,
		opacity: .1,
		marginVertical: 15,
		width: "100%"
	}
});

export default memo(News);