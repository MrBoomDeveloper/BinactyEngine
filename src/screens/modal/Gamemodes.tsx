import { View, Text } from "react-native";
import { Button, Header } from "@components";
import Dialog from "./Dialog";

export default function Gamemodes({visible, onClose}) {
	return (
		<Dialog visible={visible} onClose={onClose}>
			<Header title="Gamemodes" onClose={onClose} />
			<Text>So this menu will be filled in the future with a bunch of interestings gamemodes!</Text>
		</Dialog>
	)
}