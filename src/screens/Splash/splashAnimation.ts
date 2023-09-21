import { Animated } from "react-native";

export function startAnimation(logoAnimation: Animated.Value, gradientAnimation: Animated.Value, callback: () => void) {
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
	]).start(() => fadeOut(logoAnimation, gradientAnimation, callback));
}

function fadeOut(logoAnimation: Animated.Value, gradientAnimation: Animated.Value, callback: () => void) {
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
	]).start(callback);
}