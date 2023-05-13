import { useState } from "react";
import { StatusBar, StyleSheet, ScrollView, View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { sizes, colors } from "../util/variables";

function NavigationItem({icon, label, id, onSelect, isSelected}) {
	const style = isSelected
		? {...styles.item, ...styles.itemActive}
		: {...styles.item, ...styles.itemInactive};
	
	const iconSource = isSelected 
		? (icon.active || icon.inactive || icon) 
		: (icon.inactive || icon.active || icon);
	
	return (
		<TouchableOpacity onPress={() => onSelect(label, id)} style={style}>
			<Image style={styles.itemIcon} 
				source={iconSource}/>
		</TouchableOpacity>
	);
}

export default function Navigation({items, onSelect}) {
	const [select, setSelected] = useState(items[0].label);
	
	const onSelectItem = (label: string, id: string) => {
		setSelected(label);
		onSelect(id);
	}
	
	return (
		<View style={styles.holder}>
			<View style={styles.navigationWrapper}>
				<ScrollView style={styles.scroll}>
					{items.map(data => (
						<NavigationItem 
							isSelected={select == data.label} 
							onSelect={onSelectItem} {...data}>
						</NavigationItem>
					))}
					<View style={{height: 60}} />
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	holder: {
		height: "100%",
		justifyContent: "center",
		backgroundColor: colors.surfaceLight
	},
	
	navigationWrapper: {
		maxHeight: 500,
		flexGrow: 1
	},
	
	scroll: {
		paddingVertical: sizes.big,
		marginBottom: 55,
		paddingRight: sizes.big
	},
	
	item: {
		marginBottom: 6,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: StatusBar.currentHeight,
		padding: sizes.medium,
		borderRadius: 10
	},
	
	itemActive: {
		fontWeight: "500",
		backgroundColor: colors.surfaceLight
	},
	
	itemInactive: {
		fontWeight: "400",
		opacity: .5
	},
	
	itemIcon: {
		width: 23,
		height: 23
	}
});