import { useAppDispatch, useAppSelector } from "@util/hooks";
import { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

function Holder({children}: {children: JSX.Element | JSX.Element[]}) {
	const popupState = useAppSelector(state => state.popup);

	return (
		<View style={{flex: 1}}>
			{children}

			{popupState.current && <View style={styles.popupBackground}>

			</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	popupBackground: {
		backgroundColor: "rgba(0, 0, 0, .4)",
		position: "absolute",
		left: 0,
		top: 0,
		width: Dimensions.get("screen").width,
		height: Dimensions.get("screen").height
	}
});

export default memo(Holder);