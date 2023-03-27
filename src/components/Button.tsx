import { Pressable, Text, Image } from "react-native";
import { colors } from "../util/variables";

interface Button {
	onPress: void,
	theme: "brand" | "popup",
	style: any,
	text?: string,
	fill?: boolean
}

export default function Button({text, icon, fill, theme, onPress, style, styleText}: Button) {
	return (
		<Pressable onPress={onPress}
			hitSlop={25}
			style={{
				...containerStyle[theme][fill ? "fill" : "initial"],
				width: (text ? null : 40),
				...style
			}}
			android_ripple={{
				color: fill ? (text ? ripple.fill : ripple[theme]) : ripple[theme],
				borderless: !text,
				foreground: true
			}}>
			
			{icon && <Image source={icon} style={{
				width: text ? 30 : 25,
				height: text ? 30 : 25
			}} />}
			{text && <Text style={{
				...textStyle[theme][fill ? "fill" : "initial"],
				marginRight: (icon ? 15 : 0),
				...styleText
			}}>{text}</Text>}
			
		</Pressable>
	);
}

const containerInitial = {
	borderRadius: 5,
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	gap: 5,
	padding: 5,
	height: 40
}

const ripple = {
	fill: "black",
	brand: colors.primary,
	popup: "white"
}

const containerStyle = {
	brand: {
		fill: {
			...containerInitial,
			backgroundColor: colors.primary
		},
		
		initial: {
			...containerInitial,
			borderWidth: 2,
			borderColor: colors.primary
		}
	},
	
	popup: {
		fill: {
			...containerInitial,
			backgroundColor: colors.surfaceLight,
			borderWidth: 1,
			borderColor: "rgba(200, 200, 200, .1)"
		}
	}
}

const textStyle = {
	brand: {
		initial: {
			color: colors.secondary,
			fontSize: 16,
			fontWeight: "500"
		},
		
		fill: {
			color: "black",
			fontSize: 16,
			fontWeight: "700",
			textShadowColor: "rgba(250, 250, 250, .4)",
			textShadowRadius: 5
		}
	}
}