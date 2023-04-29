import { View, Modal, StyleSheet } from "react-native";
import { colors } from "@util/variables";

export default function Dialog({visible, children, onClose}) {
	return (
		<Modal onRequestClose={onClose}
			animationType="slide"
			transparent={true}
			visible={visible}>
			
			<View style={styles.holder}>
				{children}
			</View>
			
		</Modal>
	);
}

const styles = StyleSheet.create({
	holder: {
		height: "100%",
		width: "100%",
		backgroundColor: colors.background
	}
});