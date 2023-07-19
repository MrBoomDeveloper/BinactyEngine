import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const REQUIRED_PACKS = "required";
const REGULAR_PACKS = "regular";

interface PacksState {
	installed: PacksCategory[]
}

export interface PacksCategory {
	title: string,
	description?: string,
	data: Pack[]
}

export interface Pack {
	name: string,
	source: string,
	config?: string,
	author?: string,
	id: string,
	description?: string,
	icon?: string,
	isRequired: boolean
}

const initialState: PacksState = {
	installed: []
}

export const packsSlice = createSlice({
	name: "Packs",
	initialState,
	reducers: {
		setup(state: PacksState, { payload }: PayloadAction<Pack[]>) {
			const categories = new Map<string, Pack[]>();

			function createAndAdd(key: string, value: Pack) {
				if(!categories.has(key)) categories.set(key, []);
				categories.get(key)?.push(value);
			}

			for(const pack of payload) {
				if(pack.isRequired) {
					createAndAdd(REQUIRED_PACKS, pack);
					continue;
				}

				createAndAdd(REGULAR_PACKS, pack);
			}

			state.installed = [];

			if(categories.get(REGULAR_PACKS)) {
				state.installed.push({
					title: "Installed packs",
					description: "You downloaded and installed them yourself",
					data: categories.get(REGULAR_PACKS) || []
				});
			}

			if(categories.get(REQUIRED_PACKS)) {
				state.installed.push({
					title: "System packs",
					description: "These are inside the application, so they cannot be removed.",
					data: categories.get(REQUIRED_PACKS) || []
				});
			}
		},

		add(state: PacksState, { payload }: PayloadAction<Pack>) {

		},

		remove(state: PacksState, { payload }: PayloadAction<Pack>) {
			
		},

		setActive(state: PacksState, { payload }: PayloadAction<Pack>) {
			
		}
	}
});

export const { setup } = packsSlice.actions;