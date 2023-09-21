import { useRef, useEffect } from "react";
import { View, Image, Animated, StyleSheet, BackHandler, NativeEventSubscription } from "react-native";
import { startAnimation } from "./splashAnimation";
import { useSplashInit } from "./splashInitialization";
import { useNavigation } from "@react-navigation/native";
import themes from "@data/themes.json";
import { AppBridge } from "@native";

export default function Splash() {
	const backHandler = useRef<NativeEventSubscription>();
	const navigation = useNavigation();
	const logoAnimation = useRef(new Animated.Value(0)).current;
	const gradientAnimation = useRef(new Animated.Value(0)).current;
	useSplashInit();
	
	useEffect(() => {
		AppBridge.stopMusic();

		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			return true;
		});

		backHandler.current = handler;

		startAnimation(logoAnimation, gradientAnimation, () => {
			navigation.navigate("loading", { target: "lobby" });
			backHandler.current?.remove();
		});

		return () => handler.remove();
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
		backgroundColor: themes.dark_sakura.colors.screenBackground,
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