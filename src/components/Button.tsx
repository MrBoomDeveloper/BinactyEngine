import { Pressable, Text, Image } from "react-native";
import { colors } from "../util/variables";

interface ButtonArguments {
	onPress: void,
	theme: "brand" | "popup" | "white",
	text?: string,
	fill?: boolean,
	hitbox?: number,
	rippleColor?: string,
	overlayInner?: boolean
}

export default function Button({text, children, icon, fill, theme, rippleColor, onPress, style, styleText, styleIcon, overlayInner, hitbox = 25}: ButtonArguments) {
	return (
		<Pressable onPress={onPress}
			hitSlop={hitbox}
			style={{
				...containerStyle[theme][fill ? "fill" : "initial"],
				width: (text ? null : 40),
				...style
			}}
			android_ripple={{
				color: rippleColor || (fill ? (text ? ripple.fill : ripple[theme]) : ripple[theme]),
				borderless: (overlayInner != null ? !overlayInner : !text),
				foreground: true
			}}>
			
			{icon && <Image source={icon} style={[{
				width: text ? 30 : 25,
				height: text ? 30 : 25
			}, styleIcon]} />}
			{text && <Text style={{
				...textStyle[theme][fill ? "fill" : "initial"],
				marginRight: (icon ? 15 : 0),
				...styleText
			}}>{text}</Text>}
			
			{children}
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
	popup: "rgb(250, 250, 250, .8)",
	white: "black"
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
	},
	
	white: {
		fill: {
			...containerInitial,
			backgroundColor: "white"
		}
	}
}

const textStyle = {
	popup: {
		initial: {
			color: "white"
		}
	},
	
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
	},
	
	white: {
		fill: {
			color: "black",
			fontSize: 16,
			fontWeight: "500"
		}
	}
}