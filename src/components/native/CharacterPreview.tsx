import { requireNativeComponent } from "react-native";

type ComponentType = (props: {
	src: string
}) => JSX.Element;

const CharacterPreviewNative = requireNativeComponent("RNCharacterPreview");

export default CharacterPreviewNative as any as ComponentType;