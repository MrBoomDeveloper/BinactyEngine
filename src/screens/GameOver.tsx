import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Share, Easing } from "react-native";
import Button from "@components/Button";
import { colors } from "@util/variables.json";
import GameNative, { AppBridge } from "@native";
import { SetScreenProps } from "App";

interface GameOverProps {
	setScreen: SetScreenProps
}

interface StatProps {
	title: string,
	count: number
}

export default function GameOver({setScreen}: GameOverProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [balance, setBalance] = useState({coins: 0, diamonds: 0});
	const [stats, setStats]= useState({isWin: false});
	const titlePopupAnimation = useRef(new Animated.Value(0)).current;
	const titleScrollAnimation = useRef(new Animated.Value(0)).current;
	const statsFadeAnimation = useRef(new Animated.Value(0)).current;
	const buttonsFadeAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		(async function() {
			const coins = await AppBridge.getKey("int", "coins", 0);
			const diamonds = await AppBridge.getKey("int", "diamonds", 0);
			setStats(await GameNative.getStats());
			setBalance({coins, diamonds});
			setIsLoaded(true);
		})();

		if(!isLoaded) return;

		Animated.spring(titlePopupAnimation, {
			toValue: 1,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(titleScrollAnimation, {
				toValue: 1,
				duration: 500,
				easing: Easing.cubic,
				useNativeDriver: false
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
	}, [isLoaded]);

	
	const titleScrollInterpolate = titleScrollAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["100%", "40%"]
	});
	
	function close() {
		if(!isLoaded) return;

		if(stats.isWin) {
			AppBridge.setKey("int", "coins", balance.coins + 1);
		}

		setScreen("loading", {target: "lobby"});
	}
	
	return (
		<View style={styles.screen}>
			<Animated.View style={{...styles.stats, opacity: statsFadeAnimation}}>
				{/*<FlatList data={[]} renderItem={Stat}/>*/}
				<Text style={styles.statText}>{stats.isWin ? "+1 Coin" : "Better luck next time..."}</Text>
			</Animated.View>
			
			<Animated.View style={{...styles.actions, opacity: buttonsFadeAnimation}}>
				<Button text="Share results"
					style={styles.action}
					theme="brand"
					onPress={() => {
						Share.share({
							message: `Check out my score in Binacty Engine!\nI just won!`
						});
					}} />

				<Button text="Continue"
					style={styles.action}
					theme="brand"
					onPress={() => close()} />
			</Animated.View>
			
			<Animated.View style={{...styles.titleHolder, height: titleScrollInterpolate}}>
				<Animated.Text style={{...styles.title, transform: [
					{ scale: titlePopupAnimation }
				]}}>{stats.isWin ? "You Win!" : "Game Over"}</Animated.Text>
			</Animated.View>
		</View>
	);
}

function Stat({title, count}: StatProps) {
	return (
		<View style={{flexGrow: 1}}>
			<Text style={{...styles.statText, flexGrow: 1}}>{title}</Text>
			<Text style={{...styles.statText}}>{count}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		height: "100%",
		padding: 50,
		paddingBottom: 25,
		display: "flex",
		backgroundColor: colors.background
	},
	
	stats: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	
	statText: {
		fontSize: 15,
		color: "white"
	},
	
	actions: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 15
	},
	
	action: {
		width: 140,
		height: 40
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
		fontSize: 75,
		fontWeight: "600",
		marginLeft: 100
	}
});