import { View, Text, SectionList, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from "react-native";
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

    return (
        <SectionList sections={gamemodes.list}
            ref={scrollView}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <Overview gamemode={gamemodes.current} setScreen={setScreen} />}
            ListFooterComponent={End}
            style={styles.layout}
            keyExtractor={item => item.id}
            renderItem={() => null}
            renderSectionHeader={item => <Section {...item.section} />} />
    );
}

function Section({title, data, isCompact, id}: GamemodesCategory) {
    return (
        <View style={styles.sectionLayout}>
            {!isCompact && <View style={styles.sectionHeaderLayout}>
                <Text style={styles.sectionHeaderTitleLabel}>{title}</Text>
            </View>}
            <FlatList data={data} horizontal
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

function GamemodeItem({name, banner, author, isCompact, gamemode}: GamemodeItemProps) {
    const dispatch = useAppDispatch();

    return (
        <TouchableOpacity onPress={() => {
            dispatch(setActive(gamemode));
        }}>

            <View style={[styles.gamemodeLayout, isCompact && styles.gamemodeCompactLayout]}>
                <Image source={{uri: banner || "asset:/packs/core/src/banner/epic.jpg"}}
                    style={styles.gamemodeBanner} />
                
                <Text>{name}</Text>
            </View>

        </TouchableOpacity>
    );
}

interface OverviewProps {
    setScreen: SetScreenProps,
    gamemode: GamemodesItem
}

function Overview({gamemode, setScreen}: OverviewProps) {
    return (
        <View style={styles.overviewLayout}>
            <Image source={{uri: gamemode.banner || "asset:/packs/core/src/banner/epic.jpg"}} style={styles.overviewWallpaper} />
            <Shadow />

            <View style={styles.overviewInfoLayout}>
                <Text style={styles.overviewInfoDescriptionLabel}>Made by:  {gamemode.author}</Text>
                <Text style={styles.overviewInfoTitleLabel}>{gamemode.name}</Text>
                <Text style={styles.overviewInfoDescriptionLabel}>{gamemode.description}</Text>
                <View style={styles.overviewActionsLayout}>

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

                </View>
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
        marginBottom: 25
    },

    overviewWallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    overviewInfoLayout: {
        marginTop: 10,
        height: "100%",
        width: 350,
        justifyContent: "center",
        paddingHorizontal: size.inlineScreenPadding
    },

    overviewInfoTitleLabel: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
        marginVertical: 5
    },

    overviewInfoDescriptionLabel: {
        color: "#d7cbe4",
        lineHeight: 20
    },

    overviewActionsLayout: {
        width: 200,
        marginTop: 12,
        flexDirection: "row",
        gap: 5
    },

    sectionLayout: {
        paddingHorizontal: size.inlineScreenPadding,
        marginBottom: 10
    },

    sectionHeaderTitleLabel: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },

    sectionHeaderLayout: {
        paddingVertical: 15
    },

    gamemodeCompactLayout: {
        height: 50,
        width: 150
    },

    gamemodeLayout: {
        width: 175,
        height: 80,
        marginRight: 15,
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
        alignItems: "center"
    },

    endMessageLabel: {
        color: "#d7cbe4",
        fontSize: 15
    }
});