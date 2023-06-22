import GameNative, { AppBridge } from "@native";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GamemodesState {
	current: GamemodesItem,
	list: GamemodesCategory[],
	progresses: Progresses
}

export type Progresses = Record<string, { latestLevel: { 
	category: string, 
	level: string 
} }>;

export interface GamemodesItem {
	name: string,
	description?: string,
	id: string,
	author: string,
	maps?: any[],
	entry?: string,
	time?: string,
	maxPlayers?: number,
	row?: string,
	banner?: string,
	levels?: LevelsCategory[],
	bannerBinary?: number,
	isCompact?: boolean
}

export interface LevelsCategory {
	title: string,
	id: string,
	data: Level[]
}

export interface Level {
	name: string,
	id: string,
	banner?: string,
	description?: string,
	time?: string
}

export interface GamemodesCategory {
	title: string,
	id: string,
	data: GamemodesItem[],
	isCompact?: boolean
}

const initialState: GamemodesState = {
	list: [],
	progresses: {},
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
		setActive(state, {payload}: PayloadAction<GamemodesItem>) {
			state.current = payload;
			GameNative.setKey("string", "latestGamemode", JSON.stringify({row: payload.row, item: payload.id}));
		},

		setActiveLevel(state, {payload: {gamemode, category, level}}: PayloadAction<{
			gamemode: GamemodesItem,
			category: LevelsCategory,
			level: Level
		}>) {
			const latest = state.progresses[gamemode.id].latestLevel = {
				category: category.id,
				level: level.id
			}

			AppBridge.setKey("string", "gm_" + gamemode.id + "__latestLevel", JSON.stringify({
				category: category.id,
				level: level.id
			}));
		},

		setupProgresses(state, {payload}: PayloadAction<Progresses>) {
			state.progresses = payload;
		},
		
		setupList(state, {payload: {list, latest}}: PayloadAction<GamemodesLoadPayload>) {
			state.list = list;
			state.list = [{
				title: "Other", isCompact: true,
				id: "__ad_section",
				data: [
					{
						name: "Create a New Pack",
						description: "Turn your dreams into real!",
						id: "__ad_new_pack",
						author: "You",
						bannerBinary: require("@static/banner/ad/create_pack.png")
					}, {
						name: "Join Discord",
						description: "Join our Discord Server to see all the news!",
						id: "__ad_discord",
						author: "None",
						bannerBinary: require("@static/banner/ad/discord.png")
					}, {
						name: "Tutorial",
						description: "Learn the basics of the game.",
						id: "__ad_tutorial",
						author: "MrBoomDev",
						bannerBinary: require("@static/banner/ad/tutorial.png")
					}
				]
			}, ...list];
			
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

export const { setActive, setupList, setActiveLevel, setupProgresses } = gamemodesSlice.actions;