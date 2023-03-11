import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Share } from "react-native";
import { Button } from "@components";
import { colors } from "@util/variables";
import GameNative from "../GameNative";

export default function GameOver() {
	const animation = useRef(new Animated.Value(0)).current;
	const buttonsAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		Animated.spring(animation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start();
	}, [animation]);
	
	useEffect(() => {
		Animated.timing(buttonsAnimation, {
			toValue: 1,
			delay: 1000,
			duration: 750,
			useNativeDriver: true
		}).start();
	}, [buttonsAnimation]);
	
	return (
		<View style={styles.screen}>
			<View style={styles.stats}>
				<Text>     </Text>
			</View>
			
			<Animated.View style={{...styles.actions, opacity: buttonsAnimation}}>
				<Button 
					styleOuter={styles.action}
					labelStyle={styles.buttonLabel}
					label="Share results"
					onPress={() => {
						Share.share({
							message: "Hey, I just found out about a cool ActionPlatformer game! I recommend playing! https://MrBoomDev.ru/project?name=fnafm"
						});
					}} />
				<Button 
					styleOuter={styles.action}
					labelStyle={styles.buttonLabel}
					label="Continue"
					onPress={() => GameNative.finish("GameOver")}/>
			</Animated.View>
			
			<View style={styles.titleHolder}>
				<Animated.Text style={{...styles.title, transform: [
					{ scale: animation }
				]}}>Game Over</Animated.Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		height: "100%",
		padding: 50,
		display: "flex",
		backgroundColor: colors.background
	},
	
	stats: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	
	actions: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		gap: 20
	},
	
	action: {
		width: 200,
		height: 50
	},
	
	titleHolder: {
		position: "absolute",
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	
	title: {
		color: "white",
		fontSize: 100,
		fontWeight: "600",
		marginLeft: 100
	},
	
	buttonLabel: {
		fontSize: 18
	}
});