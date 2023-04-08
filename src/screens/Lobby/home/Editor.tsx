import { useSelector } from "react-redux";
import { View, Text, Animated, StyleSheet, ScrollView } from "react-native";
import { Button, Input } from "@components";
import { colors } from "@util/variables";

export default function Editor({swipeAnimation, controller, setEditorVisbility}) {
	const currentGamemode = useSelector(state => state.gamemodes.current);
	
	return (
		<Animated.View style={{bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["-200%", "-100%"]}), backgroundColor: colors.background}}>
			<ScrollView>
				<Text style={styles.title}>{currentGamemode.name}</Text>
				<Input defaultValue="text" placeholder="hint" />
				<View style={{flexDirection: "row", gap: 10, width: 450, marginTop: 15, padding: 50}}>
					<Button theme="brand" text="Save"
						style={{flex: 1}}
						onPress={() => setEditorVisbility(false)}/>
					
					<Button theme="brand" text="Open Editor"
						style={{flex: 1}}
						onPress={() => {
							controller.setScreen("loading", {target: "game", args: {...currentGamemode, enableEditor: true}});
						}}/>
				</View>
			</ScrollView>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "white",
		fontWeight: "500",
		fontSize: 20,
		padding: 50,
		paddingBottom: 0
	}
});