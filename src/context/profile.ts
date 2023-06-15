import { createSlice } from "@reduxjs/toolkit";

interface Currency {
	title: string,
	key: string,
	count: number,
	icon?: number
}

export interface Profile {
	nick: string,
	avatar: string,
	level: number,
	xp: number
}

interface ProfileState {
	money: Currency[],
	me: Profile
}

const initialState: ProfileState = {
	me: {
		nick: "Player",
		avatar: "klarrie",
		level: 1, 
		xp: 0
	},

	money: [
		{ key: "coins", title: "Coins", count: 0 },
		{ key: "diamonds", title: "Diamonds", count: 0 }
	]
}

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	
	reducers: {
		setProfile: (state, {payload}) => {
			state.me = payload;
		},
		
		setMoney: (state, {payload}) => {
			state.money = [
				{ key: "coins", title: "Coins", count: payload.coins, icon: require("@static/icon/coin.png") },
				{ key: "diamonds", title: "Diamonds", count: payload.diamonds, icon: require("@static/icon/diamond.png") }
			];
		}
	}
});

export const { setProfile, setMoney } = profileSlice.actions;