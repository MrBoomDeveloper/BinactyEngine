import { useEffect, useState, memo } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Button, Header } from "@components";
import Dialog from "./Dialog";
import GameNative from "../../GameNative";

function Gamemodes({visible, onClose}) {
	const [gamemodes, setGamemodes] = useState({});
	useEffect(() => {
		GameNative.getGamemodes(setGamemodes);
	}, []);
	
	const onPress = () => {
		onClose();
	}
	
	return (
		<Dialog visible={visible} onClose={onClose}>
			<Header title="Gamemodes" onClose={onClose} />
			<ScrollView 
			  horizontal={true}
			  overScrollMode="always"
			  contentContainerStyle={styles.contentHolder}
			  style={styles.screen}>
			  
				<View style={styles.content}>
					<View style={styles.specialCategory}>
						{gamemodes?.special?.map(gamemode => (
							<Gamemode {...gamemode} isBig={true} onPress={() => onPress(gamemode)} />
						))}
					</View>
					<View style={styles.ordionaryCategory}>
						{gamemodes?.other?.map(gamemode => (
							<Gamemode {...gamemode} isBig={false} onPress={() => onPress(gamemode)} />
						))}
					</View>
				</View>
			</ScrollView>
		</Dialog>
	)
}

function Gamemode({name, author, onPress, isBig}) {
	const smallCardStyle = isBig ? {} : {
		flexBasis: "49%"
	}
	
	return (
		<TouchableOpacity onPress={onPress} style={smallCardStyle}>
			<ImageBackground
			  source={require("@static/banner/gamemode/gamemode.jpg")}
			  style={isBig ? styles.gamemodeBig : styles.gamemodeSmall}>
				<View style={isBig ? styles.infoBig : styles.infoSmall}>
					<Text style={isBig ? styles.gamemodeTitle : styles.gamemodeTitleSmall}>{name}</Text>
					<Text style={styles.gamemodeAuthor}>Made by {author}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	
	contentHolder: {
		alignItems: "center",
		paddingLeft: 25,
		paddingRight: 25
	},
	
	content: {
		height: "80%",
		maxHeight: 400,
		flexDirection: "row",
		gap: 15
	},
	
	specialCategory: {
		display: "flex",
		flexDirection: "row",
		gap: 10
	},
	
	ordionaryCategory: {
		display: "flex",
		flexWrap: "wrap",
		columnGap: 10,
		justifyContent: "space-between"
	},
	
	gamemodeBig: {
		backgroundColor: "rgba(0, 0, 0, .6)",
		height: "100%",
		width: 200,
		display: "flex",
		justifyContent: "flex-end"
	},
	
	gamemodeSmall: {
		backgroundColor: "rgba(0, 0, 0, .6)",
		width: 350,
		height: "100%",
		justifyContent: "flex-end"
	},
	
	infoBig: {
		padding: 10,
		paddingBottom: 15,
		backgroundColor: "rgba(0, 0, 0, .5)"
	},
	
	infoSmall: {
		padding: 10,
		backgroundColor: "rgba(0, 0, 0, .5)",
		flexDirection: "row",
		display: "flex",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	
	gamemodeTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 20
	},
	
	gamemodeTitleSmall: {
		color: "white",
		fontWeight: "500",
		fontSize: 16
	},
	
	gamemodeAuthor: {
		color: "white",
		marginTop: 4
	}
});

export default memo(Gamemodes);