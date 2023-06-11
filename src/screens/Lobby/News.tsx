import { memo, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, FlatList, View, Text, TouchableOpacity, Linking } from "react-native";
import { parse as parseRss } from "rss-to-json";
import { colors } from "@util/variables.json";
import { removeHtml } from "@util/format";
import moment from "moment";

function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		parseNews();
	}, []);

	async function parseNews() {
		try {
			let result = await parseRss("https://mrboomdev.bearblog.dev/feed/?type=rss");
			result = result.items.sort((was, next) => {
				return next.created - was.created;
			});
				
			let sortedNews = [];
			const filteredNews = result.filter(next => {
				if(getOptions(removeHtml(next.description, false)).pin) {
					sortedNews.push(next);
					return false;
				}
				return true;
			});
			
			setNews([...sortedNews, ...filteredNews]);
		} catch(e) {
			console.error(e);
		}
	}
	
	return (
		<View style={styles.screen}>
			<FlatList data={news}
			  ListHeaderComponent={Header}
			  ListFooterComponent={<View style={{marginBottom: 50}} />}
			  ItemSeparatorComponent={<View style={styles.separator} />}
			  ListEmptyComponent={Blank}
			  renderItem={Item}/>
		</View>
	);
}

function Item({item: {title, description, created}}) {
	const options = getOptions(removeHtml(description, false));
	
	const onPress = () => {
		if(options.link == null) return;
		Linking.openURL(options.link);
	}
	
	return (
		<TouchableOpacity onPress={onPress} style={options.pin ? styles.itemPinned : styles.item}>
			<View style={styles.meta}>
				<Text style={styles.title}>{title}</Text>
				{options.pin && <Text style={{...styles.littleText, ...styles.pinned}}>Pinned</Text>}
				<Text style={styles.littleText}>{moment(created).fromNow()}</Text>
			</View>
			<Text style={styles.description}>{removeHtml(description)}</Text>
			{options.link && <Text style={styles.link}>{options.link}</Text>}
		</TouchableOpacity>
	);
}

function Header() {
	return (
		<Text style={styles.header}>Recent Updates</Text>
	);
}

function Blank() {
	return (
		<View style={styles.blank}>
			<Text>Loading...</Text>
		</View>
	);
}

function getOptions(input: string) {
	if(input.charAt(0) == "#") {
		const end = input.indexOf("}") + 1;
		return JSON.parse(input.substring(1, end));
	}
	
	return { pin: false, link: null, tags: [] };
}

export async function getNews() {
	const url: string = "https://mrboomdev.bearblog.dev/feed/?type=rss";
	
	let result = await parseRss(url);
	result = result.items.sort((was, next) => {
		return next.created - was.created;
	});
		
	let sortedNews = [];
	const filteredNews = result.filter(next => {
		if(getOptions(removeHtml(next.description, false)).pin) {
			sortedNews.push(next);
			return false;
		}
		return true;
	});
	
	return [...sortedNews, ...filteredNews];
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		maxHeight: (Dimensions.get("screen").height - 60)
	},
	
	header: {
		color: "white",
		fontSize: 24,
		fontWeight: "500",
		marginTop: 25,
		marginBottom: 20,
		paddingHorizontal: 30
	},
	
	item: {
		paddingHorizontal: 30,
		paddingVertical: 20
	},
	
	itemPinned: {
		backgroundColor: colors.surfaceLight,
		paddingHorizontal: 30,
		paddingVertical: 20
	},
	
	title: {
		color: "white",
		fontWeight: "500",
		marginBottom: 6,
		fontSize: 19
	},
	
	description: {
		marginVertical: 2,
		lineHeight: 26,
		color: "#fff"
	},
	
	meta: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	
	littleText: {
		color: "#ddd",
		marginBottom: 4
	},
	
	pinned: {
		color: "#eee",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 5,
		backgroundColor: "rgba(191, 112, 255, .6)"
	},
	
	link: {
		marginTop: 8
	},
	
	separator: {
		backgroundColor: "#ddd",
		height: 1,
		opacity: .1,
		width: "100%"
	},
	
	blank: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default memo(News);