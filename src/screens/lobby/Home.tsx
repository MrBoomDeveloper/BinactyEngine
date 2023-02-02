import { View, Image, Text, StyleSheet, NativeModules } from "react-native";
import Button from "@components/Button";
const { GameNative } = NativeModules;

export default function Home() {
	return (
		<View style={styles.home}>
			<View style={styles.mainColumn}>
				<Image source={require("@static/banner/gamemode/banner.jpg")} style={styles.banner} />
				<Text style={styles.title}>Demo level</Text>
				<Text style={styles.description}>Hello there! Welcome to the "ActionPlatformer"! (The name will be changed in the future ._.)</Text>
				<View style={styles.actions}>
					<Button label="Play!" onPress={() => GameNative.play(0)} styleOuter={styles.button} />
					<Button label="Change gamemode" style={styles.button} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	home: {
		width: "100%"
	},
	
	homeColumn: {
		width: "33%"
	},
	
	mainColumn: {
		width: 300,
		padding: 25,
		//height: "100%"
	},
	
	banner: {
		width: "100%",
		height: 125,
		backgroundColor: "black"
	},
	
	title: {
		fontSize: 20,
		fontWeight: "500",
		padding: 15,
		paddingTop: 20,
		paddingBottom: 0,
		color: "white"
	},
	
	description: {
		fontSize: 15,
		lineHeight: 22,
		fontWeight: "400",
		padding: 15,
		paddingTop: 10,
		flexGrow: 1,
		color: "white"
	},
	
	actions: {
		padding: 10
	},
	
	button: {
		marginBottom: 5
	}
});