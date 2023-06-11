import { View, Text, SectionList, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, Alert, Linking, Share } from "react-native";
import { useRef, useEffect } from "react";
import { size } from "@data/constants.json";
import { useAppDispatch, useAppSelector } from "@util/hooks";
import { GamemodesItem, GamemodesState, GamemodesCategory, setActive } from "@context/gamemodes";
import Button from "@components/Button";
import { SetScreenProps } from "App";

interface HomeProps {
    setScreen: SetScreenProps
}

export default function Home({setScreen}: HomeProps) {
    const gamemodes: GamemodesState = useAppSelector(state => state.gamemodes);
    const scrollView = useRef(null);

    useEffect(() => {
        const list = scrollView.current as unknown as SectionList
        list.scrollToLocation({sectionIndex: 0, itemIndex: 0, viewPosition: 10})
    }, [gamemodes.current]);

    const { bannerBinary, banner } = gamemodes.current;

    return (
        <View>
            <Image source={bannerBinary || {uri: banner || "asset:/packs/official/src/images/banner.jpg"}} style={styles.backgroundWallpaper} />
            <SectionList sections={gamemodes.list}
                ref={scrollView}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                ListHeaderComponent={() => <Overview gamemode={gamemodes.current} setScreen={setScreen} />}
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
                ListHeaderComponent={<View style={{width: size.inlineScreenPadding}} />}
                ListFooterComponent={<View style={{width: size.inlineScreenPadding}} />}
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
                        const url = "https://discord.com/invite/uCUp8TSCvw";
                        if(!Linking.canOpenURL(url)) {
                            Alert.alert("Can't open link", "It looks, that your browser app doesnt isn't ok right now, but you can try sharing this link somewhere! " + url, [{
                                text: "Share link",
                                onPress: () => Share.share({
                                    message: "Check out the BoomTeam Discord Server! " + url
                                })
                            }]);
                            return;
                        }
                        
                        Linking.openURL(url);
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
                <Image source={bannerBinary || {uri: banner || "asset:/packs/official/src/images/banner.jpg"}}
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

function Overview({gamemode, setScreen}: OverviewProps) {
    const { author, name, description } = gamemode;

    return (
        <View style={styles.overviewLayout}>
            <Shadow />
            <View style={styles.overviewInfoLayout}>
                <Text style={styles.overviewInfoDescriptionLabel}>Made by:  {author}</Text>
                <Text style={styles.overviewInfoTitleLabel}>{name}</Text>
                {description && <Text numberOfLines={3} style={styles.overviewInfoDescriptionLabel}>{description}</Text>}

                {(gamemode.maps != null || gamemode.entry != null) && <View style={styles.overviewActionsLayout}>
                    <Button text="Start Game!" hitbox={0}
						style={{flexGrow: 1}}
						icon={require("@static/icon/play.png")}
						theme="brand" fill={true}
						onPress={() => {
                            const map = gamemode.maps == null ? null : gamemode.maps[0].file;
                            setScreen("loading", {target: "game", args: {
                                ...gamemode,
                                enableEditor: false,
                                mapFile: map
                            }});
                        }} />
					
					<Button icon={require("@static/icon/edit.png")}
						theme="brand" fill={true} rippleColor="black"
                        hitbox={0} overlayInner={true}
						onPress={() => {
                            const map = gamemode.maps == null ? null : gamemode.maps[0].file;
                            setScreen("loading", {target: "game", args: {
                                ...gamemode,
                                enableEditor: true,
                                mapFile: map
                            }});
                        }}
						styleIcon={{marginHorizontal: 5}} />
                </View>}
            </View>

            <View style={styles.aboutMatchRow}>
                {gamemode.time && <>
				     <Image style={{width: 16, height: 16}} source={require("@static/icon/time.png")} />
				     <Text style={styles.aboutMatchLabel}>Duration  {gamemode.time}</Text>
                </>}
                    
                {gamemode.maxPlayers && <>
				    <Image style={{width: 20, height: 20, top: 1}} source={require("@static/icon/groups.png")} />
				    <Text style={styles.aboutMatchLabel}>Max {gamemode.maxPlayers > 1 ? `${gamemode.maxPlayers} players` : "1 player"}</Text>
                </>}
			</View>
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
        flexDirection: "row"
    },

    overviewWallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    overviewInfoLayout: {
        height: "100%",
        width: 350,
        justifyContent: "flex-end",
        paddingHorizontal: size.inlineScreenPadding,
        paddingBottom: 25
    },

    overviewInfoTitleLabel: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
        marginVertical: 5
    },

    overviewInfoDescriptionLabel: {
        color: "#d7cbe4",
        lineHeight: 20,
        width: "85%"
    },

    overviewActionsLayout: {
        width: 200,
        marginTop: 12,
        flexDirection: "row",
        gap: 5
    },

    aboutMatchRow: {
		flexDirection: "row",
		alignItems: "flex-end",
        justifyContent: "flex-end",
		gap: 10,
        flexGrow: 1,
        paddingRight: size.inlineScreenPadding,
        paddingBottom: 25
	},
	
	aboutMatchLabel: {
		color: "white",
		fontSize: 14,
		marginRight: 10
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
        paddingHorizontal: size.inlineScreenPadding
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