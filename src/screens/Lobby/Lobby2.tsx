import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { color } from "@data/constants.json";
import Header from "@components/layout/Header";
import Home from "./pages/Home";
import { useEffect, useRef, useState } from "react";
import { ObjectMap, SetScreenProps } from "App";
import Creative from "./pages/Creative";

const pageIndexes: ObjectMap = {
    home: 0,
    character: 1,
    creative: 2
}

interface LobbyProps {
    setScreen: SetScreenProps
}

export default function Lobby2({setScreen}: LobbyProps) {
    const scrollView = useRef<ScrollView>(null);

    return (
        <View style={styles.screen}>
            <Header style={{position: "absolute", zIndex: 999}} />

            <ScrollView horizontal pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={scrollView}
                style={styles.pagesLayout}>
                
                <Home setScreen={setScreen} />
                <Placeholder3 />
                <Creative setScreen={setScreen} />
                <Placeholder />
                <Placeholder3 />
            </ScrollView>
        </View>
    );
}

const Placeholder = () => (<View style={[styles.pageLayout, {backgroundColor: "#ff000016"}]} />);
const Placeholder3 = () => (<View style={[styles.pageLayout, {backgroundColor: "#0000ff1f"}]} />);

const styles = StyleSheet.create({
    screen: {
        backgroundColor: color.purpleBackground,
        flex: 1
    },

    pagesLayout: {
        height: Dimensions.get("window").height,
    },

    pageLayout: {
        height: "100%",
        width: Dimensions.get("screen").width
    }
});