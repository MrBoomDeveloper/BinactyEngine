import { Alert, Linking, Share } from "react-native";

export function openUrl(url: string) {
	if(!Linking.canOpenURL(url)) {
		Alert.alert("Can't open link", "It looks, that your browser app doesnt isn't ok right now, but you can try sharing this link somewhere! " + url, [{
			text: "Share link",
			onPress: () => Share.share({ message: url })
		}]);

		return;
	}

	Linking.openURL(url);
}