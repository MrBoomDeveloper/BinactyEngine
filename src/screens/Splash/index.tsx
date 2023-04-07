import { useRef, useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

export default function Splash({controller}) {
	const logoAnimation = useRef(new Animated.Value(0)).current;
	const gradientAnimation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		Animated.parallel([
			Animated.timing(logoAnimation, {
				toValue: 1,
				duration: 1000,
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
					duration: 1250,
					useNativeDriver: true
				}),
				Animated.timing(gradientAnimation, {
					toValue: 0,
					delay: 600,
					duration: 1500,
					useNativeDriver: true
				})
			]).start(() => {
				controller.setScreen("loading", {target: "lobby"});
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
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	},
	
	logoContainer: {
		position: "absolute",
		flex: 1
	},
	
	logo: {
		width: 450
	},
	
	gradient: {
		height: "100%",
		width: "100%"
	}
})