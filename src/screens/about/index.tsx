import { Text, View, StyleSheet, FlatList } from "react-native";

export default function About() {
	return (
		<View>
			<Text style={styles.title}>Thanks for playing!</Text>
			<FlatList data={[]} renderItem={Item} />
		</View>
	);
}

function Item() {
	return (
		<View>
			<Text>This is an item!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		
	},
	
	title: {
		fontSize: 25
	}
});