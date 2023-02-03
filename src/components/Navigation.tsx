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
			<Text style={isSelected ? styles.itemLabel : {...styles.itemLabel, ...styles.itemLabelActive}}>{label}</Text>
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
		<View style={{height: "100%"}}>
			<ScrollView style={styles.navigation}>
				{items.map(data => (
					<NavigationItem 
						isSelected={select == data.label} 
						onSelect={onSelectItem} {...data}>
					</NavigationItem>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	navigation: {
		height: "100%",
		paddingTop: sizes.big,
		paddingRight: sizes.big,
		backgroundColor: colors.surfaceLight
	},
	
	item: {
		marginBottom: 6,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: StatusBar.currentHeight,
		padding: sizes.medium,
		paddingRight: 25,
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
		marginRight: sizes.medium,
		width: 23,
		height: 23
	},
	
	itemLabel: {
		color: "white",
		fontSize: 15,
		fontWeight: "500"
	},
	
	itemLabelActive: {
		fontWeight: "400"
	}
});