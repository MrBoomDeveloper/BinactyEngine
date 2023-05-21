import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, FlatList, Animated, StyleSheet, TouchableOpacity, Image, SectionList, ImageSourcePropType } from "react-native";
import { colors } from "@util/variables.json";
import { setActive } from "@context/gamemodes";
import { GameNative } from "@native";

function Gamemodes({swipeAnimation, setCurrentScreen}) {
	const allGamemodes = useSelector(state => state.gamemodes.list);
	
	return (
		<Animated.View style={{bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["-100%", "0%"]}), position: "absolute", backgroundColor: colors.background, height: "100%", width: "100%"}}>
			<SectionList sections={allGamemodes}
				keyExtractor={item => item.id}
				renderItem={() => null}
				ListHeaderComponent={<View style={{height: 25}} />}
				ListFooterComponent={<View style={{height: 100}} />}
				renderSectionHeader={item => (
					<GamemodeCategory data={item.section} 
						setCurrentScreen={setCurrentScreen} />
				)}/>
				
			<TouchableOpacity onPress={() => setCurrentScreen("home")} style={styles.showMoreGamemodes}>
				<Image source={require("@static/icon/expand.png")} style={{...styles.moreGamemodesIcon, transform: [{scaleY: -1}]}}/>
				<Text style={{color: "white"}}>Go back to overview</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

interface GamemodeCategoryElement {
	setCurrentScreen: (page: string) => void,
	data: {
		title: string,
		id: string,
		data: {
			id: string,
			name: string,
			author: string,
			banner: ImageSourcePropType
		}[]
	}
}

function GamemodeCategory({data: {title, id, data}, setCurrentScreen}: GamemodeCategoryElement) {
	const dispatch = useDispatch();
	
	return (
		<>
			<Text style={gmStyles.catTitle}>{title}</Text>
			<FlatList data={data}
				keyExtractor={item => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={<View style={{width: 25}} />}
				ListFooterComponent={<View style={{width: 25}} />}
				ItemSeparatorComponent={<View style={{width: 15}} />}
				renderItem={({item}) => {
					function onPress() {
						switch(item.id) {
							case "8724e112-d6cc-11ed-afa1-0242ac120002":
							case "723e7894-d6bd-11ed-afa1-0242ac120002": {
								alert("Sorry, but this part of the game isn't done yet.");
								break;
							}
							default: {
								dispatch(setActive(item));
								GameNative.setKey("string", "latestGamemode", JSON.stringify({row: id, item: item.id}));
								setCurrentScreen("home");
								break;
							}
						}
					}
					
					return (
						<TouchableOpacity style={gmStyles.card} onPress={onPress}>
							<Image style={gmStyles.banner} source={item.banner ? {uri: item.banner} : require("@static/banner/gamemode/banner_hd.jpg")} />
							<Image style={gmStyles.shadowLeft} source={require("@static/ui/gradientShadowLeftRight.png")} />
							<Image style={gmStyles.shadowBottom} source={require("@static/ui/gradientShadowBottomTop.png")} />
							<View style={{padding: 12, flexGrow: 1}}>
								<Text style={gmStyles.title}>{item.name}</Text>
								<Text style={gmStyles.author}>Made by:  {item.author}</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	toggleGamemodesVisibilityGradient: {
		position: "absolute",
		height: "50%",
		width: "100%",
		opacity: 0.8,
		bottom: 0
	},
	
	showMoreGamemodes: {
		position: "absolute",
		width: "100%",
		paddingTop: 15,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingRight: 25
	},
	
	moreGamemodesIcon: {
		width: 35,
		height: 35,
		marginRight: 5
	}
});

const gmStyles = StyleSheet.create({
	catTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 20,
		margin: 25,
		marginBottom: 15
	},
	
	card: {
		width: 200,
		aspectRatio: 16 / 9
	},
	
	banner: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		position: "absolute",
		borderRadius: 10,
		overflow: "hidden"
	},

	title: {
		color: "white",
		textShadowColor: "black",
		textShadowRadius: 3,
		fontWeight: "500", 
		fontSize: 16,
		maxWidth: 100,
		flexGrow: 1,
		lineHeight: 24
	},

	author: {
		color: "white", 
		textShadowColor: "black",
		textShadowRadius: 3,
		fontSize: 13,
		maxWidth: 100,
		lineHeight: 18
	},
	
	shadowLeft: {
		opacity: 0.7,
		width: "50%",
		height: "100%",
		position: "absolute",
		borderRadius: 10,
		resizeMode: "stretch",
		overflow: "hidden"
	},
	
	shadowBottom: {
		width: "60%",
		position: "absolute",
		borderRadius: 10,
		resizeMode: "stretch",
		overflow: "hidden"
	}
});

export default memo(Gamemodes);