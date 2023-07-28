import { View, Text, SectionList, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, Alert, Linking, Share, TextStyle, ViewStyle, Animated } from "react-native";
import { useRef, useEffect, useState } from "react";
import * as constants from "@data/constants.json";
import { useAppDispatch, useAppSelector } from "@util/hooks";
import { GamemodesItem, GamemodesState, GamemodesCategory, setActive, Level } from "@context/gamemodes";
import Button from "@components/Button";
import { SetScreenProps } from "App";
import { icons } from "@data/resources";
import { openUrl } from "@util/redirect";
import { LevelPreview, LevelsMenu } from "./Levels";

interface HomeProps {
    setScreen: SetScreenProps
}

export default function Home({setScreen}: HomeProps) {
    const currentGamemode = useAppSelector(state => state.gamemodes.current);
	const allGamemodes = useAppSelector(state => state.gamemodes.list);
    const scrollView = useRef(null);

    useEffect(() => {
        try {
            const list = scrollView.current as unknown as SectionList
            list.scrollToLocation({sectionIndex: 0, itemIndex: 0, viewPosition: 999});
        } catch(e) {
            console.error(e);
        }
        
    }, [currentGamemode]);

    const { bannerBinary, banner } = currentGamemode;

    return (
        <View>
            <Image source={bannerBinary || {uri: banner || "asset:/packs/official/src/images/banner.jpg"}} style={styles.backgroundWallpaper} />
            <SectionList sections={allGamemodes}
                ref={scrollView}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                ListHeaderComponent={() => <Overview gamemode={currentGamemode} setScreen={setScreen} />}
                ListFooterComponent={End}
                style={styles.layout}
                keyExtractor={item => item.id}
                renderItem={() => null}
                renderSectionHeader={item => <Section {...item.section} />} />

            <Image resizeMode="stretch"
                style={{width: "100%", height: 100, position: "absolute", top: 0, left: 0, transform: [{rotate: "180deg"}]}}
                source={require("@static/ui/gradientShadowBottomTop.png")} />
        </View>
    );
}

function Section({title, data, isCompact, id}: GamemodesCategory) {
    return (
        <View style={styles.sectionLayout}>
            {!isCompact && <View style={styles.sectionHeaderLayout}>
                <Text style={styles.sectionHeaderTitleLabel}>{title}</Text>
            </View>}
            
            <FlatList data={data} horizontal
                ListHeaderComponent={<View style={{width: constants.size.inlineScreenPadding}} />}
                ListFooterComponent={<View style={{width: constants.size.inlineScreenPadding}} />}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <GamemodeItem {...item} 
                            gamemode={{...item, row: id}}
                            isCompact={isCompact} />
                    );
                }} />
        </View>
    )
}

interface GamemodeItemProps extends GamemodesItem {
    gamemode: GamemodesItem
}

function GamemodeItem({name, banner, bannerBinary, isCompact, id, gamemode}: GamemodeItemProps) {
    const dispatch = useAppDispatch();

    return (
        <TouchableOpacity onPress={() => {
            if(id.startsWith("__ad")) {
                switch(id.substring(5)) {
                    case "discord":
                        openUrl("https://discord.com/invite/uCUp8TSCvw");
                        break;
                    
                    case "new_pack":
                        Alert.alert("not yet.");
                        break;
                    
                    case "tutorial":
                        Alert.alert("still under development");
                        break;
                }
                return;
            }

            dispatch(setActive(gamemode));
        }}>

            <View style={[styles.gamemodeLayout, isCompact && styles.gamemodeCompactLayout]}>
                <Image source={bannerBinary || {uri: banner || constants.resources.defaultGamemodeBanner}}
                    style={styles.gamemodeBanner} />
                
                {!isCompact && (<>
                    <Image resizeMode="stretch"
                        style={{position: "absolute", left: 0, bottom: -1, width: "100%", height: 50}}
                        source={require("@static/ui/gradientShadowBottomTop.png")} />

                    <Text style={styles.gamemodeName}>{name}</Text>
                </>)}
            </View>

        </TouchableOpacity>
    );
}

interface OverviewProps {
    setScreen: SetScreenProps,
    gamemode: GamemodesItem
}

function ExpandableText({text, style}: {
    text: string,
    style?: TextStyle
}) {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
            <Text style={style} numberOfLines={isExpanded ? 999 : 2}>{text}</Text>
        </TouchableOpacity>
    );
}

function Overview({gamemode, setScreen}: OverviewProps) {
    const { maps, banner, description, author, name, levels, entry, maxPlayers, time } = gamemode;
    const [isLevelsShown, setLevelsIsShown] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            useNativeDriver: false,
            duration: 250,
            toValue: isLevelsShown ? 1 : 0
        }).start();
    }, [animation, isLevelsShown]);

    const scrollAnimation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -Dimensions.get("screen").width]
    });

    const opacityAnimation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, .78]
    });

    return (
        <>
            <Animated.View style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: opacityAnimation
            }} />

            <Animated.View style={{flexDirection: "row", left: scrollAnimation}}>
                <Shadow />
                <View style={styles.overviewLayout}>
                    <View style={styles.overviewInfoLayout}>
                        <Text style={styles.overviewInfoDescriptionLabel}>Made by:  {author}</Text>
                        <Text style={styles.overviewInfoTitleLabel}>{name}</Text>
                        {description && <ExpandableText text={description} 
                            style={styles.overviewInfoDescriptionLabel} />}

                        {(maps != null || entry != null && maxPlayers > 0) && <OverviewActions 
                            gamemode={gamemode}
                            setScreen={setScreen} />}
                    </View>

                    {levels ? <LevelPreview levels={levels} gamemode={gamemode}
                        onPress={() => setLevelsIsShown(true)} /> : <View style={{flexGrow: 1}} />}

                    <View style={styles.aboutMatchRow}>
                        {time && <>
				            <Image style={{width: 16, height: 16}} source={require("@static/icon/time.png")} />
				            <Text style={styles.aboutMatchLabel}>Duration  {time}</Text>
                        </>}
                    
                        <Image style={{width: 20, height: 20, top: 1}} source={require("@static/icon/groups.png")} />
				        <Text style={styles.aboutMatchLabel}>{formatPlayersCount(maxPlayers)}</Text>
			        </View>
                </View>

                {levels && <LevelsMenu isShown={isLevelsShown} 
                    exit={() => setLevelsIsShown(false)}
                    gamemode={gamemode}
                    onSelect={() => setLevelsIsShown(false)}
                    levels={levels} />}
            </Animated.View>
        </>
    );
}

