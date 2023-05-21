import { memo } from "react";
import { Text, View, FlatList, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Button } from "@components";

interface MultiplaerCardElement {
	style: ViewStyle,
	titleStyle: TextStyle,
	setCurrentScreen: (name: string) => void,
	touchHandler: () => void
}

function MultiplayerCard({style, titleStyle, setCurrentScreen, touchHandler}: MultiplaerCardElement) {
	return (
		<View style={[style, styles.card]}>
			<Text style={titleStyle}>Multiplayer</Text>
			<View style={styles.swipeHandler} onMoveShouldSetResponder={e => touchHandler(e, false)} onResponderMove={e => touchHandler(e, false)}/>
			<FlatList data={[]} keyExtractor={item => item.id}
				ListEmptyComponent={<Text style={{marginTop: 16, fontSize: 15}}>you have no friends.</Text>} />
			
			<View style={styles.actions}>
				<Button text="Join a Room"
					theme="white" fill={true}
					style={{flexGrow: 1}}
					onPress={() => {
						alert("Coming Soon...");
					}} />
					
				<Button icon={require("@static/icon/plus.png")}
					theme="white" fill={true}
					onPress={() => {
						setCurrentScreen("multiplayer");
					}} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	actions: {
		marginTop: 26,
		flexDirection: "row",
		gap: 10
	},
	
	card: {
		paddingHorizontal: 25,
		paddingBottom: 20
	},

	swipeHandler: {
		width: "100%",
		height: "100%",
		position: "absolute"
	}
});

export default memo(MultiplayerCard);