import { configureStore } from "@reduxjs/toolkit";
import { gamemodesSlice } from "./gamemodes";
import { settingsSlice } from "./settings";
import { profileSlice } from "./profile";

export const store = configureStore({
	reducer: {
		gamemodes: gamemodesSlice.reducer,
		settings: settingsSlice.reducer,
		profile: profileSlice.reducer
	}
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;