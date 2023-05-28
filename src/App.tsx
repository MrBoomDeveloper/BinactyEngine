import { createElement, useState } from "react";
import { StatusBar } from 'react-native';
import Splash from "@screens/Splash";
import Lobby2 from "@screens/Lobby/Lobby2";
import { Provider  } from "react-redux";
import { store } from "@context/store";
import { useMap } from "@util/hooks";
import Loading from '@screens/Loading';
import Lobby from '@screens/Lobby';
import GameOver from '@screens/GameOver';

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar hidden={true} />
			<Controller initial="splash" items={[
				{ name: "splash", element: Splash },
				{ name: "loading", element: Loading },
				{ name: "lobby", element: Lobby },
				{ name: "lobby2", element: Lobby2 },
				{ name: "gameover", element: GameOver }
			]} />
		</Provider>
	);
};

interface ControllerProps {
	initial: string,
	items: {
		name: string,
		element: any
	}[]
}

export type SetScreenProps = (name: string, props?: ObjectMap) => void;

export interface ObjectMap {
	[key: string]: any
}

function Controller({initial, items}: ControllerProps) {
	const [current, setCurrent] = useState(initial);
	const [allProps, setAllProps] = useState(new Map());

	const found = items.find(item => item.name == current)?.element || items[0] || null;

	return createElement(found, {
		setScreen: (name: string, props?: SetScreenProps) => {
			const newMap = new Map(allProps);
			newMap.set("__" + name + "_props", props);
			setAllProps(newMap);
			if(name != current) setCurrent(name);
		}, ...allProps.get("__" + current + "_props")
	});
}