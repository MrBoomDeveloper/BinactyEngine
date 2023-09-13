import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import themes from "@data/themes.json";

export interface Theme {
	name?: string,
	colors: {
		primaryButtonBackground?: string,
		popupButtonBackground?: string,
		screenBackground?: string
	}
}

function copyDefaultTheme() {
	return JSON.parse(JSON.stringify(themes.amoled));
}

export const themeSlice = createSlice({
	name: "theme",
	initialState: copyDefaultTheme(),

	reducers: {
		setTheme(state: Theme, {payload}: PayloadAction<Theme>) {
			return {
				...copyDefaultTheme(),
				...payload
			};
		}
	}
});

export const { setTheme } = themeSlice.actions;