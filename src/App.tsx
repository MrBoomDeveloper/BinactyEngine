import React, { useState, cloneElement, Children } from "react";
import { StatusBar, View } from 'react-native';
import { Splash, Loading, Lobby, GameOver } from "@screens";
import Lobby2 from "@screens/Lobby/Lobby2";
import { Provider  } from "react-redux";
import { store } from "@context/store";

// Enables a fully rewritten lobby!
const isDevBuild: boolean = false;

export default function App() {
	if(isDevBuild) {
		return (
			<View style={{flex: 1}}>
			<Provider store={store}>
				<StatusBar hidden={true} />
				<Lobby2 />
			</Provider>
		</View>
		);
	}

	return (
		<View style={{flex: 1}}>
			<Provider store={store}>
				<StatusBar hidden={true} />
				<Controller initial="splash">
					<Splash name="splash" />
					<Loading name="loading" />
					<Lobby name="lobby" />
					<GameOver name="gameover" />
				</Controller>
			</Provider>
		</View>
	);
};

function Controller({children, initial}) {
	const [currentScreen, setCurrentScreen] = useState({name: initial, args: {}});
	
	const controller = {
		setScreen: (name, args) => {
			setCurrentScreen({name, args});
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