function formatPlayersCount(count: number) {
    if(count == 0) return "No players";
    if(count == 1) return "Max 1 player";
    return `Max ${count} players`;
}

function OverviewActions({gamemode, setScreen}: {
    gamemode: GamemodesItem,
    setScreen: SetScreenProps
}) {
    const isBeta: boolean = useAppSelector(state => state.settings.list)
        .find(cat => cat.id == "features")?.data
        .find(item => item.id == "beta")?.value as boolean;

    const progress = useAppSelector(state => state.gamemodes.progresses[gamemode.id].latestLevel);
	
	const level = gamemode.levels == null ? null :
        gamemode.levels.find(item => item.id == progress.category)?.data
            .find(item => item.id == progress.level) || gamemode.levels[0].data[0];
    
    return (
        <View style={styles.overviewActionsLayout}>
            <Button text="Start Game!" hitbox={0}
				style={{flexGrow: 1}}
				icon={require("@static/icon/play.png")}
				theme="brand"
				onPress={() => {
                    const map = gamemode.maps == null ? null : gamemode.maps[0].file;
                    setScreen("loading", {target: "game", args: {
                        ...gamemode, level,
                        enableEditor: false,
                        mapFile: map
                    }});
                }} />
                    
            {(isBeta && (gamemode.maxPlayers || 1) > 1) && <Button icon={icons["groups"].outlineBlack}
				theme="brand" rippleColor="#000000c0"
                hitbox={0} overlayInner={true}
				onPress={() => {
                    const map = gamemode.maps == null ? null : gamemode.maps[0].file;
                    setScreen("loading", {target: "game", args: {
                        ...gamemode, level,
                        enableEditor: false,
                        mapFile: map
                    }});
                }} styleIcon={{marginHorizontal: 5}} />}
					
			<Button icon={require("@static/icon/edit.png")}
				theme="brand" rippleColor="#000000c0"
                hitbox={0} overlayInner={true}
				onPress={() => {
                    const map = gamemode.maps == null ? null : gamemode.maps[0].file;
                    setScreen("loading", {target: "game", args: {
                        ...gamemode, level,
                        enableEditor: true,
                        mapFile: map
                    }});
                }} styleIcon={{marginHorizontal: 5}} />
        </View>
    );
}

function End() {
    return (
        <View style={styles.endLayout}>
            <Text style={styles.endMessageLabel}>Thats all. You've reached the end.</Text>
        </View>
    )
}

function Shadow() {
    return (
        <>
            <Image resizeMode="stretch"
			    style={styles.shadowLeft}
			    source={require("@static/ui/gradientShadowLeftRight.png")} />
            
            <Image resizeMode="stretch"
				style={styles.shadowBottom}
				source={require("@static/ui/gradientShadowBottomTop.png")} />
        </>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get("screen").width
    },

    backgroundWallpaper: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },

    shadowLeft: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: 350
    },

    shadowBottom: {
        position: "absolute",
        left: 0,
        bottom: 0,
        height: 100,
        width: "100%"
    },

    overviewLayout: {
        width: "100%",
        height: Dimensions.get("screen").height,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "flex-end"
    },

    overviewWallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },

    overviewInfoLayout: {
        height: "100%",
        width: 200,
        justifyContent: "flex-end",
        marginLeft: constants.size.inlineScreenPadding,
        paddingBottom: 25
    },

    overviewInfoTitleLabel: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
        marginVertical: 5,
        letterSpacing: .2
    },

    overviewInfoDescriptionLabel: {
        color: "#e7d9f5",
        opacity: .8,
        lineHeight: 20,
        letterSpacing: .4
    },

    overviewActionsLayout: {
        width: "100%",
        marginTop: 12,
        flexDirection: "row",
        gap: 5
    },

    aboutMatchRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 10,
        paddingRight: constants.size.inlineScreenPadding,
        paddingBottom: 25
	},
	
	aboutMatchLabel: {
		color: "white",
		fontSize: 14,
		marginRight: 10,
        letterSpacing: .3
	},

    sectionLayout: {
        paddingTop: 10,
        backgroundColor: "rgba(0, 0, 0, .78)"
    },

    sectionHeaderTitleLabel: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },

    sectionHeaderLayout: {
        paddingVertical: 15,
        paddingHorizontal: constants.size.inlineScreenPadding
    },

    gamemodeCompactLayout: {
        height: 50,
        width: 150
    },

    gamemodeLayout: {
        width: 175,
        height: 80,
        marginRight: 15,
        justifyContent: "flex-end"
    },

    gamemodeName: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 6,
        textShadowColor: "#000000",
        textShadowRadius: 5
    },

    gamemodeBanner: {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 5
    },

    endLayout: {
        width: "100%",
        paddingVertical: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .78)"
    },

    endMessageLabel: {
        color: "#d7cbe4",
        fontSize: 15
    }
});