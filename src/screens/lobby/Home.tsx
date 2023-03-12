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

function Home() {
	const [gamemodesVisibility, setGamemodesVisbility] = useState(false);
	const currentGamemode = useSelector(state => state.gamemodes.value.current);
	
	const play = (enableEditor: boolean): void => {
		return function() {
			GameNative.play({...currentGamemode, enableEditor});
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
						<Button label="Play!" onPress={play(false)} styleOuter={styles.button} />
						<Button label="Change gamemode" style={styles.button} onPress={() => setGamemodesVisbility(true)} />
					</View>
				</View>
				
				{currentGamemode.id == "editor" && <View style={{...styles.card, ...styles.cardSharpRight}}>
					<Text style={[styles.title, styles.titleEditor]}>Editor Gamemodes</Text>
					<FlatList
					  ListEmptyComponent={Blank}/>
					<Text>Selected map</Text>
					<View style={[styles.actions, styles.actionsLittle]}>
						<Button label="Start Editor" styleOuter={styles.button} onPress={play(true)} />
						<Button label="Create a new one" styleOuter={styles.button} onPress={() => alert("This functionality of the game is still in the development.")} />
					</View>
				</View>}
				
				<Character />
				<Missions />
				<Packs />
				
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
	
	button: {
		marginBottom: 5
	},
	
	blankText: {
		lineHeight: 21,
		marginVertical: 10
	}
});

export default memo(Home);