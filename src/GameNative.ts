import { requireNativeComponent, NativeModules } from "react-native";

export const CustomViews = requireNativeComponent("CharacterView");
export const { GameNative, PackBridge, AppBridge } = NativeModules;
export default GameNative;