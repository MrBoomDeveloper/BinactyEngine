import React, { useState, useEffect, cloneElement, Children } from "react";
import { StatusBar, View,  BackHandler } from 'react-native';
import { Splash, Loading, Lobby, GameOver } from "@screens";
import GameNative from "@native";
import { Provider, useSelector } from "react-redux";
import { store } from "@context/store";

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