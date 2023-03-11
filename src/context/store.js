import { configureStore } from "@reduxjs/toolkit";
import { gamemodesSlice } from "./gamemodes";
import { settingsSlice } from "./settings";
import { newsSlice } from "./news";

export const store = configureStore({
	reducer: {
		gamemodes: gamemodesSlice.reducer,
		settings: settingsSlice.reducer,
		news: newsSlice.reducer
	}
});