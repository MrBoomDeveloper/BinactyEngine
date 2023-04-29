import { View, Text, FlatList, Animated, StyleSheet } from "react-native";
import { Button } from "@components";
import { colors } from "@util/variables";

export default function MultiplayerScreen({swipeAnimation, setCurrentScreen}) {
	return (
		<Animated.View style={{bottom: swipeAnimation.interpolate({inputRange: [0, 1], outputRange: ["-300%", "-200%"]}), position: "absolute", backgroundColor: colors.background, height: "100%", width: "100%", flexDirection: "row"}}>
			<View>
				<View style={{flexDirection: "row", gap: 10}}>
					<Button text="Start Game!"
						style={{flexGrow: 1}}
						icon={require("@static/icon/play.png")}
						theme="brand" fill={true}
						onPress={() => {
							alert("bruh, you cant play without other guys in the multiplayer.");
						}} />
					
					<Button text="Leave" hitbox={0}
						theme="brand" fill={true}
						onPress={() => setCurrentScreen("home")} />
				</View>
			</View>
			
			<View>
				<Text>No players in the room.</Text>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	
});