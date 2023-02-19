import { useEffect, useRef } from "react";
import { View, Animated, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "@util/variables";

export default function Input({error, onChangeText, style, ...props}) {
	const animation = useRef(new Animated.Value(0));
	
	useEffect(() => {
		Animated.timing(animation.current, {
			toValue: error == "" ? 0 : 1,
			duration: 150,
			useNativeDriver: true
		}).start();
	}, [animation.current, error]);
	
	useEffect(() => {
		animation.current = new Animated.Value(error == "" ? 0 : 1);
	}, [error]);
	
	return (
		<View style={[styles.holder, style]}>
			<Animated.View style={{...styles.error, opacity: animation.current}}>
				<Text style={styles.errorLabel}>{error}</Text>
			</Animated.View>
			<TextInput style={styles.text}
				onChangeText={onChangeText}
				placeholder={String(props.placeholder || props.defaultValue)}
				defaultValue={String(props.defaultValue)}
				keyboardType={"number-pad"} />
		</View>
	);
}

const styles = StyleSheet.create({
	holder: {
		backgroundColor: colors.background,
		borderRadius: 8,
		paddingLeft: 10,
		paddingRight: 10,
		height: 45,
		minWidth: 75,
		position: "relative",
		borderWidth: 1,
		borderColor: "rgba(250, 250, 250, .1)"
	},
	
	text: {
		fontSize: 15
	},
	
	error: {
		position: "absolute",
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 6,
		backgroundColor: colors.surfaceSmall,
		width: 100,
		height: "100%",
		right: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 30
	},
	
	errorLabel: {
		color: "white",
		fontWeight: "500",
		fontSize: 14
	}
});