import { memo, useEffect, useRef } from "react";
import { ViewStyle } from "react-native";
import { Animated } from "react-native";

/**
 * Effect applies on these scenarios:
 * - Parent was rerendered
 * - The component just got mounted
 * - One of the dependencies got changed
 * @param duration Duration in milliseconds
 */
export const FadingView = memo(({children, style, dependencies = [], duration = 1000, toValue = 1, fromValue = 0}: {
	children: JSX.Element | JSX.Element[],
	style?: ViewStyle | ViewStyle[],
	dependencies?: any[],
	duration?: number,
	toValue?: number,
	fromValue?: number
}) => {
	const animation = useRef(new Animated.Value(fromValue)).current;

	useEffect(() => {
		animation.setValue(fromValue);
	}, [fromValue]);

	useEffect(() => {
		Animated.timing(animation, {
			useNativeDriver: true,
			duration,
			toValue
		}).start();
	}, dependencies);

	return (
		<Animated.View style={[style, {opacity: animation}]}>
			{children}
		</Animated.View>
	);
});