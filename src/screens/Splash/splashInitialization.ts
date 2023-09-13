import { useAppDispatch, useTheme } from "@util/hooks";
import themes from "@data/themes.json";
import { Theme, setTheme } from "@context/theme";
import { useEffect } from "react";

export function useSplashInit() {
	const dispatch = useAppDispatch();

	async function init() {
		const requestedTheme = "dark_sakura";

		const themesList = themes as Record<string, Theme>;
		const foundTheme = themesList[requestedTheme];

		console.error(JSON.stringify(foundTheme));

		dispatch(setTheme(foundTheme || themes.dark_sakura));
	}

	useEffect(() => {
		init();
	}, []);
}