import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import * as constants from "@data/constants.json";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SetScreenProps } from "App";
import { GamemodesItem } from "@context/gamemodes";
import Button from "@components/Button";
import { useAppSelector } from "@util/hooks";
import { LevelPreview, LevelsMenu } from "../Levels";
import { icons } from "@data/resources";
import { StatsBar } from "features/data/Stats";
import { formatPlayersCount } from "@util/format";
import ExpandableText from "features/data/ExpandableText";
import { FadingView } from "features/effects/FadingView";

function Overview({ gamemode, setScreen }: {
    setScreen: SetScreenProps,
    gamemode: GamemodesItem
}) {
    const { maps, description, author, name, levels, entry, maxPlayers, time } = gamemode;
    const [isLevelsShown, setLevelsIsShown] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            useNativeDriver: false,
            duration: 200,
            toValue: isLevelsShown ? 1 : 0
        }).start();
    }, [isLevelsShown]);

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
                <FadingView style={styles.layout} duration={450}>
                    <View style={styles.infoLayout}>
                        <Text style={styles.infoAuthorLabel}>Made by:  {author}</Text>

                        <Text style={styles.infoTitleLabel}>{name}</Text>

                        <StatsBar style={{marginTop: 4, marginBottom: 6}} items={[
                            ...(time != null ? [{ title: `Duration  ${time}`, icon: require("@static/icon/time.png") }] : []),
                            ...[{ title: formatPlayersCount(maxPlayers), icon: require("@static/icon/groups.png") }]
                        ]} />

                        {description && <ExpandableText text={description} 
                            style={[styles.infoDescriptionLabel, { color: "#f5ecf3" }]} />}

                        {(maps != null || entry != null && maxPlayers > 0) && <OverviewActions 
                            gamemode={gamemode}
                            setScreen={setScreen} />}
                    </View>

                    {levels ? <LevelPreview levels={levels} gamemode={gamemode}
                        onPress={() => setLevelsIsShown(true)} /> : <View style={{flexGrow: 1}} />}
                </FadingView>

                {levels && <LevelsMenu isShown={isLevelsShown} 
                    exit={() => setLevelsIsShown(false)}
                    gamemode={gamemode}
                    onSelect={() => setLevelsIsShown(false)}
                    levels={levels} />}
            </Animated.View>
        </>
    );
}

function OverviewActions({gamemode, setScreen}: {
    gamemode: GamemodesItem,
    setScreen: SetScreenProps
}) {
    const isBeta: boolean = useAppSelector(state => state.settings.list)
        .find(cat => cat.id == "features")?.data
        .find(item => item.id == "beta")?.value as boolean;

    const progress = useAppSelector(state => state.gamemodes.progresses[gamemode.id].latestLevel);
	
    const level = useMemo(() => {
        if(gamemode.levels == null) return null;

        const category = gamemode.levels.find(item => item.id == progress.category)?.data;
        const level = category?.find(item => item.id == progress.level);

        return level || gamemode.levels[0].data[0];
    }, [gamemode.levels, progress]);

    const play = useCallback((isEditor: boolean) => {
        const map = gamemode.maps == null ? null : gamemode.maps[0].file;

        setScreen("loading", { target: "game", args: {
            ...gamemode, level,
            enableEditor: isEditor,
            mapFile: map
        }});
    }, [gamemode, level]);
    
    return (
        <View style={styles.actionsLayout}>
            <Button text="Start Game!" theme="brand" style={{flexGrow: 1}}
				icon={require("@static/icon/play.png")}
                hitbox={0} onPress={() => play(false)} />
                    
            {(isBeta && gamemode.maxPlayers > 1) && (
                <Button icon={icons["groups"].outlineBlack} styleIcon={{marginHorizontal: 5}}
				    theme="brand" rippleColor="#000000c0" overlayInner={true}
                    hitbox={0} onPress={() => play(true)} />
            )}
					
			<Button icon={require("@static/icon/edit.png")} styleIcon={{marginHorizontal: 5}}
				theme="brand" rippleColor="#000000c0" overlayInner={true}
				hitbox={0} onPress={() => play(true)} />
        </View>
    );
}

const Shadow = memo(() => {
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
});

const styles = StyleSheet.create({
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
	
	layout: {
        width: "100%",
        height: Dimensions.get("screen").height,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "flex-end"
    },

    wallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },

    infoLayout: {
        height: "100%",
        width: 225,
        justifyContent: "flex-end",
        marginLeft: constants.size.inlineScreenPadding,
        paddingBottom: 25
    },

    infoAuthorLabel: {
        fontFamily: "OpenSansRegular",
        marginBottom: 4, 
        marginTop: 4, 
        color: "#f8adff"
    },

    infoTitleLabel: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: 24,
        lineHeight: 36,
        width: 250
    },

    infoDescriptionLabel: {
        color: "#f5ecf3",
        opacity: .95,
        lineHeight: 22,
        fontFamily: "OpenSansRegular"
    },

    actionsLayout: {
        width: "100%",
        marginTop: 12,
        flexDirection: "row",
        gap: 5
    }
});

export default memo(Overview);