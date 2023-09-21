import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import * as constants from "@data/constants.json";
import Button from "@components/Button";
import Input from "@components/Input";
import { useAsyncMemo, useTheme } from "@util/hooks";
import { AppBridge } from "@native";
import { memo, useMemo } from "react";
import themes from "@data/themes.json";
import CharacterPreview from "@components/native/CharacterPreview";

function Character() {
	const playerCharacter = useAsyncMemo(async () => await AppBridge.getKey("string", "playerCharacter", "{\"source\":\"INTERNAL\",\"path\":\"packs/official/src/characters/klarrie\"}"), "Loading...");
	const [theme, setTheme] = useTheme();
	
	const categories = useMemo(() => [
		{ name: "Character", icon: require("@static/icon/me.png") },
		{ name: "Theme", icon: require("@static/icon/me.png") },
		{ name: "Wallpaper", icon: require("@static/icon/me.png") }
	], []);

	const items = [
		{}, {}, {}, {}, {}
	];

	return (
		<View style={styles.layout}>
			<View style={styles.inventoryHolder}>
				<Text style={styles.inventroyTitle}>The Category</Text>

				<View style={styles.inventroryLayout}>
					<FlatList data={categories} style={{flexGrow: 0, marginTop: 10}}
						renderItem={item => {
							return (
								<Button icon={require("@static/icon/me.png")} 
									hitbox={0} overlayInner
									theme="popup" onPress={() => {}} />
							);
						}} />
					
					<FlatList data={items} numColumns={3} style={styles.inventoryItemsList}
						renderItem={item => {
							return (
								<Button icon={require("@static/icon/me.png")} 
									hitbox={0} overlayInner
									style={{margin: 2}}
									theme="popup" onPress={() => {}} />
							);
						}} />
				</View>
			</View>

			<View style={styles.characterHolder}>
				<Input defaultValue={playerCharacter as string} 
					type="string"
					maxLength={250}
					style={{width: 250}}
					onChangeText={(newValue) => {
						AppBridge.setKey("string", "playerCharacter", newValue);
					}} />

				<Input defaultValue={JSON.stringify(theme)} 
					type="string"
					maxLength={9999}
					style={{width: 250}}
					onChangeText={(newValue) => {
						try {
							JSON.parse(newValue);
						} catch(e) {
							return;
						}

						setTheme(JSON.parse(newValue));
					}} />

				<Text>DON'T CHANGE ANYTHING HERE</Text>

				<CharacterPreview src="Hello from a Native Component!" />

				<Text>IF YOU DON'T KNOW WHAT IS DOES!</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	layout: {
		width: Dimensions.get("screen").width,
		flexDirection: "row"
	},

	inventoryHolder: {
		marginLeft: constants.size.inlineScreenPadding,
		marginTop: 80,
		gap: 12.5
	},

	inventroyTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 20
	},

	inventroryLayout: {
		flexDirection: "row"
	},

	inventoryItemsList: {
		backgroundColor: constants.color.surfaceLight,
		borderRadius: 10,
		overflow: "hidden",
		padding: 5
	},

	characterHolder: {
		marginTop: 80,
		alignItems: "center",
		flexGrow: 1,
		justifyContent: "flex-end",
		paddingBottom: 25
	}
});

export default memo(Character);