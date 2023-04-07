import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
	name: "profile",
	initialState: {
		value: {
			me: {
				name: "Player",
				avatar: "klarrie",
				level: 1, xp: 0
			},
			money: [
				{ key: "coins", title: "Coins", count: 0 },
				{ key: "diamonds", title: "Diamonds", count: 0 }
			]
		}
	},
	reducers: {
		setProfile: (state, {payload}) => {
			state.value.me = payload;
		},
		
		setMoney: (state, {payload}) => {
			state.value.money = [
				{ key: "coins", title: "Coins", count: payload.coins, icon: require("@static/icon/coin.png") },
				{ key: "diamonds", title: "Diamonds", count: payload.diamonds, icon: require("@static/icon/diamond.png") }
			];
		}
	}
});

export const { setProfile, setMoney } = profileSlice.actions;