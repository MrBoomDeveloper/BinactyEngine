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
		
		load: (state, {payload: {list, latest}}) => {
			state.list = list;
			state.list.push({
				title: "Other",
				id: "723e7b6e-d6bd-11ed-afa1-0242ac120002",
				data: [
					{
						name: "Create New Pack",
						description: "Turn your dreams into real!",
						id: "723e7894-d6bd-11ed-afa1-0242ac120002",
						author: "You",
						banner: "asset:/packs/core/src/banner/epic.jpg"
					}, {
						name: "Tutorial",
						description: "Learn the basics of the game.",
						id: "8724e112-d6cc-11ed-afa1-0242ac120002",
						author: "MrBoomDev"
					}
				]
			});
			try {
				latest = JSON.parse(latest);
				state.current = list
					.find(item => item.id == latest.row).data
					.find(item => item.id == latest.item);
			} catch(e) {
				console.error(e);
				state.current = list[0].data[0];
			}
		}
	}
});

export const { setActive, load } = gamemodesSlice.actions;