import { StyleSheet, Text, View } from "react-native";
import { colors, sizes } from "@util/variables";

export default function Chips({data}) {
	return (
		<View style={styles.holder}>
			{data.map(item => (
				<View style={styles.chip} key={item}>
					<Text style={styles.text}>{item}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	holder: {
		display: "flex",
		flexDirection: "row",
		gap: 10
	},
	
	chip: {
		borderRadius: 5,
		padding: 6,
		paddingLeft: 8,
		paddingRight: 8,
		backgroundColor: colors.surfaceSmall
	},
	
	text: {
		fontSize: sizes.smallText,
		fontWeight: "500",
		color: colors.textSecond
	}
});