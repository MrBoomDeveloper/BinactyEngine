import { useState, useRef, useEffect } from "react";
import { View, Animated, Pressable, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@util/variables.json";

interface ToggleProps {
	defaultValue?: boolean,
	onToggle?: (isActive: boolean) => void,
	style?: ViewStyle
}

export default function Toggle({defaultValue, onToggle, style}: ToggleProps) {
	const [isActive, setActive] = useState(defaultValue);
	const animation = useRef(new Animated.Value(3));

	useEffect(() => {
		Animated.timing(animation.current, {
			toValue: isActive ? 33 : 3,
			duration: 100,
			useNativeDriver: true
		}).start();
	}, [animation.current, isActive]);
	
	useEffect(() => {
		animation.current = new Animated.Value(isActive ? 33 : 3);
	}, [isActive]);
	
	const onPress = () => {
		onToggle && onToggle(!isActive);
		setActive(!isActive);
	}
	
	return (
		<Pressable onPress={onPress} hitSlop={50}>
			<View style={{
				...styles.holder,
				...style,
				backgroundColor: isActive ? colors.primary : colors.background,
				borderWidth: isActive ? 0 : 2
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
		borderColor: "rgba(75, 75, 75, 0.5)"
	},
	
	pointer: {
		height: 22,
		width: 22,
		borderRadius: 24,
		backgroundColor: "white"
	}
});