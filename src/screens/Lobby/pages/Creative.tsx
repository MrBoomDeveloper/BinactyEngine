import Button from "@components/Button";
import Input from "@components/Input";
import { size } from "@data/constants.json";
import { PackBridge } from "@native";
import { useAppDispatch, useAppSelector } from "@util/hooks";
import { SetScreenProps } from "App";
import { View, StyleSheet, Dimensions, Text, Alert, SectionList, Image, TouchableOpacity, FlatList } from "react-native";
import * as constants from "@data/constants.json";
import { useState } from "react";
import { Pack } from "@context/packs";

interface CreativeProps {
    setScreen: SetScreenProps
}

export default function Creative({setScreen}: CreativeProps) {
    const packs = useAppSelector(state => state.packs.installed);
    const dispatch = useAppDispatch();

    async function pick() {
        return;

        try {
            const pack = await PackBridge.pickPack({ source: "storage" });
            Alert.alert(`Successfully picked a pack: ${pack.name}`);
        } catch(e) {
            Alert.alert("Failed to pick a pack.");
        }
    }

    return (
        <View style={styles.layout}>
            <SectionList sections={packs} 
                keyExtractor={item => item.id}
                style={{flex: 1}}
                renderItem={() => null}

                ListHeaderComponent={
                    <View style={styles.header}>
                        <Input placeholder="Search for installed packs..." 
                            style={styles.headerSearch}
                            align="left" />

                        <Button text="Create a New Pack"
                            icon={require("@static/icon/plus.png")}
                            theme="brand" hitbox={0}
                            style={styles.headerButton}
                            onPress={() => {
                                return;
                                PackBridge.createPack({name: "test", id: "123"});
                            }} />

                        <Button text="Import from Storage"
                            icon={require("@static/icon/folder.png")}
                            styleIcon={{width: 22, height: 22, marginRight: 4}}
                            theme="brand" hitbox={0}
                            style={styles.headerButton}
                            onPress={() => pick()} />
                    </View>
                }

                ListFooterComponent={<View style={{height: 25}} />}

                renderSectionHeader={({section}) => {
                    return <View>
                        <View style={{marginBottom: 12, marginTop: 16, gap: 12, flexDirection: "row", alignItems: "center"}}>
                            <Text style={{
                                color: "#f0e1ed", fontSize: 16, fontWeight: "500", letterSpacing: .2
                            }}>{section.title}:  {section.data.length}</Text>

                            <Text style={{
                                color: "#c0b1bdd7", fontSize: 13.3, letterSpacing: .1
                            }}>{section.description}</Text>
                        </View>

                        <FlatList data={section.data} 
                            numColumns={2} style={{gap: 10}}
                            columnWrapperStyle={{gap: 10}}
                            renderItem={({item}) => <PackCard {...item} />} />
                    </View>
                }} />
        </View>
    );
}

function PackCard({name, icon, description, author}: Pack) {
    return (
        <TouchableOpacity style={{flex: 1}}>
            <View style={styles.packLayout}>
                <View style={{flexDirection: "row", gap: 14, flexGrow: 1}}>
                    <Image style={styles.packIcon} source={{uri: icon ?? constants.resources.defaultGamemodeBanner}} />
                    <View style={{gap: 4, flexGrow: 1, flexShrink: 1}}>
                        <View style={{flexDirection: "row", gap: 12, alignItems: "center"}}>
                            <Text style={styles.packTitle}>{name}</Text>
                            <Text style={styles.packMeta}>Made by:  {author}</Text>
                        </View>
                        {(description != null) && <Text style={styles.packDescription}>{description}</Text>}
                    </View>

                    <Image source={require("@static/icon/expand.png")} style={{
                        opacity: .8, width: 45, height: 35, resizeMode: "contain"
                    }} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get("screen").width,
        paddingTop: 75,
        paddingHorizontal: size.inlineScreenPadding,
        gap: 10
    },

    header: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center"
    },

    headerSearch: {
        flexGrow: 1,
        paddingLeft: 15,
        marginRight: 5
    },
    
    headerButton: {
        paddingHorizontal: 15,
        height: 42
    },

    packLayout: {
        backgroundColor: constants.color.surfaceLight, 
        flex: 1,
        borderRadius: 8,
        borderWidth: 1, 
        borderColor: "#362436",
        padding: 10
    },

    packIcon: {
        width: 40,
        height: 40,
        resizeMode: "cover",
        borderRadius: 5
    },

    packTitle: {
        color: "white",
        letterSpacing: .3
    },

    packDescription: {
        letterSpacing: .3,
        color: "#cab9cc",
        lineHeight: 20,
        fontSize: 13
    },

    packMeta: {
        letterSpacing: .3,
        color: "#d8c7da",
        fontSize: 12
    }
});