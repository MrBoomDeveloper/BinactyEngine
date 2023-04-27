import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Character } from "@components/native";
import { colors } from "@util/variables";
import { Button } from "@components";

const exampleItems = [
	{ name: "Klarrie", id: "klarrie" },
	{ name: "Freddy Fazbear", id: "freddy" },
	{ name: "Bonnie the Bunny", id: "bonny" },
	{ name: "Chica the Chicken", id: "chica" },
	{ name: "Foxy the Fox", id: "foxy" }
];

export default function Editor() {
	return (
		<View style={styles.screen}>
			<View style={styles.editor}>
				<Text style={[styles.title, {marginLeft: 50, marginTop: 5, marginBottom: 20}]}>Characters</Text>
				<View style={styles.inventory}>
					<View style={{gap: 5}}>
						<Button theme="popup" fill={true} icon={require("@static/icon/me.png")} hitbox={0} />
						<Button theme="popup" fill={true} icon={require("@static/icon/me.png")} hitbox={0} />
						<Button theme="popup" fill={true} icon={require("@static/icon/me.png")} hitbox={0} />
						<Button theme="popup" fill={true} icon={require("@static/icon/me.png")} hitbox={0} />
						<Button theme="popup" fill={true} icon={require("@static/icon/me.png")} hitbox={0} />
					</View>
					
					<View style={styles.items}>
						<FlatList data={exampleItems}
							renderItem={Item}
							numColumns={3}
							keyExtractor={item => item.id} />
					</View>
				</View>
			</View>
			
			<View>
				<Text>CharacterPreview.tsx isn't done yet!</Text>
				<Character width={100} height={100} />
			</View>
		</View>
	);
}

function Item({item: {name}}) {
	return (
		<Button style={styles.item} theme="popup" overlayInner={true} fill={true}>
			<Image source={require("@static/banner/gamemode/gamemode.jpg")} style={styles.itemImage} />
			<Text style={styles.itemLabel}>{name}</Text>
		</Button>
	);
}

const styles = StyleSheet.create({
	screen: {
		flexDirection: "row",
		height: "100%"
	},
	
	editor: {
		padding: 25,
		height: "100%"
	},
	
	title: {
		color: "white",
		fontSize: 30,
		fontWeight: "500"
	},
	
	inventory: {
		flexDirection: "row",
		flexGrow: 1
	},
	
	items: {
		backgroundColor: colors.surfaceLight,
		borderWidth: 1,
		borderColor: "rgba(200, 200, 200, .1)",
		borderRadius: 10,
		padding: 5,
		flexGrow: 1
	},
	
	item: {
		width: 100,
		height: 100,
		padding: 5,
		position: "relative"
	},
	
	itemImage: {
		width: "100%",
		height: "100%",
		position: "absolute",
		resizeMode: "cover",
		left: 5,
		top: 5
	},
	
	itemLabel: {
		color: "white",
		margin: 5
	}
});