import { View, Text, SectionList, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRef, useEffect, memo } from "react";
import * as constants from "@data/constants.json";
import { useAppDispatch, useAppSelector } from "@util/hooks";
import { GamemodesItem, GamemodesCategory, setActive } from "@context/gamemodes";
import { SetScreenProps } from "App";
import { openUrl } from "@util/redirect";
import Overview from "./home/Overview";

function Home({ setScreen }: { setScreen: SetScreenProps }) {
    const currentGamemode = useAppSelector(state => state.gamemodes.current);
	const allGamemodes = useAppSelector(state => state.gamemodes.list);
    const multiplayer = useAppSelector(state => state.gamemodes.multiplayer);
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
            <Image source={bannerBinary || {
                uri: banner || "asset:/packs/official/src/images/banner.jpg"
            }} style={styles.backgroundWallpaper} />

            {multiplayer.isInRoom 
                ? (<Overview gamemode={currentGamemode} setScreen={setScreen} />) 
                : (<SectionList sections={allGamemodes}
                    ref={scrollView}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                    ListHeaderComponent={() => <Overview gamemode={currentGamemode} setScreen={setScreen} />}
                    ListFooterComponent={End}
                    style={styles.layout}
                    keyExtractor={item => item.id}
                    renderItem={() => null}
                    renderSectionHeader={item => <Section {...item.section} />} />)
            }

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

const End = memo(() => {
    return (
        <View style={styles.endLayout}>
            <Text style={styles.endMessageLabel}>Thats all. You've reached the end.</Text>
        </View>
    )
});

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get("screen").width
    },

    backgroundWallpaper: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        position: "absolute",
        top: 0,
        left: 0
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

export default memo(Home);