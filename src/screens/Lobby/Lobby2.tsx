import { BackHandler, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { color } from "@data/constants.json";
import Header from "@components/layout/Header";
import Home from "./pages/Home";
import { useRef, useState, useMemo, useReducer, useEffect } from "react";
import { SetScreenProps } from "App";
import Creative from "./pages/Creative";
import { ProfileDrawer } from "@screens/modal/Profile";
import { NavigationProps } from "@components/layout/Navigation";
import { SettingsDrawer } from "@screens/modal/Settings";
import { AppBridge } from "@native";
import { NewsDrawer } from "@screens/modal/News";

interface LobbyProps {
    setScreen: SetScreenProps
}

export default function Lobby2({setScreen}: LobbyProps) {
    const [isProfileOpened, setProfileOpened] = useState(false);
    const [isNewsOpened, setNewsOpened] = useState(false);
    const [isSettingsOpened, setSettingsOpened] = useState(false);
    const scrollView = useRef<ScrollView>(null);

    useEffect(() => {
        const handler = BackHandler.addEventListener("hardwareBackPress", () => {
            AppBridge.exit();
            return true;
        });

        return () => handler.remove();
    }, []);

    const [pages, dispatchPages] = useReducer(pagesReducer, {
        current: "home",
        tabs: [
            { title: "Home", id: "home" },
            { title: "Character", id: "character" },
            { title: "Skills", id: "skills" },
            { title: "Creative", id: "creative" }
        ],

        onTabSelected(page, index) {
            scrollView.current?.scrollTo({x: Dimensions.get("screen").width * index, y: 0});
            dispatchPages({current: page.id});
        }
    });

    const actions = useMemo(() => {
        return [
            {
                id: "news",
                icon: require("@static/icon/news.png"),
                onPress: () => setNewsOpened(true)
            }, {
                id: "settings",
                icon: require("@static/icon/settings.png"),
                onPress: () => setSettingsOpened(true)
            }
        ]
    }, []);

    function pagesReducer(state: NavigationProps, action: NavigationProps) {
        return {...state, ...action};
    }

    return (
        <View style={styles.screen}>
            <Header navigation={pages} actions={actions}
                style={{position: "absolute", zIndex: 999}}
                onProfilePress={() => setProfileOpened(true)} />

            <ScrollView horizontal pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollView}
                style={styles.pagesLayout}>
                
                <Home setScreen={setScreen} />
                <Placeholder3 />
                <Placeholder />
                <Creative setScreen={setScreen} />
            </ScrollView>

            <ProfileDrawer isOpened={isProfileOpened} onClose={() => setProfileOpened(false)} />
            <NewsDrawer isOpened={isNewsOpened} onClose={() => setNewsOpened(false)} />
            <SettingsDrawer isOpened={isSettingsOpened} onClose={() => setSettingsOpened(false)} />
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