import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import * as constants from "@data/constants.json";
import Button from "@components/Button";
import Input from "@components/Input";
import { useAsyncMemo } from "@util/hooks";
import { AppBridge } from "@native";
import { memo } from "react";

function Character() {
	const playerCharacter = useAsyncMemo(async () => await AppBridge.getKey("string", "playerCharacter", "{\"source\":\"INTERNAL\",\"path\":\"packs/official/src/characters/klarrie\"}"), "Loading...");
	const categories = [
		{

		}
	]

	const items = [
		{}, {}, {}, {}, {}
	]

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
					onChangeText={(newValue) => {
						AppBridge.setKey("string", "playerCharacter", newValue);
					}} />

				<Text>Coming soon...</Text>
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