import { createElement, useState } from "react";
import { StatusBar } from 'react-native';
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

function Controller({initial, items}: ControllerProps) {
	const [current, setCurrent] = useState(initial);
	const [allProps, setAllProps] = useState(new Map());

	const found = items[current].element || items[0].element || null;

	return createElement(found, {
		setScreen: (name: string, props?: SetScreenProps) => {
			const newMap = new Map(allProps);
			newMap.set(`__${name}_props`, props);

			setAllProps(newMap);
			
			if(name != current) setCurrent(name);
		}, ...allProps.get(`__${current}_props`)
	});
}