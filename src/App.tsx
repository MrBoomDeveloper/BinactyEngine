import React, { useState, useEffect, cloneElement, Children } from "react";
import { StatusBar, Pressable, StyleSheet, View, Text, BackHandler } from 'react-native';
import { Splash, Loading, Lobby, GameOver } from "@screens";
import { Header, Navigation, Pager, Button } from "@components";
import { Settings } from "@screens";
import GameNative from "@native";
import { colors, sizes } from "@util/variables";
import { NavItems } from "@data/HomeData";
import { Provider, useSelector } from "react-redux";
import Home from "@screens/Lobby/Home";
import News from "@screens/Lobby/News";
import { store } from "@context/store";

const Wip = () => {
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

function Screen({controller}) {
	const [currentPage, setCurrentPage] = useState("home");
	const [settingsVisibility, setSettingsVisibility] = useState(false);
	const profile = useSelector(state => state.profile.value.me);
	const money = useSelector(state => state.profile.value.money);
	
	const actions = [
		{ key: "settings", icon: require("@static/icon/settings.png"), onPress() { setSettingsVisibility(true) } }
	];
	
	return (
		<View style={styles.screen}>
			<Header player={profile} values={money} actions={actions}/>
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

export default function App() {
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			GameNative.requestClose();
			return true;
		});
	}, []);
	
	return (
		<View style={{flex: 1}}>
			<Provider store={store}>
				<StatusBar hidden={true} />
				<Controller initial="splash">
					<Splash name="splash" />
					<Loading name="loading" />
					<Screen name="lobby" />
					<GameOver name="gameover" />
				</Controller>
			</Provider>
		</View>
	);
};

function Controller({children, initial}) {
	const [currentScreen, setScreen] = useState({name: initial, args: {}});
	
	const controller = {
		setScreen: (name, args) => {
			setScreen({name, args});
		}
	}
	
	return (
		<View style={{flex: 1}}>
			{Children.toArray(children).map(child => {
				if(child.props.name == currentScreen.name) {
					return cloneElement(child, {controller, ...currentScreen.args})
				}
			})}
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
	}
});