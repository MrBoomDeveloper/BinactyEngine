import { memo } from "react";
import { useSelector } from "react-redux";
import { View, Text, Animated, StyleSheet, ScrollView } from "react-native";
import Button from "@components/Button";
import Input from "@components/Input";
import { colors } from "@util/variables";
import { SetScreenProps } from "App";

interface EditorProps {
	setScreen: SetScreenProps
}

function Editor({swipeAnimation, setScreen, setCurrentScreen}: EditorProps) {
	const currentGamemode = useSelector(state => state.gamemodes.current);
	
	return (
		<Animated.View style={{bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["-200%", "-100%"]}), backgroundColor: colors.background}}>
			<ScrollView>
				<View style={{flexDirection: "row"}}>
					<Text>Name</Text>
					<Input defaultValue={currentGamemode.name}
						type="text"
						placeholder="hint" />
				</View>

				<View style={{flexDirection: "row"}}>
					<Text>Description</Text>
					<Input defaultValue={currentGamemode.description}
						type="text"
						maxLength={200}
						placeholder="hint" />
				</View>
				
				<View style={{flexDirection: "row", gap: 10, width: 400, marginTop: 15, padding: 50}}>
					<Button theme="brand" text="Save"
						style={{flex: 1}}
						onPress={() => setCurrentScreen("home")}/>
					
					<Button theme="brand" text="Edit Map"
						style={{flex: 1}}
						onPress={() => {
							setScreen("loading", {target: "game", args: {...currentGamemode, enableEditor: true, mapFile: currentGamemode.maps[0].file}});
						}}/>
				</View>
			</ScrollView>
		</Animated.View>
	);
}

const styles = StyleSheet.create({

});

export default memo(Editor);