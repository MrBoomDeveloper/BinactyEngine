import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GamemodesState {
	current: GamemodesItem,
	list: GamemodesCategory[]
}

interface GamemodesItem {
	name: string,
	description: string,
	id: string,
	author: string,
	banner?: string,
	isCompact?: boolean
}

interface GamemodesCategory {
	title: string,
	id: string,
	data: GamemodesItem[]
}

const initialState: GamemodesState = {
	list: [],
	current: {
		name: "Loading...",
		description: "Loading...",
		id: "__loading",
		author: "Loading...",
	}
}

interface GamemodesLoadPayload {
	list: GamemodesCategory[],
	latest: string
}

interface LatestGamemode {
	row: string,
	item: string
}

export const gamemodesSlice = createSlice({
	name: "Gamemodes", initialState,
	reducers: {
		setActive: (state, {payload}) => {
			state.current = payload;
		},
		
		load: (state, {payload: {list, latest}}: PayloadAction<GamemodesLoadPayload>) => {
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
				const last: LatestGamemode = JSON.parse(latest);
				state.current = list
					.find(item => item.id == last.row)?.data
					.find(item => item.id == last.item) || list[0].data[0];
			} catch(e) {
				state.current = list[0].data[0];
			}
		}
	}
});

export const { setActive, load } = gamemodesSlice.actions;