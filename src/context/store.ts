import { configureStore } from "@reduxjs/toolkit";
import { gamemodesSlice } from "./gamemodes";
import { settingsSlice } from "./settings";
import { profileSlice } from "./profile";
import { packsSlice } from "./packs";
import { themeSlice } from "./theme";
import { popupSlice } from "./popup";

export const store = configureStore({
	reducer: {
		gamemodes: gamemodesSlice.reducer,
		settings: settingsSlice.reducer,
		profile: profileSlice.reducer,
		packs: packsSlice.reducer,
		theme: themeSlice.reducer,
		popup: popupSlice.reducer
	}
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;