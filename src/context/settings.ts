import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import preset from "@data/settings.json";
import GameNative from "@native";

interface SettingsState {
	list: SettingsCategory[],
	old: any[]
}

export interface SettingsCategory {
	title: string,
	id: string,
	data: SettingsItem[]
}

export interface SettingsItem {
	title: string,
	id: string,
	type: string,
	value?: string | number | boolean,
	description?: string,
	restart?: boolean
}

type SettingsSetupAction = {
	title: string
	id: string,
	description?: string,
	type: "boolean" | "string" | "int" | "float", 
	initial: boolean | string | number, 
	restart?: boolean
}[];

interface SettingsUpdateAction {
	id: string,
	newValue: string | number | boolean,
	type: "string" | "boolean" | "int" | "float"
}

const initialState: SettingsState = {
	list: [],
	old: []
}

export const settingsSlice = createSlice({
	name: "SettingsSlice",
	initialState,
	reducers: {
		setup(state: SettingsState, {payload}: PayloadAction<SettingsSetupAction>) {
			const result: SettingsCategory[] = [...preset];
			for(const category of result) {
				for(const setting of category.data) {
					setting.value =  payload.find(item => item.id == setting.id)?.initial;
				}
			}
			state.list = result;
		},

		update(state: SettingsState, {payload: {id, newValue, type}}: PayloadAction<SettingsUpdateAction>) {
			for(const cat of state.list) {
				const setting = cat.data.find(item => item.id == id);
				if(setting != null) setting.value = newValue;
				GameNative.setKey(type, id, String(newValue));
			}
		},
		
		load(state: SettingsState, {payload}) {
			state.old = payload;
		}
	}
});

export const { update, load, setup } = settingsSlice.actions;