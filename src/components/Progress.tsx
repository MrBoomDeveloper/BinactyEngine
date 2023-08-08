import { memo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface ProgressProps {
	showLabel?: boolean,
	current: number,
	max: number,
	style?: ViewStyle
}

function Progress({style, current, max, showLabel}: ProgressProps) {
	return (
		<View style={[styles.layout, style]}>
			<View style={[styles.bar, { width: current / max * 100 + "%"}]} />
			{showLabel && <Text style={styles.label}>{current} / {max}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	layout: {
		height: 12,
		width: 75,
		backgroundColor: "#201522",
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
		justifyContent: "center"
	},

	bar: {
		backgroundColor: "#be47db",
		height: "100%"
	},

	label: {
		color: "white", position: "absolute",
		fontSize: 11,
		letterSpacing: .1,
		fontWeight: "500",
		alignSelf: "center",
		textShadowColor: "#000000",
		textShadowRadius: 5
	}
});

export default memo(Progress);