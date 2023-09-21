import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Splash from "@screens/Splash";
import Lobby2 from "@screens/Lobby/Lobby2";
import { Provider as ReduxContainer } from "react-redux";
import { store } from "@context/store";
import Loading from '@screens/Loading';
import PopupContainer from "@components/layout/PopupHolder";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import themes from "@data/themes.json";
import { ErrorBoundary } from 'react-error-boundary';
import Button from '@components/Button';
import { useCallback, useState } from 'react';
import * as constants from "@data/constants.json";
import { useAsyncMemo } from '@util/hooks';
import { AppBridge } from '@native';

export type NavigationTypes = {
	splash: undefined,
	lobby: undefined,

	loading: {
		target: "lobby" | "game",
		args?: any
	}
}

declare global {
	namespace ReactNavigation {
		interface RootParamList extends NavigationTypes {}
	}
}

const Stack = createNativeStackNavigator<NavigationTypes>();

const stackOptions: NativeStackNavigationOptions = {
	headerShown: false,
	animation: "fade",
	animationTypeForReplace: "push"
}

function Error({ error, reset }: { error: Error, reset: () => void }) {
	const deviceInfo = useAsyncMemo(async () => await AppBridge.getDebugMap(), null);

	return (
		<ScrollView>
			<View style={styles.errorScreen}>
				<View style={{flexDirection: "row", gap: 50, alignItems: "center"}}>
					<View style={{gap: 6, flexGrow: 1}}>
						<Text style={styles.errorTitle}>Oops... Something just got wrong with the game UI...</Text>
						<Text selectable selectionColor="rgba(100, 100, 100, .8)" style={styles.errorDetail}>Try to reopen an app, or else send a screenshot of this screen to: bugs@mrboomdev.ru</Text>
					</View>

					<Button text="Try to restart" theme="brand"  
						onPress={() => reset()} style={styles.errorButton} />
				</View>

				<View style={styles.errorHr} />

				<Text selectable selectionColor="rgba(100, 100, 100, .8)">
					<ErrorLine title="Device info" value={JSON.stringify(deviceInfo ?? "Loading...")} /> {"\n"}
					<ErrorLine title="Error name" value={error.name} /> {"\n"}
					<ErrorLine title="Error message" value={error.message} /> {"\n"}
					<ErrorLine title="Error stacktrace" value={error.stack ?? "No stacktrace was provided."} />
				</Text>
				
			</View>
		</ScrollView>
	);
}

function ErrorLine({title, value}: {title: string, value: string}) {
	while(value.includes("index.bundle//&")) {
		value = value.replace("index.bundle//&", "index.bundle/?");
	}

	return (
		<Text style={styles.errorDetail}>
			<Text style={{color: "#f1e5f3", fontWeight: "500"}}>{title}:</Text>
			{"  " + value}
		</Text>
	);
}

export default function App() {
	const [a, setA] = useState(0);

	const reset = useCallback(() => {
		setA(Math.random());
	}, []);

	return (
		<ErrorBoundary onReset={() => reset()} fallbackRender={(event) => (
			<Error error={event.error} 
				reset={event.resetErrorBoundary} />
			)}>
			
			<ReduxContainer store={store}>
				<StatusBar hidden={true} />

				<PopupContainer>
					<NavigationContainer theme={{dark: true, colors: {...DarkTheme.colors, background: "black"}}}>
						<Stack.Navigator initialRouteName="splash" screenOptions={stackOptions}>
							<Stack.Screen name="splash" component={Splash} />
							<Stack.Screen name="loading" component={Loading} />
							<Stack.Screen name="lobby" component={Lobby2} />
						</Stack.Navigator>
					</NavigationContainer>
				</PopupContainer>
			</ReduxContainer>
		</ErrorBoundary>
	);
};

const styles = StyleSheet.create({
	errorScreen: {
		paddingVertical: 50, 
		paddingHorizontal: constants.size.inlineScreenPadding,
		backgroundColor: themes.dark_sakura.colors.screenBackground,
		gap: 4
	},

	errorTitle: {
		color: "white", 
		fontWeight: "500", 
		fontSize: 18
	},

	errorHr: {
		width: "100%", 
		height: 1, 
		backgroundColor: "rgba(200, 200, 200, .2)",
		marginVertical: 12
	},

	errorButton: {
		width: 175,
		height: 40
	},

	errorDetail: {
		lineHeight: 25,
		letterSpacing: .4,
		color: "#ddcfdf"
	}
});