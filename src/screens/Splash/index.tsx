import { useRef, useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import type { SetScreenProps } from "../../App";

export default function Splash({setScreen}: { setScreen: SetScreenProps }) {
	const logoAnimation = useRef(new Animated.Value(0)).current;
	const gradientAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		Animated.parallel([
			Animated.timing(logoAnimation, {
				toValue: 1,
				duration: 750,
				useNativeDriver: true
			}),
			Animated.timing(gradientAnimation, {
				toValue: 1,
				delay: 250,
				duration: 1500,
				useNativeDriver: true
			})
		]).start(() => {
			Animated.parallel([
				Animated.timing(logoAnimation, {
					toValue: 0,
					delay: 250,
					duration: 1250,
					useNativeDriver: true
				}),
				Animated.timing(gradientAnimation, {
					toValue: 0,
					delay: 200,
					duration: 1250,
					useNativeDriver: true
				})
			]).start(() => {
				setScreen("loading", {target: "lobby"});
			});
		});
	}, []);
	
	return (
		<View style={styles.screen}>
			<Animated.Image resizeMode="cover" style={{
				...styles.gradient,
				opacity: gradientAnimation
			}} source={require("@static/brand/gradient.png")} />
			
			<Animated.View style={{...styles.logoContainer, opacity: logoAnimation}}>
				<Image resizeMode="center" style={styles.logo} source={require("@static/brand/dev_logo.png")} />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	
	logoContainer: {
		position: "absolute",
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	
	logo: {
		width: 450,
		maxWidth: "50%"
	},
	
	gradient: {
		height: "100%",
		width: "100%"
	}
})