import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import preset from "@data/settings.json";
import { AppBridge } from "@native";

interface SettingsState {
	list: SettingsCategory[]
}

export interface SettingsCategory {
	title: string,
	id: string,
	data: SettingsItem[]
}

export interface SettingsItem {
	title?: string,
	id: string,
	type: string,
	value?: string | number | boolean,
	description?: string,
	restart?: boolean
}

interface SettingsUpdateAction {
	id: string,
	newValue: string | number | boolean,
	type: "string" | "boolean" | "int" | "float"
}

const initialState: SettingsState = { list: [] };

export const settingsSlice = createSlice({
	name: "SettingsSlice",
	initialState,
	reducers: {
		setup(state: SettingsState, {payload}: PayloadAction<SettingsItem[]>) {
			const result: SettingsCategory[] = JSON.parse(JSON.stringify(preset));

			for(const category of result) {
				for(const setting of category.data) {
					setting.value = payload.find(item => item.id == setting.id)?.value;
				}
			}
			
			state.list = result;
		},

		update(state: SettingsState, {payload: {id, newValue, type}}: PayloadAction<SettingsUpdateAction>) {
			for(const cat of state.list) {
				const setting = cat.data.find(item => item.id == id);
				if(setting != null) setting.value = newValue;
				AppBridge.setKey(type, id, newValue);
			}
		}
	}
});

export const { update, setup } = settingsSlice.actions;