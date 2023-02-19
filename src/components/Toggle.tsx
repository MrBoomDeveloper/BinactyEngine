import { useState, useRef, useEffect } from "react";
import { View, Animated, Pressable, StyleSheet } from "react-native";
import { colors } from "@util/variables";

export default function Toggle({defaultValue, onToggle, style}) {
	const [isActive, setActive] = useState(defaultValue);
	const animation = useRef(new Animated.Value(3));

	useEffect(() => {
		Animated.timing(animation.current, {
			toValue: isActive ? 32 : 3,
			duration: 100,
			useNativeDriver: true
		}).start();
	}, [animation.current, isActive]);
	
	useEffect(() => {
		animation.current = new Animated.Value(isActive ? 32 : 3);
	}, [isActive]);
	
	const onPress = () => {
		onToggle(!isActive);
		setActive(!isActive);
	}
	
	return (
		<Pressable onPress={onPress} hitSlop={50}>
			<View style={{
				...styles.holder,
				...style,
				backgroundColor: isActive ? colors.primary : colors.background,
				borderWidth: isActive ? 0 : 1
			}}>
				<Animated.View style={{
					...styles.pointer,
					translateX: animation.current,
					backgroundColor: isActive ? colors.background : "white"
				}} />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	holder: {
		display: "flex",
		justifyContent: "center",
		width: 60,
		height: 30,
		backgroundColor: colors.background,
		borderRadius: 30,
		borderColor: "white"
	},
	
	pointer: {
		height: 25,
		width: 25,
		borderRadius: 25,
		backgroundColor: "white"
	}
});