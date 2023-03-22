import React from "react";
import { StatusBar, StyleSheet, View, Image, Text } from "react-native";
import { Button } from "@components";
import { sizes, colors } from "../util/variables";

const avatars = {
	klarrie: require("../static/avatar/premium.jpg")
}
export default function Header({ title, values, actions, onClose, player}) {
	return (
		<View style={styles.header}>
			{onClose && <Button styleOuter={styles.back} style={styles.backIcon} icon={require("@static/icon/back.png")} borderDisabled={true} rippleColor="rgba(255, 255, 255, .2)" onPress={onClose} />}
			{title && <Text style={styles.title}>{title}</Text>}
			{player && Profile(player)}
			{values && <View style={styles.values}>{values.map(item => <Value {...item}/>)}</View>}
			<View style={styles.actions}>
				{actions && actions.map(item => (
					<Button key={item.key}
						onPress={item.onPress}
						icon={item.icon}
						borderDisabled={true}
						rippleColor="rgba(255, 255, 255, .2)" />
				))}
			</View>
		</View>
	);
}

function Profile({nick, level, avatar}) {
	return (
		<View style={styles.profile}>
			<Image style={styles.avatar} source={avatars[avatar]}/>
			<View style={styles.stats}>
				<Text style={styles.nicknameLabel}>{nick}</Text>
				<View>
					<Text style={styles.levelLabel}>Lvl.{level}</Text>
				</View>
			</View>
		</View>
	);
}

function Value({title, count}) {
	return (
		<View style={styles.value}>
			<Text>{title}: </Text>
			<Text>{count}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		padding: sizes.medium,
		backgroundColor: colors.surfaceLight,
		height: 60,
		alignItems: "center"
	},
	
	back: {
		marginLeft: 5,
		marginRight: 5,
		padding: 2
	},
	
	backIcon: {
		width: 20,
		height: 20
	},
	
	title: {
		color: "white",
		fontSize: 15,
		fontWeight: "500",
		marginLeft: 10
	},
	
	avatar: {
		width: 38,
		height: 38,
		borderRadius: 2,
		marginLeft: StatusBar.currentHeight
	},
	
	stats: {
		height: "100%",
		marginLeft: 14,
		padding: 1,
		display: "flex",
		justifyContent: "center"
	},
	
	profile: {
		display: "flex",
		flexDirection: "row",
		flexGrow: 1
	},
	
	nicknameLabel: {
		color: "white",
		fontSize: 15,
		marginBottom: 5
	},
	
	levelLabel: {
		color: colors.textSecond,
		fontSize: 13,
		fontWeight: "500"
	},
	
	values: {
		flexDirection: "row",
		gap: 25
	},
	
	value: {
		flexDirection: "row",
		gap: 10
	},
	
	actions: {
		marginLeft: 50,
		paddingRight: 20,
		alignItems: "flex-end"
	}
});