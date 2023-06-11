import { useState, useEffect, useRef } from "react";
import { View, Animated, Text, TextInput, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@util/variables.json";
import { ObjectMap } from "App";

interface InputElement {
	placeholder?: string | number,
	maxLength?: number,
	error?: string,
	type?: "string" | "number",
	onChangeText?: (text: string) => void,
	style?: ViewStyle,
	defaultValue?: string | number
}

export default function Input({error, placeholder = "Enter text...", maxLength, type = "string", onChangeText, style, defaultValue}: InputElement) {
	const animation = useRef(new Animated.Value(0));
	const input = useRef<TextInput>(null);
	const [isFocus, setIsFocus] = useState(false);
	
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
	
	const borderColor = (error != "") ? "red" : isFocus ? colors.primary : "rgba(250, 250, 250, .1)";
	return (
		<View style={{...styles.holder, ...style, borderColor}}>
			<Animated.View style={{...styles.error, opacity: animation.current}}>
				<Text style={styles.errorLabel}>{error}</Text>
			</Animated.View>
			
			<TextInput ref={input}
				style={styles.text}
				textAlign="center"
				onChangeText={onChangeText}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				maxLength={maxLength || 25}
				placeholder={error == "" ? String(placeholder || defaultValue) : error}
				placeholderTextColor={error == "" ? "#877e8b" : "red"}
				defaultValue={String(defaultValue)}
				keyboardType={types[type]} />
		</View>
	);
}

const types: ObjectMap = {
	number: "number-pad",
	text: "default"
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
		overflow: "hidden"
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