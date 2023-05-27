import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { color } from "@data/constants.json";
import Header from "@components/layout/Header";
import Home from "./pages/Home";
import { useRef, useState } from "react";

export default function Lobby2() {
    const [isScrollEnabled, setScrollEnabled] = useState(true);
    const scrollView = useRef<ScrollView>(null);

    return (
        <View style={styles.screen}>
            <Header style={{position: "absolute", zIndex: 999}} />

            <ScrollView horizontal pagingEnabled
                scrollEnabled={isScrollEnabled}
                ref={scrollView}
                style={styles.pagesLayout}>
                
                <Home setScrollEnabled={setScrollEnabled} />
                <Placeholder />
                <Placeholder3 />
                <Placeholder />
                <Placeholder3 />
                <Placeholder />
            </ScrollView>
        </View>
    );
}

const Placeholder = () => (<View style={[styles.pageLayout, {backgroundColor: "red"}]} />);
const Placeholder3 = () => (<View style={[styles.pageLayout, {backgroundColor: "blue"}]} />);

const styles = StyleSheet.create({
    screen: {
        backgroundColor: color.purpleBackground,
        flex: 1
    },

    pagesLayout: {
        height: Dimensions.get("window").height
    },

    pageLayout: {
        height: "100%",
        width: Dimensions.get("screen").width
    }
});