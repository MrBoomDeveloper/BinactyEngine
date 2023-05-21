import { Pressable, Text, Image, ImageSourcePropType, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { colors } from "../util/variables";

interface ButtonArguments {
	onPress: () => void,
	theme: "brand" | "popup" | "white",
	children?: JSX.Element,
	style?: ViewStyle,
	styleText: TextStyle,
	styleIcon?: ImageStyle,
	icon?: ImageSourcePropType,
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
				...containerInitial,
				...containerStyle[theme][fill ? "fill" : "initial"],
				width: (text ? null : 35),
				...style
			}}
			android_ripple={{
				color: rippleColor || (fill ? (text ? ripple.fill : ripple[theme]) : ripple[theme]),
				borderless: (overlayInner != null ? !overlayInner : !text),
				foreground: true
			}}>
			
			{icon && <Image source={icon} style={[{
				width: text ? 25 : 20,
				height: text ? 25 : 20
			}, styleIcon]} />}
			{text && <Text style={{
				...textInitial,
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
	height: 35
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
			backgroundColor: colors.primary
		},
		
		initial: {
			borderWidth: 2,
			borderColor: colors.primary
		}
	},
	
	popup: {
		fill: {
			backgroundColor: colors.surfaceLight,
			borderWidth: 1,
			borderColor: "rgba(200, 200, 200, .1)"
		}
	},
	
	white: {
		fill: {
			backgroundColor: "white"
		}
	}
}

const textInitial = {
	fontSize: 14
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
			fontWeight: "500"
		},
		
		fill: {
			color: "black",
			fontWeight: "700",
			textShadowColor: "rgba(250, 250, 250, .4)",
			textShadowRadius: 5
		}
	},
	
	white: {
		fill: {
			color: "black",
			fontWeight: "500"
		}
	}
}