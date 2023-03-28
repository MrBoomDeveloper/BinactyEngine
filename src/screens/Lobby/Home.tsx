import { useRef, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Image, Text, StyleSheet, Modal, FlatList } from "react-native";
import { Button, Chips } from "@components";
import { Gamemodes } from "@screens";
import { sizes, colors } from "@util/variables";
import GameNative from "@native";
import Character from "./home/Character";
import Missions from "./home/Missions";
import Packs from "./home/Packs";

function Home({controller}) {
	const [gamemodesVisibility, setGamemodesVisbility] = useState(false);
	const currentGamemode = useSelector(state => state.gamemodes.value.current);
	
	const play = (enableEditor: boolean): void => {
		return function() {
			controller.setScreen("loading", {target: "game", args: {...currentGamemode, enableEditor}});
		}
	}
	
	let mainCardStyle = {...styles.card, width: 275};
	if(currentGamemode.id == "editor") {
		mainCardStyle = {...mainCardStyle, ...styles.cardSharpLeft};
	}
	
	return (
		<View style={styles.home}>
			<Gamemodes visible={gamemodesVisibility} onClose={() => setGamemodesVisbility(false)} />
			<ScrollView 
			  style={styles.overview}
			  horizontal={true}
			  showsHorizontalScrollIndicator={false}
			  overScrollMode="always">
			
				<View style={mainCardStyle}>
					<Image source={require("@static/banner/gamemode/banner.jpg")} style={styles.banner} />
					<View style={styles.info}>
					
						<Text style={styles.title}>{currentGamemode.name}</Text>
						<Text style={styles.author}>Made by: {currentGamemode.author}</Text>
						<Text style={styles.description}>{currentGamemode.description}</Text>
						
					</View>
					<View style={styles.actions}>
					
						<Button text="Change gamemode"
							theme="brand"
							onPress={() => setGamemodesVisbility(true)} />
								
						<Button text="Start Game!"
							icon={require("@static/icon/play.png")}
							theme="brand"
							onPress={play(false)}
							style={{marginTop: 5}}
							fill={true} />
							
					</View>
				</View>
				
				{currentGamemode.id == "editor" && <View style={{...styles.card, ...styles.cardSharpRight}}>
					<Text style={[styles.title, styles.titleEditor]}>Editor Gamemodes</Text>
					<FlatList
					  ListEmptyComponent={Blank}/>
					<Text>Selected map:  FNaF 1</Text>
					<View style={[styles.actions, styles.actionsLittle]}>
						<Button text="Start Editor"
							theme="brand"
							onPress={play(true)} />
							
						<Button text="Create a new one"
							theme="brand"
							style={{marginTop: 5, marginBottom: 6}}
							onPress={() => alert("This functionality of the game is still in the development.")} />
					</View>
				</View>}
				
				<Character />
				<Missions />
				<Packs />
				
				<View style={{width: 300}}>
					<Text style={{lineHeight: 20, marginBottom: 10}}>This game uses some third-party resources so if you want, you can provide credits to original authors!</Text>
					<Text selectable={true} style={{lineHeight: 24}}>Lobby theme:  https://youtu.be/S6FRfxU-4Q4</Text>
					<Text style={{lineHeight: 24}}>Match ambient: FNaF AR & FNaF 1</Text>
					<Text selectable={true} style={{lineHeight: 24}}>Fonts & Icons: https://fonts.google.com</Text>
				</View>
				
				<View style={{marginRight: 200}} />
			</ScrollView>
		</View>
	);
}

function Blank() {
	return (
		<Text style={styles.blankText}>You didn't created any gamemode yet. Click the "Create a new one" button to begin!</Text>
	);
}

const styles = StyleSheet.create({
	home: {
		width: "100%",
		justifyContent: "center",
		flexGrow: 1
	},
	
	overview: {
		paddingHorizontal: sizes.large,
		paddingVertical: 10,
		maxHeight: 450
	},
	
	card: {
		borderRadius: 12,
		backgroundColor: "#190A29",
		marginRight: 20
	},
	
	cardSharpLeft: {
		marginRight: 0,
	},
	
	cardSharpRight: {
		width: 250,
		marginRight: 20,
		paddingVertical: 16,
		paddingHorizontal: 28
	},
	
	banner: {
		width: "100%",
		height: 150,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		backgroundColor: "black"
	},
	
	info: {
		padding: sizes.large,
		flexGrow: 1
	},
	
	title: {
		fontSize: 22,
		fontWeight: "500",
		color: "white"
	},
	
	titleEditor: {
		fontSize: 20
	},
	
	author: {
		marginVertical: 6,
		fontSize: 15
	},
	
	description: {
		fontSize: 15,
		lineHeight: 22,
		fontWeight: "400",
		marginTop: 2,
		color: "white"
	},
	
	actions: {
		padding: sizes.large
	},
	
	actionsLittle: {
		paddingHorizontal: 2,
		paddingBottom: 0
	},
	
	blankText: {
		lineHeight: 21,
		marginVertical: 10
	}
});

export default memo(Home);