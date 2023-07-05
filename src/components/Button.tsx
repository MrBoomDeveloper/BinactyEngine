import { Pressable, Text, Image, ImageSourcePropType, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { colors } from "@util/variables.json";

interface ButtonArguments {
	onPress: () => void,
	theme: "brand" | "popup" | "white",
	children?: JSX.Element,
	style?: ViewStyle,
	styleText?: TextStyle,
	styleIcon?: ImageStyle,
	icon?: ImageSourcePropType,
	text?: string,
	hitbox?: number,
	rippleColor?: string,
	overlayInner?: boolean
}

export default function Button({text, children, icon, theme, rippleColor, onPress, style, styleText, styleIcon, overlayInner, hitbox = 25}: ButtonArguments) {
	return (
		<Pressable onPress={onPress} hitSlop={hitbox}
			style={[
				styles["default"].layout,
				styles[theme].layout,
				{ width: (text ? "auto" : 35) },
				style
			]}

			android_ripple={{
				color: rippleColor || ((text ? ripple.fill : ripple[theme])),
				borderless: (overlayInner != null ? !overlayInner : !text),
				foreground: true
			}}>
			
			{icon && <Image source={icon} style={[
				styles["default"].icon?.small,
				text != null && styles["default"].icon?.large,
				styleIcon
			]} />}

			{text && <Text style={[
				styles["default"].label,
				styles[theme].label,
				styleText
			]}>{text}</Text>}
			
			{children}
		</Pressable>
	);
}

const ripple: Record<string, string> = {
	fill: "black",
	brand: colors.primary,
	popup: "rgb(250, 250, 250, .8)",
	white: "black"
}

const styles: Record<string, {
	layout?: ViewStyle,
	label?: TextStyle,
	icon?: {
		small?: ImageStyle,
		large?: ImageStyle
	}
}> = {
	brand: {
		layout: { backgroundColor: "#e642ff" },
		label: {
			color: "black",
			fontWeight: "700",
			textShadowColor: "rgba(250, 250, 250, .4)",
			textShadowRadius: 5

		}
	},

	popup: {
		layout: {
			backgroundColor: colors.surfaceLight,
			borderWidth: 1,
			borderColor: "rgba(200, 200, 200, .1)"
		},

		label: { color: "white" }
	},

	white: {
		layout: { backgroundColor: "white" },
		label: { 
			color: "black",
			fontWeight: "700",
			letterSpacing: .4
		}
	},

	default: {
		layout: {
			borderRadius: 5,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			gap: 5,
			padding: 5,
			height: 35
		},

		label: {
			fontSize: 14,
			letterSpacing: .2
		},

		icon: {
			small: {
				width: 20,
				height: 20,
				resizeMode: "contain"
			},

			large: {
				width: 25,
				height: 25
			}
		}
	}
}