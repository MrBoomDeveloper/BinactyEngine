import { createSlice } from "@reduxjs/toolkit";

const maker = {
	name: "Map Editor",
	author: "You",
	description: "Create your own maps!",
	key: "editor", id: "editor"
}

export const gamemodesSlice = createSlice({
	name: "Gamemodes",
	initialState: {
		value: {
			current: { },
			list: []
		}
	},
	
	reducers: {
		setActive: (state, {payload}) => {
			state.value.current = payload;
		},
		
		load: (state, {payload}) => {
			state.value.list = payload;
			state.value.list.special = [maker, ...state.value.list.special];
			state.value.current = state.value.list["special"][1];
		}
	}
});

export const { setActive, load } = gamemodesSlice.actions;