import { configureStore } from "@reduxjs/toolkit";
import { gamemodesSlice } from "./gamemodes";
import { settingsSlice } from "./settings";
import { newsSlice } from "./news";
import { profileSlice } from "./profile";

export const store = configureStore({
	reducer: {
		gamemodes: gamemodesSlice.reducer,
		settings: settingsSlice.reducer,
		news: newsSlice.reducer,
		profile: profileSlice.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;