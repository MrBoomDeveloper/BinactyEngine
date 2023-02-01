import React from "react";
import { StatusBar, StyleSheet, View, Image, Text } from "react-native";
import Button from "./Button";
import { sizes, colors } from "../util/variables";

const avatars = {
	klarrie: require("../static/avatar/premium.jpg")
}

interface playerDataBasic {
	avatar: string,
	nick: string,
	level: number
}

export default function Header({ player = {}, ...props }) {
	const { nick = "Player", level = 1, avatar = "klarrie" } = player;
	
	return (
		<View style={styles.header}>
			<Image style={styles.avatar} source={avatars[avatar]}/>
			<View style={styles.stats}>
				<Text style={styles.nicknameLabel}>{nick}</Text>
				<View>
					<Text style={styles.levelLabel}>Lvl.{level}</Text>
				</View>
			</View>
			<View style={styles.actions}>
				<Button icon={require("../static/icon/settings.png")} borderDisabled={true} rippleColor="rgba(255, 255, 255, .4)" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		padding: sizes.medium,
		backgroundColor: colors.surfaceLight
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
		display: "flex"
	},
	
	nicknameLabel: {
		color: "white",
		fontSize: 15,
		flexGrow: 1
	},
	
	levelLabel: {
		color: colors.textSecond,
		fontSize: 13,
		fontWeight: "500"
	},
	
	actions: {
		paddingRight: 20,
		flexGrow: 1,
		height: "100%",
		alignItems: "flex-end"
	}
});