import { useRef, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Image, Text, StyleSheet, Modal } from "react-native";
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
	
	return (
		<View style={styles.home}>
			<Gamemodes visible={gamemodesVisibility} onClose={() => setGamemodesVisbility(false)} />
			<ScrollView 
			  style={styles.overview}
			  horizontal={true}
			  overScrollMode="always">
			
				<View style={{...styles.card, width: 275}}>
					<Image source={require("@static/banner/gamemode/banner.jpg")} style={styles.banner} />
					<View style={styles.info}>
						<Text style={styles.title}>{currentGamemode.name}</Text>
						<Text style={styles.author}>Made by: {currentGamemode.author}</Text>
						<Text style={styles.description}>{currentGamemode.description}</Text>
					</View>
					<View style={styles.actions}>
						<Button label="Play!" onPress={() => GameNative.play("idk")} styleOuter={styles.button} />
						<Button label="Change gamemode" style={styles.button} onPress={() => setGamemodesVisbility(true)} />
					</View>
				</View>
				
				<Character />
				<Missions />
				<Packs />
				
				<View style={{marginRight: 200}} />
			</ScrollView>
		</View>
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
	
	button: {
		marginBottom: 5
	}
});

export default memo(Home);