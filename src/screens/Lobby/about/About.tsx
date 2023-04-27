import { View, Text, FlatList } from "react-native";

export default function About() {
	return (
		<View>
			<Text>Game made by MrBoomDev</Text>
			<Item title="Unknown author" description="huh" />
		</View>
	);
}

function Item({title, description}) {
	return (
		<View>
			<Text>{title}</Text>
			<Text>{description}</Text>
		</View>
	);
}

const resources = [
	
];