import { StyleSheet, View, Text } from "react-native";

function lorem(count: number): string {
	let result = "Lorem ipsum";
	for(let i = 0; i < count; i++) {
		result += " lorem ips";
	}
	return result;
}

export default function News() {
	return (
		<View>
			<Text>News!</Text>
			<Text>{lorem(1000)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	
});