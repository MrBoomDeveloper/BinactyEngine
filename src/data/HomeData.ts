export const NavItems = [
	{
		label: "Home", key: "home", id: "home",
		icon: { active: require("@static/icon/home_active.png"), inactive: require("@static/icon/home.png") }
	}, 	{
		label: "Character", key: "character", id: "character",
		icon: { active: require("@static/icon/me_active.png"), inactive: require("@static/icon/me.png") }
	}, {
		label: "Skills", key: "skills", id: "skills",
		icon: { active: require("@static/icon/power_active.png"), inactive: require("@static/icon/power.png") }
	}, {
		label: "News", key: "logs", id: "logs",
		icon: require("@static/icon/news.png")
	}, {
		label: "About", key: "about", id: "about",
		icon: { active: require("@static/icon/info_active.png"), inactive: require("@static/icon/info.png") }
	}
];