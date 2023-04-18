import { useRef, useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, TouchableOpacity, View, Image, ImageBackground, Text, StyleSheet, SectionList, FlatList, Animated, Easing } from "react-native";
import { Button, Chips } from "@components";
import { sizes, colors } from "@util/variables";
import GameNative from "@native";
import Gamemodes from "./home/Gamemodes";
import Editor from "./home/Editor";

function Home({controller}) {
	const [gamemodesVisibility, setGamemodesVisbility] = useState(false);
	const [editorVisibility, setEditorVisbility] = useState(false);
	const swipeAnimation = useRef(new Animated.Value(0)).current;
	const touchYBegin = useRef(0);
	const currentGamemode = useSelector(state => state.gamemodes.current);
	
	useEffect(() => {
		Animated.timing(swipeAnimation, {
			toValue: editorVisibility ? 2 : gamemodesVisibility ? 1 : 0,
			duration: 350,
			easing: Easing.cubic,
			useNativeDriver: false
		}).start();
	}, [swipeAnimation, gamemodesVisibility, editorVisibility]);
	
	const play = (enableEditor: boolean): void => {
		return function() {
			controller.setScreen("loading", {target: "game", args: {
				...currentGamemode,
				enableEditor,
				mapFile: currentGamemode.maps[0].file
			}});
		}
	}
	
	function handleTouch(e) {
		touchYBegin.current = e.nativeEvent.locationY;
		return true;
	}
	
	function handleSwipe(e, hide) {
		if(!hide && e.nativeEvent.locationY < touchYBegin.current - 50) {
			setGamemodesVisbility(true);
		} else if(hide && e.nativeEvent.locationY > touchYBegin.current + 50) {
			setGamemodesVisbility(false);
		}
	}
	
	return (
		<>
			<Animated.View style={{justifyContent: "flex-end", bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["0%", "100%"]}), position: "absolute", height: "100%", width: "100%"}}>
				<Image resizeMode="cover"
					source={currentGamemode.banner ? {uri: currentGamemode.banner} : require("@static/banner/gamemode/banner_hd.jpg")}
					style={styles.wallpaper} />
				
				<Image resizeMode="stretch"
					style={styles.gamemodeInfoGradient}
					source={require("@static/ui/gradientShadowLeftRight.png")} />
					
				<Image resizeMode="stretch"
					style={styles.toggleGamemodesVisibilityGradient}
					source={require("@static/ui/gradientShadowBottomTop.png")} />
			
				<View style={styles.swipeHandler} onMoveShouldSetResponder={handleTouch} onResponderMove={handleSwipe}/>
			
				<View style={styles.gamemodeInfo}>
					<View style={styles.swipeHandler} onMoveShouldSetResponder={handleTouch} onResponderMove={handleSwipe}/>
					<Text style={styles.title}>{currentGamemode.name}</Text>
					<View style={styles.aboutMatchRow}>
						{currentGamemode.time && <Image style={{width: 18, height: 18}} source={require("@static/icon/time.png")} />}
						{currentGamemode.time && <Text style={styles.aboutMatchLabel}>{currentGamemode.time}</Text>}
					
						<Image style={{width: 22, height: 22}} source={require("@static/icon/groups.png")} />
						<Text style={styles.aboutMatchLabel}>{currentGamemode.maxPlayers > 1 ? `${currentGamemode.maxPlayers} players` : "1 player"}</Text>
					</View>
					
					<Text style={{...styles.description, color: "white"}}>Made by:  {currentGamemode.author || "Unknown"}</Text>
					{currentGamemode.description && <Text style={{...styles.description, marginTop: -2}}>{currentGamemode.description}</Text>}
					
					<View style={{marginTop: 10, flexDirection: "row", gap: 10}}>
						<Button text="Start Game!"
							style={{flexGrow: 1}}
							icon={require("@static/icon/play.png")}
							theme="brand"
							onPress={play(false)}
							fill={true} />
					
						<Button icon={require("@static/icon/edit.png")}
							theme="brand"
							onPress={() => setEditorVisbility(true)}
							styleIcon={{width: 25, height: 25, marginHorizontal: 5}}
							fill={true} />
					</View>
				</View>
			
				<View style={styles.cardHolder}>
					<View style={styles.swipeHandler} onMoveShouldSetResponder={handleTouch} onResponderMove={handleSwipe}/>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Missions</Text>
						<Text style={{marginTop: 15}}>Coming soon...</Text>
					</View>
				
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Friends</Text>
						<Text style={{marginTop: 15}}>you have no friends.</Text>
					</View>
				</View>
				
				<TouchableOpacity onPress={() => setGamemodesVisbility(true)} style={styles.showMoreGamemodes}>
					<Image source={require("@static/icon/expand.png")} style={styles.moreGamemodesIcon}/>
					<Text style={{color: "white"}}>Show more gamemodes</Text>
				</TouchableOpacity>
			</Animated.View>
		
			<Gamemodes swipeAnimation={swipeAnimation}
				setGamemodesVisbility={setGamemodesVisbility}
				setEditorVisbility={setEditorVisbility} />
				
			<Editor swipeAnimation={swipeAnimation}
				controller={controller}
				setEditorVisbility={setEditorVisbility} />
		</>
	);
}

const styles = StyleSheet.create({
	wallpaper: {
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	
	gamemodeInfo: {
		top: 0,
		height: "100%",
		width: 350,
		position: "absolute",
		padding: 50,
		justifyContent: "center",
		gap: 10
	},
	
	gamemodeInfoGradient: {
		position: "absolute",
		width: "50%",
		top: 0
	},
	
	title: {
		color: "white",
		fontSize: 28,
		lineHeight: 40
	},
	
	aboutMatchRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	
	aboutMatchLabel: {
		color: colors.textSecond,
		fontSize: 16,
		marginRight: 10
	},
	
	description: {
		marginTop: 2,
		lineHeight: 23,
		fontSize: 15,
		color: colors.textSecond
	},
	
	cardHolder: {
		position: "absolute",
		justifyContent: "center",
		height: "100%",
		right: 0,
		padding: 50,
		gap: 10
	},
	
	card: {
		backgroundColor: "rgba(0, 0, 0, .4)",
		alignItems: "center",
		paddingVertical: 25,
		width: 250,
		borderRadius: 15
	},
	
	cardTitle: {
		color: "white",
		fontSize: 20,
		fontWeight: "500"
	},
	
	toggleGamemodesVisibilityGradient: {
		position: "absolute",
		height: "50%",
		width: "100%",
		opacity: 0.8,
		bottom: 0
	},
	
	showMoreGamemodes: {
		width: "100%",
		padding: 25,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 0
	},
	
	moreGamemodesIcon: {
		width: 35,
		height: 35,
		marginRight: 5
	},
	
	swipeHandler: {
		width: "100%",
		height: "100%",
		position: "absolute"
	}
});

export default memo(Home);