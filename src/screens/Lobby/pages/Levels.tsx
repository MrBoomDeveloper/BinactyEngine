import { GamemodesItem, Level, LevelsCategory, setActive, setActiveLevel } from "@context/gamemodes";
import { Image, SectionList, StyleSheet, Text, TouchableOpacity, View, BackHandler, Dimensions } from "react-native";
import * as constants from "@data/constants.json";
import { memo, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@util/hooks";

export const LevelsMenu = memo(({levels, exit, isShown, onSelect, gamemode}: {
	levels: LevelsCategory[],
	isShown: boolean,
	gamemode: GamemodesItem,
	onSelect: (level: Level) => void,
	exit: () => void
}) => {
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
});

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
	
	const level = useMemo(() => {
        if(levels == null) return { name: "Unknown", id: "" };

        const category = levels.find(item => item.id == progress.category)?.data;
        const level = category?.find(item => item.id == progress.level);

        return level || levels[0].data[0];
    }, [gamemode, progress]);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.levelPreviewLayout}>
                <View style={{gap: 4, flexGrow: 1}}>
                    <Text style={{color: "white", fontWeight: "500", fontFamily: "OpenSansRegular"}}>{level.name}</Text>
                    <Text style={{
                        color: "#c5bad1",
                        lineHeight: 20,
                        fontFamily: "OpenSansRegular",
                        fontSize: 13
                    }}>{level.description || "No description were provided."}</Text>
                </View>

                <Image source={require("@static/icon/expand.png")} style={[
					styles.LevelPreviewIcon,
					{ marginLeft: 10 }
				]} />
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
		flexDirection: "row",
		flexWrap: "wrap",
		width: Dimensions.get("screen").width
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

	cardBanner: {},

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