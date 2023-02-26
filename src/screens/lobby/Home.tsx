import { useRef, useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, Modal } from "react-native";
import { Button, Chips } from "@components";
import { Gamemodes } from "@screens";
import { sizes, colors } from "@util/variables";
import GameNative from "../../GameNative";
import Character from "./home/Character";
import Missions from "./home/Missions";
import Packs from "./home/Packs";

export default function Home() {
	const [gamemodesVisibility, setGamemodesVisbility] = useState(false);
	const [currentGamemode, selectGamemode] = useState(0);
	
	return (
		<View style={styles.home}>
			<Gamemodes visible={gamemodesVisibility} onClose={() => setGamemodesVisbility(false)} onSelect={selectGamemode} />
			<ScrollView 
			  style={styles.overview}
			  horizontal={true}
			  overScrollMode="always">
			
				<View style={{...styles.card, width: 275}}>
					<Image source={require("@static/banner/gamemode/banner.jpg")} style={styles.banner} />
					<View style={styles.info}>
						<Text style={styles.title}>Demo level</Text>
						<Text style={styles.description}>Hello there! Welcome to the "ActionPlatformer"! (The name will be changed in the future ._.)</Text>
					</View>
					<View style={styles.actions}>
						<Button label="Play!" onPress={() => GameNative.play("idk")} styleOuter={styles.button} />
						<Button label="Change gamemode" style={styles.button} onPress={() => setGamemodesVisbility(true)} />
					</View>
				</View>
				
				<Character />
				<Missions />
				<Packs />
				
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
		height: "90%",
		maxHeight: 500,
		paddingHorizontal: sizes.large
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
	
	description: {
		fontSize: 15,
		lineHeight: 22,
		fontWeight: "400",
		paddingTop: 12,
		flexGrow: 1,
		color: "white"
	},
	
	actions: {
		padding: sizes.large
	},
	
	button: {
		marginBottom: 5
	}
});