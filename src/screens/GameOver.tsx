import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Share, Easing } from "react-native";
import { Button } from "@components";
import { colors } from "@util/variables";
import GameNative from "@native";

export default function GameOver() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [balance, setBalance] = useState({});
	const [stats, setStats]= useState({isWin: false});
	const titlePopupAnimation = useRef(new Animated.Value(0)).current;
	const titleScrollAnimation = useRef(new Animated.Value(0)).current;
	const statsFadeAnimation = useRef(new Animated.Value(0)).current;
	const buttonsFadeAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		async function getBalance() {
			const coins = await GameNative.getKey("int", "coins");
			const diamonds = await GameNative.getKey("int", "diamonds");
			setStats(await GameNative.getStats());
			setBalance({coins, diamonds});
			setIsLoaded(true);
		}
		getBalance();
	}, []);
	
	useEffect(() => {
		if(!isLoaded) return;
		Animated.spring(titlePopupAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(titleScrollAnimation, {
				toValue: 1,
				duration: 500,
				easing: Easing.cubic,
				useNativeDriver: true
			}).start(() => {
				Animated.timing(statsFadeAnimation, {
					toValue: 1,
					duration: 750,
					useNativeDriver: true
				}).start(() => {
					Animated.timing(buttonsFadeAnimation, {
						toValue: 1,
						delay: 100,
						duration: 750,
						useNativeDriver: true
					}).start();
				});
			});
		});
	}, [titlePopupAnimation, buttonsFadeAnimation, isLoaded]);
	
	const titleScrollInterpolate = titleScrollAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "-200%"]
	});
	
	function close() {
		if(!isLoaded) return;
		if(stats.isWin) {
			GameNative.setKey("int", "coins", String(balance.coins + 1));
		}
		GameNative.finish("GameOver");
	}
	
	return (
		<View style={styles.screen}>
			<Animated.View style={{...styles.stats, opacity: statsFadeAnimation}}>
				<Text>{stats.isWin ? "+1 Coin" : "You've got nothing."}</Text>
			</Animated.View>
			
			<Animated.View style={{...styles.actions, opacity: buttonsFadeAnimation}}>
				<Button
					styleOuter={styles.action}
					labelStyle={styles.buttonLabel}
					label="Share results"
					onPress={() => {
						Share.share({
							message: "Hey, I just found out about a cool ActionPlatformer game! I recommend playing! https://gamejolt.com/games/actionplatformer/670228"
						});
					}} />
				<Button 
					styleOuter={styles.action}
					labelStyle={styles.buttonLabel}
					label="Continue"
					onPress={() => close()}/>
			</Animated.View>
			
			<Animated.View style={{...styles.titleHolder, translateY: titleScrollInterpolate}}>
				<Animated.Text style={{...styles.title, transform: [
					{ scale: titlePopupAnimation }
				]}}>{stats.isWin ? "You Win!" : "You Loose"}</Animated.Text>
			</Animated.View>
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