import { useState, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Provider, useSelector } from "react-redux";
import { Header, Navigation, Pager, Button } from "@components";
import { Settings } from "@screens";
import Home from "@screens/Lobby/Home";
import News from "@screens/Lobby/News";
import { colors, sizes } from "@util/variables";
import { NavItems } from "@data/HomeData";
import GameNative from "@native";

export default function Lobby({controller}) {
	const [currentPage, setCurrentPage] = useState("home");
	const [settingsVisibility, setSettingsVisibility] = useState(false);
	const profile = useSelector(state => state.profile.value.me);
	const money = useSelector(state => state.profile.value.money);
	
	const actions = [
		{ key: "settings", icon: require("@static/icon/settings.png"), onPress() { setSettingsVisibility(true) } }
	];
	
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			GameNative.requestClose();
			return true;
		});
	}, []);
	
	return (
		<View style={styles.screen}>
			<Header player={profile} values={money} actions={actions}>
				<View style={{flexDirection: "row", justifyContent: "center"}}>
					<Button text="Manage Installed Packs"
						onPress={() => GameNative.managePacks()}
						theme="popup" fill={true}
						style={{paddingHorizontal: 50}}
						rippleColor="rgba(250, 250, 250, .1)" />
				</View>
			</Header>
			
			<View style={styles.dualContainer}>
				<Navigation items={NavItems} onSelect={setCurrentPage}/>
				<Pager select={currentPage}>
					<Home controller={controller} id="home"/>
					<Wip id="skills" />
					<Wip id="shop" />
					<News id="logs"/>
					<Wip id="about" />
				</Pager>
			</View>
			
			<Settings visible={settingsVisibility} onClose={() => setSettingsVisibility(false)} />
		</View>
	);
}

function Wip() {
	return (
		<View style={{
			width: "100%",
			flexGrow: 1,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			paddingRight: 25, 
			paddingBottom: 50}}>
			
			<Text style={{color: "white", fontSize: 16, marginBottom: 20}}>This page is currently under development.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		height: "100%",
		width: "100%",
		flex: 1,
		flexDirection: "column",
		backgroundColor: colors.background
	},
	
	dualContainer: {
		flexGrow: 1,
		flexDirection: "row",
		overflow: "hidden"
	}
});