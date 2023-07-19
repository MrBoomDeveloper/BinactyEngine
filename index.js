import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";

LogBox.ignoreLogs([
	"`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead."
]);

AppRegistry.registerComponent("App", () => App);