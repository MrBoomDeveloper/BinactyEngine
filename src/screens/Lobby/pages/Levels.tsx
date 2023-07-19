import { GamemodesItem, Level, LevelsCategory, setActive, setActiveLevel } from "@context/gamemodes";
import { Image, SectionList, StyleSheet, Text, TouchableOpacity, View, BackHandler } from "react-native";
import * as constants from "@data/constants.json";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@util/hooks";

export function LevelsMenu({levels, exit, isShown, onSelect, gamemode}: {
	levels: LevelsCategory[],
	isShown: boolean,
	gamemode: GamemodesItem,
	onSelect: (level: Level) => void,
	exit: () => void
}) {
	useEffect(() => {
		if(!isShown) return;

		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			exit();
			return true;
		});

		return () => handler.remove();
	}, [isShown]);

	return (
		<View style={styles.layout}>
			<TouchableOpacity onPress={exit}>
				<View style={styles.exitButton}>
					<Image source={require("@static/icon/expand.png")} style={styles.exitIcon} />
					<Text style={styles.exitLabel}>Levels of {gamemode.name}</Text>
				</View>
			</TouchableOpacity>

			<SectionList sections={levels}
				style={styles.cardsHolder}

				renderItem={({item, section}) => <LevelCard gamemode={gamemode} 
					level={item}
					category={section}
					onSelect={onSelect} />} />
		</View>
	);
}

function LevelCard({level, onSelect, gamemode, category}: {
	level: Level,
	category: LevelsCategory,
	gamemode: GamemodesItem,
	onSelect: (level: Level) => void
}) {
	const dispatch = useAppDispatch();
	const banner = level.banner || gamemode.banner || constants.resources.defaultGamemodeBanner;

	return (
		<TouchableOpacity onPress={() => {
				dispatch(setActiveLevel({gamemode, level, category}));
				onSelect(level);
		}}>
			<View style={styles.card}>
				<View style={styles.cardLayout}>
					<Image source={{uri: banner}} style={{flex: 1}} />
				</View>
				<Text style={styles.cardTitle}>{level.name}</Text>
			</View>
		</TouchableOpacity>
	)
}

export function LevelPreview({levels, gamemode, onPress}: {
	levels: LevelsCategory[],
	gamemode: GamemodesItem,
	onPress: () => void
}) {
	const progress = useAppSelector(state => state.gamemodes.progresses[gamemode.id].latestLevel);
	
	const level: Level = levels == null 
        ? { name: "Unknown", id: "unknown" }
        : levels.find(item => item.id == progress.category)?.data
                .find(item => item.id == progress.level) || levels[0].data[0];

    return (
        <TouchableOpacity style={{flexGrow: 1}} onPress={onPress}>
            <View style={styles.levelPreviewLayout}>
                <View style={{gap: 4, flexGrow: 1}}>
                    <Text style={{color: "white", fontWeight: "500"}}>{level.name}</Text>
                    <Text style={{
                        color: "#c5bad1",
                        lineHeight: 20,
                        letterSpacing: .3,
                        fontSize: 13
                    }}>{level.description || "No description were provided."}</Text>
                </View>
                <Image source={require("@static/icon/expand.png")} style={styles.LevelPreviewIcon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
	layout: {
		paddingVertical: 75
	},

	cardsHolder: {
		gap: 12,
		paddingTop: 10,
		paddingHorizontal: constants.size.inlineScreenPadding - 12,
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap"
	},

	card: {
		gap: 10,
		marginBottom: 10
	},

	cardLayout: {
		width: 175,
		height: 80,
		backgroundColor: "black",
		borderRadius: 10,
		overflow: "hidden"
	},

	cardBanner: {

	},

	cardTitle: {
		color: "white",
		fontWeight: "500",
		fontSize: 16,
		letterSpacing: .3
	},

	exitButton: {
		flexDirection: "row", 
		gap: 2, 
		alignItems: "center", 
		marginLeft: constants.size.inlineScreenPadding - 30,
		padding: 15
	},

	exitLabel: {
		color: "white", 
		fontWeight: "500", 
		fontSize: 16,
		letterSpacing: .3
	},

	exitIcon: {
		resizeMode: "contain",
		width: 30, 
		height: 30,
		transform: [{ rotate: "90deg" }]
	},

	levelPreviewLayout: {
        marginBottom: 25,
        marginHorizontal: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },

    LevelPreviewIcon: {
        gap: 10,
        width: 25,
        height: 25,
        resizeMode: "contain",
        transform: [{ rotate: "-90deg" }]
    },
});