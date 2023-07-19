import { Alert, Linking, Share } from "react-native";

const OPEN_URL_ERROR_MESSAGE =
	"It looks, that your browser app doesnt isn't ok right now, " +
	"but you can try sharing this link somewhere!";

export function openUrl(url: string) {
	if(!Linking.canOpenURL(url)) {
		Alert.alert("Can't open link", `${OPEN_URL_ERROR_MESSAGE} ${url}`, [{
			text: "Share link",
			onPress: () => Share.share({ message: url })
		}]);

		return;
	}

	Linking.openURL(url);
}