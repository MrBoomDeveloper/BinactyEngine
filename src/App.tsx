import { createElement, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Animated, StatusBar, View, ViewStyle } from 'react-native';
import Splash from "@screens/Splash";
import Lobby2 from "@screens/Lobby/Lobby2";
import { Provider  } from "react-redux";
import { store } from "@context/store";
import Loading from '@screens/Loading';
import Lobby from '@screens/Lobby';
import GameOver from '@screens/GameOver';

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar hidden={true} />
			<Controller initial="splash" items={{
				"splash": { element: Splash },
				"loading": { element: Loading },
				"lobby": { element: Lobby2 },
				"lobby2": { element: Lobby },
				"gameover": { element: GameOver }
			}} />
		</Provider>
	);
};

interface ControllerProps {
	initial: string,
	items: Record<string, {
		element: any
	}>
}

export type SetScreenProps = (name: string, props?: Record<string, any>) => void;

interface ControllerState {
	current: string,
	components: Map<string, any>
}

function controllerReducer(state: ControllerState, payload: Partial<ControllerState>) {
	return {...state, ...payload};
}

function Controller({initial, items}: ControllerProps) {
	const [state, dispatch] = useReducer(controllerReducer, { components: new Map(), current: "" });

	const defaultProps = useMemo(() => {
		return {
			setScreen: (name: string, props?: SetScreenProps) => {
				const newComponentsMap = new Map(state.components);
				newComponentsMap.set(name, createElement(items[name].element, {...defaultProps, ...props}));
				dispatch({ components: newComponentsMap, current: name });
			}
		}
	}, []);

	useEffect(() => {
		const newMap = new Map();

		for(const [key, value] of Object.entries(items)) {
			newMap.set(key, createElement(value.element, defaultProps));
		}

		dispatch({ current: initial, components: newMap });
	}, [items]);

	return state.components.get(state.current);
}