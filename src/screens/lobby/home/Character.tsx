import { View, Text, StyleSheet } from "react-native";

export default function Character() {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>Character</Text>
			<Blank />
		</View>
	);
}

function Blank() {
	return (
		<View style={styles.blank}>
			<Text style={styles.blankTitle}>Coming soon...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 250,
		borderRadius: 12,
		backgroundColor: "#190A29",
		marginRight: 20
	},
	
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		padding: 16,
		paddingHorizontal: 24,
		paddingBottom: 6
	},
	
	blank: {
		height: 300,
		justifyContent: "center"
	},
	
	blankTitle: {
		fontSize: 16,
		textAlign: "center"
	}
});