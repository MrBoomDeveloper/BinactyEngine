import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: []
}

export const settingsSlice = createSlice({
	name: "SettingsSlice",
	initialState,
	reducers: {
		update: (state, {payload}) => {
			state.value[payload.index].initial = payload.newValue;
		},
		
		load: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { update, load } = settingsSlice.actions;