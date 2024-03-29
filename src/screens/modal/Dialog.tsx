import { View, Modal, StyleSheet } from "react-native";
import { colors } from "@util/variables.json";
import { memo } from "react";

interface DialogProps {
	visible: boolean,
	children?: JSX.Element | JSX.Element[],
	onClose: () => void
}

function Dialog({visible, children, onClose}: DialogProps) {
	return (
		<Modal onRequestClose={onClose}
			animationType="slide"
			transparent={true}
			visible={visible}>
			
			<View style={styles.holder}>{children}</View>
			
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

export default memo(Dialog);