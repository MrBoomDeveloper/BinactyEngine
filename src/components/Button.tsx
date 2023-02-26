import { Pressable, Text, Image, StyleSheet } from "react-native";
import { colors } from "../util/variables";

export default function Button({label, labelStyle, icon, styleOuter, style, borderDisabled, rippleColor = colors.primary, ...props}) {
	let ripple = { color: rippleColor };
	
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
			
			{icon && <Image source={icon} style={{...imageStyle, ...style}} />} 
			{label && <Text style={{...styles.label, ...labelStyle}}>{label}</Text>}
			
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonHolder: {
		backgroundColor: "rgba(232, 128, 255, .04)",
		borderColor: colors.primary,
		borderWidth: 1.5,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center"
	},
	
	label: {
		width: "100%",
		color: colors.secondary,
		padding: 10,
		fontSize: 15,
		fontWeight: "500",
		textAlign: "center"
	},
	
	icon: {
		width: 25,
		height: 25
	}
});