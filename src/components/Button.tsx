import { Pressable, Text, Image, StyleSheet } from "react-native";
import { colors } from "../util/variables";

interface ButtonInterface {
	label?: string,
	icon?: unknown,
	styleOuter?: any,
	borderDisabled?: boolean,
	rippleColor?: string
}

export default function Button({label, icon, styleOuter, borderDisabled, rippleColor, ...props}: ButtonInterface) {
	let ripple = {color: (rippleColor || colors.primary)};
	
	let imageStyle = styles.icon;
	if(!label) {
		imageStyle = {...imageStyle, margin: 5};
		ripple.borderless = true;
	}
	
	let pressableStyle = {...styles.buttonHolder, ...styleOuter};
	if(borderDisabled) pressableStyle = {...pressableStyle, borderColor: "transparent"};
	
	return (
		<Pressable {...props}
			style={pressableStyle}
			android_ripple={ripple}>
			
			{icon && <Image source={icon} style={imageStyle} />} 
			{label && <Text style={styles.label}>{label}</Text>}
			
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonHolder: {
		backgroundColor: "rgba(232, 128, 255, .04)",
		borderColor: colors.primary,
		borderWidth: 1.5,
		borderRadius: 5
	},
	
	label: {
		width: "100%",
		color: colors.secondary,
		padding: 10,
		fontSize: 15,
		fontWeight: 500,
		textAlign: "center"
	},
	
	icon: {
		width: 25,
		height: 25
	}
});