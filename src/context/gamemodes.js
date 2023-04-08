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
			state.list.push({
				title: "Other",
				data: [
					{
						name: "Create Gamemode",
						description: "Turn your dreams into real!",
						id: "create",
						author: "You",
						banner: "asset:/packs/core/src/banner/epic.jpg"
					}
				]
			});
			state.current = payload[0].data[0];
		}
	}
});

export const { setActive, load } = gamemodesSlice.actions;