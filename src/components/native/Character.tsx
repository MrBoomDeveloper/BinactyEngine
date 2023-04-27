import { useEffect, useRef } from "react";
import { PixelRatio, UIManager, findNodeHandle } from "react-native";
import { CustomViews } from "@native";

function createFragment(viewId) {
	return UIManager.dispatchViewManagerCommand(viewId,
		UIManager.CharacterView.Commands.create.toString(),
		[viewId])
}

export default function Character() {
	const ref = useRef(null);

	useEffect(() => {
		const viewId = findNodeHandle(ref.current);
		createFragment(viewId);
	}, []);

	return (
		<CustomViews
			style={{
				height: PixelRatio.getPixelSizeForLayoutSize(200),
				width: PixelRatio.getPixelSizeForLayoutSize(200)
			}}
			ref={ref}
		/>
	);
};