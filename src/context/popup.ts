import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PopupState {
	current?: {
		element: JSX.Element,
		x: number,
		y: number
	}
}

const initialState: PopupState = {

}

export const popupSlice = createSlice({
	name: "popup",
	initialState,

	reducers: {
		setCurrentPopup(state, {payload}: PayloadAction<PopupState["current"]>) {
			return {
				...state,
				current: payload
			};
		},

		clear(state) {
			return {};
		}
	}
});

export const { setCurrentPopup, clear } = popupSlice.actions;