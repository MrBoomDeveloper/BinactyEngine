import { createSlice } from "@reduxjs/toolkit";

export const gamemodesSlice = createSlice({
	name: "Gamemodes",
	initialState: {
		current: { },
		list: []
	},
	
	reducers: {
		setActive: (state, {payload}) => {
			state.current = payload;
		},
		
		load: (state, {payload}) => {
			state.list = payload;
			state.list[1].data = [...state.list[1].data, {
				name: "Create Gamemode",
				description: "Turn your dreams into real!",
				id: "create",
				author: "You"
			}];
			state.current = payload[0].data[0];
		}
	}
});

export const { setActive, load } = gamemodesSlice.actions;