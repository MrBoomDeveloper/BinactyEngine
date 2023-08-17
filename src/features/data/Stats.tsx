import { memo } from "react";
import { StyleSheet, View, Image, ImageSourcePropType, Text, ViewStyle } from "react-native";

interface Item {
	title: string,
	icon?: ImageSourcePropType
}

export const StatsBar = memo(({items, style}: {
	style?: ViewStyle | ViewStyle[],
	items: Item[]
}) => {
	return (
		<View style={[styles.layout, style]}>
			{items.map(({title, icon}) => (
				<View key={title} style={styles.column}>
					{icon && <Image style={styles.icon} source={icon} />}
					<Text style={styles.label}>{title}</Text>
				</View>
			))}
		</View>
	);
});

const styles = StyleSheet.create({
	layout: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 12
	},

	column: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8
	},

	label: {
		color: "white",
		fontSize: 14,
		fontFamily: "OpenSansRegular"
	},

	icon: {
		width: 18, 
		height: 18
	}
});