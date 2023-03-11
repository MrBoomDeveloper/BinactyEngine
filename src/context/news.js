import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: []
}

export const newsSlice = createSlice({
	name: "NewsSlice",
	initialState,
	reducers: {
		load: (state, {payload}) => {
			state.value = payload;
		}
	}
});

export const { load } = newsSlice.actions;