import { Dimensions, FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Clipboard, Share, Image } from "react-native";
import Drawer, { SimpleDrawerProps } from "./Drawer";
import { useEffect, useReducer, useState } from "react";
import { parse as loadRss } from "rss-to-json"
import { removeHtml } from "@util/format";
import moment from "moment";
import * as constants from "@data/constants.json";
import Button from "@components/Button";
import { AppBridge } from "@native";

interface PostProps {
	title: string,
	description: string,
	created: number
}

interface NewsState {
	isError: boolean, 
	isLoading: boolean, 
	content: PostProps[], 
	errorMessage: string
}

interface NewsReducerAction {
	isLoading: boolean,
	isSuccessful: boolean,
	errorMessage?: string,
	content?: PostProps[]
}

interface EmptyProps {
	isError: boolean,
	errorMessage: string,
	reloadFunction: () => void
}

export function NewsDrawer(props: SimpleDrawerProps) {
	const [news, setNews] = useReducer(reducer, {isError: false, isLoading: true, content: [], errorMessage: ""});
	const [isRefreshing, setIsRefreshing] = useState(false);

	function reducer(state: NewsState, action: NewsReducerAction): NewsState {
		return {
			isLoading: action.isLoading,
			isError: !action.isSuccessful,
			errorMessage: action.errorMessage || "",
			content: action.content || []
		}
	}

	async function loadNews() {
		setNews({
			isLoading: true,
			isSuccessful: true
		});

		try {
			const { items } = await loadRss("https://mrboomdev.bearblog.dev/feed/?type=rss", {
				timeoutErrorMessage: "Your internet connection is kinda slow. Try connecting to Wi-Fi.",
				timeout: 15 * 1000
			});

			setNews({
				isLoading: false,
				isSuccessful: true,
				content: items.sort((was, next) => next.created - was.created)
			});
		} catch(e) {
			console.error(e);
			setNews({
				isLoading: false,
				isSuccessful: false,
				errorMessage: String(e)
			});
		}

		setIsRefreshing(false);
	}

	useEffect(() => {
		loadNews();
	}, []);

	return (
		<Drawer width={350} direction="right" {...props}>
			<FlatList data={news.content}
				renderItem={({item}) => <Post {...item} />}
				contentContainerStyle={{paddingBottom: 10}}

				refreshControl={<RefreshControl refreshing={isRefreshing}
					colors={["#f8c5e6"]}
					progressBackgroundColor="#41253f"
					onRefresh={() => {
						setIsRefreshing(false);
						loadNews();
					}} />
				}

				ItemSeparatorComponent={() => <View style={styles.divider} />}

				ListEmptyComponent={() => <Empty isError={news.isError} 
					errorMessage={news.errorMessage} 
					reloadFunction={loadNews} />
				} />
		</Drawer>
	);
}

function Post({title, description, created}: PostProps) {
	const [isExpanded, setExpanded] = useState(false);

	function onPress() {
		Share.share({ 
			message: `${title}. ${removeHtml(description)}`
		});
	}

	return (
		<TouchableOpacity activeOpacity={.4} onLongPress={onPress} onPress={() => setExpanded(!isExpanded)}>
			<View style={styles.postLayout}>
				<View style={styles.postHeader}>
					<Text style={styles.postTitle}>{title}</Text>
					<Image source={require("@static/icon/time.png")} style={styles.postDateIcon} />
					<Text style={styles.postDate}>{moment(created).fromNow()}</Text>
				</View>

				<Text style={styles.postDescription} numberOfLines={isExpanded ? 9999 : 9}>{removeHtml(description)}</Text>
				<Text style={styles.expander}>{isExpanded ? "Click to collapse" : "Click to expand"}...</Text>
			</View>
		</TouchableOpacity>
	)
}

function Empty({isError, errorMessage, reloadFunction}: EmptyProps) {
	return (
		<View style={styles.emptyLayout}>
			<Text style={styles.emptyTitle}>{isError ? "Failed to load news" : "Loading News"}</Text>
			<Text style={styles.emptyMessage}>{isError ? errorMessage : "Please wait a little bit..."}</Text>

			{isError && <Button text="Try Again"
				style={styles.emptyReloadButton}
				theme="brand" 
				onPress={reloadFunction} />
			}
		</View>
	)
}

const styles = StyleSheet.create({
	postLayout: {
		marginBottom: 10,
		marginTop: 5
	},

	postHeader: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 8,
		alignItems: "center"
	},

	postTitle: {
		fontSize: 18,
		fontWeight: "500",
		color: "white",
		letterSpacing: .4
	},

	postDescription: {
		paddingHorizontal: 15,
		paddingBottom: 8,
		color: "#e7d3e6",
		lineHeight: 22,
		letterSpacing: .4
	},

	postDate: {
		color: "#e8ceeb",
		letterSpacing: .4
	},

	postDateIcon: {
		width: 16,
		height: 16,
		resizeMode: "contain",
		marginLeft: 2,
		marginRight: -2,
		opacity: .7
	},

	expander: {
		paddingLeft: 15,
		color: "#f9a4ff",
		letterSpacing: .4,
		marginBottom: 8,
	},

	divider: {
		width: "100%",
		height: 1,
		backgroundColor: "#b38ea33e"
	},

	emptyLayout: {
		width: "100%",
		height: Dimensions.get("screen").height,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		paddingRight: constants.size.inlineScreenPadding
	},

	emptyTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 18,
		textAlign: "center"
	},

	emptyMessage: {
		color: "#ddc5e0",
		textAlign: "center",
		width: "75%",
		lineHeight: 22
	},

	emptyReloadButton: {
		marginTop: 6,
		width: 125
	},

	emptyReloadButtonLabel: {
		fontSize: 14,
		fontWeight: "500",
		textShadowColor: "#00000026",
		textShadowRadius: 5
	}
});