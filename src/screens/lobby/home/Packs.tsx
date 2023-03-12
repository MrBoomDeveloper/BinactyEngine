import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, SectionList, TouchableOpacity } from "react-native";
import { Button } from "@components";
import { colors } from "@util/variables";

export default function Packs() {
	const [packs, setPacks] = useState([]);
	
	useEffect(() => {
		setPacks([
			{
				title: "Active Packs",
				data: [ "Five Nights at Freddy's", "Core pack" ]
			}, {
				title: "Inactive Packs",
				data: [ "Test", "among us" ]
			}
		]);
	}, []);
	
	return (
		<View style={styles.card}>
			<SectionList style={styles.list}
			  sections={packs}
			  renderItem={Pack}
			  renderSectionHeader={SectionHeader}/>
			
			<Button
			  styleOuter={styles.addButton}
			  onPress={() => alert("This feature isn't done yet!")}
			  label="Add More" />
		</View>
	);
}

function Pack({item}) {
	return (
		<TouchableOpacity style={styles.item}>
			<Image style={styles.itemIcon} source={{uri: "https://assets.stickpng.com/images/6002f9d851c2ec00048c6c78.png"}} />
			<Text style={styles.itemTitle}>{item}</Text>
		</TouchableOpacity>
	);
}

function SectionHeader({section: {title} }) {
	return (
		<Text style={styles.title}>{title}</Text>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 250,
		borderRadius: 12,
		backgroundColor: "#190A29",
		marginRight: 20
	},
	
	list: {
		padding: 4
	},
	
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		padding: 16,
		paddingHorizontal: 24,
		paddingBottom: 6
	},
	
	item: {
		flexDirection: "row",
		gap: 16,
		margin: 4,
		padding: 8,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: colors.surfaceLight
	},
	
	itemIcon: {
		width: 40,
		height: 40
	},
	
	itemTitle: {
		color: "white",
		fontSize: 15
	},
	
	addButton: {
		margin: 20,
		marginBottom: 24
	}
});