import { useRef, useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Modal } from "react-native";
import { Button, Chips } from "@components";
import { Gamemodes } from "@screens";
import { sizes, colors } from "@util/variables";
import GameNative from "../../GameNative";

export default function Home() {
	const [gamemodesVisibility, setGamemodesVisbility] = useState(false);
	const [currentGamemode, selectGamemode] = useState(0);
	
	return (
		<View style={styles.home}>
			<Gamemodes visible={gamemodesVisibility} onClose={() => setGamemodesVisbility(false)} onSelect={selectGamemode} />
			
			<View style={styles.overview}>
				<View style={styles.mainColumn}>
					<Image source={require("@static/banner/gamemode/banner.jpg")} style={styles.banner} />
					<View style={styles.info}>
						<Text style={styles.title}>Demo level</Text>
						<Text style={styles.description}>Hello there! Welcome to the "ActionPlatformer"! (The name will be changed in the future ._.)</Text>
					</View>
					<View style={styles.actions}>
						<Button label="Play!" onPress={() => GameNative.play(currentGamemode)} styleOuter={styles.button} />
						<Button label="Change gamemode" style={styles.button} onPress={() => setGamemodesVisbility(true)} />
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	home: {
		width: "100%",
		flexGrow: 1,
		position: "relative"
	},
	
	overview: {
		position: "absolute",
		top: 0,
		bottom: 60,
		left: 0,
		right: 0,
		padding: sizes.large,
		display: "flex"
	},
	
	gamemodes: {
		position: "absolute",
		flexGrow: 1
	},
	
	mainColumn: {
		width: 275,
		height: "100%",
		flexGrow: 1,
		borderRadius: 12,
		backgroundColor: "#190A29"
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