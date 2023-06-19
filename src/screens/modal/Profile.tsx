import { StyleSheet, View, Alert, Text, Image, SectionList, TouchableOpacity } from "react-native";
import * as constants from "@data/constants.json";
import Drawer, { SimpleDrawerProps } from "./Drawer";
import { useMemo } from "react";
import { AppBridge } from "@native";
import { Profile } from "@context/profile";
import { getAvatar } from "@data/resources";
import { useAppSelector, useAsyncMemo } from "@util/hooks";
import { openUrl } from "@util/redirect";

function ProfileButton({nick, avatar}: Profile) {
    return (
        <TouchableOpacity onPress={() => Alert.alert("Not available currently.")}>
            <View style={styles.profileLayout}>
                <Image style={styles.profileAvatar} source={getAvatar(avatar)} />
                <View style={{gap: 3}}>
                    <Text style={{color: "white", fontSize: 15, letterSpacing: .2}}>{nick}</Text>
                    <Text style={{color: "#cec0cd", letterSpacing: .2}}>Anonymous login</Text>
                </View>
                <Image style={styles.profileExpandIcon} source={require("@static/icon/expand.png")} />
            </View>
        </TouchableOpacity>
    );
}

export function ProfileDrawer(props: SimpleDrawerProps) {
    const profile = useAppSelector(state => state.profile.me);

    const actions = useMemo(() => {
        return [
            {
                title: "Account",
                data: [
                    { text: "Edit Details", icon: require("@static/icon/edit_white.png"), onPress() {
                        Alert.alert("Not available now!", "Coming soon...");
                    }},
                    { text: "Log Out", icon: require("@static/icon/logout_white.png"), onPress() {
                        Alert.alert("Not available now!", "Coming soon...");
                    }}
                ]
            }, {
                title: "Contact Us",
                data: [
                    { text: "Send Email", icon: require("@static/icon/email_white.png"), onPress() {
                        openUrl("mailto:binacty-contact@mrboomdev.ru");
                    }},
                    { text: "Join Discord", icon: require("@static/icon/discord_white.png"), onPress() {
                        openUrl("https://discord.com/invite/uCUp8TSCvw");
                    }}
                ]
            }
        ];
    }, []);

    const debugValues = useAsyncMemo(async () => await AppBridge.getDebug(), []);

	return (
        <Drawer width={275} direction="left" {...props}>
            <SectionList sections={actions}
                style={{paddingLeft: constants.size.inlineScreenPadding, paddingRight: 10}}
                contentContainerStyle={{paddingBottom: 25}}

                ItemSeparatorComponent={() => <View style={styles.divider} />}

                ListHeaderComponent={() => <ProfileButton {...profile} />}

                ListFooterComponent={() =>
                    <>
                        <Text style={styles.categoryTitleLabel}>About the Project</Text>

                        <TouchableOpacity onPress={() => openUrl("https://github.com/MrBoomDeveloper/PlatformerReact")}>
                            <Text style={styles.footerMessage}>
                                Created by MrBoomDev for free public use. 
                                Source code is available at:
                                https://github.com/MrBoomDeveloper/PlatformerReact
                            </Text>
                        </TouchableOpacity>

                        <Text style={[styles.categoryTitleLabel, {marginBottom: 12}]}>For Developers</Text>

                        {debugValues.map(({key, value}) =>
                            <View key={key} style={styles.footerDebugField}>
                                <Text style={[styles.footerDebugFieldLabel, {color: "#ccc2cb", fontWeight: "500"}]}>{key}:</Text>
                                <Text style={[styles.footerDebugFieldLabel]}>{value}</Text>
                            </View>)}
                    </>}
                    

                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={item.onPress}>
                            <View style={styles.buttonLayout}>
                                <Image style={styles.buttonIcon} source={item.icon} />
                                <Text style={styles.buttonLabel}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}

                renderSectionHeader={({section: {title}}) => {
                    return <Text style={styles.categoryTitleLabel}>{title}</Text>;
                }} />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    profileLayout: {
        backgroundColor: constants.color.surfaceLight,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#281b2b",
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 10,
        marginBottom: 4,
        alignItems: "center"
    },

    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 5
    },

    profileExpandIcon: {
        transform: [{rotate: "-90deg"}],
        opacity: .7,
        height: 32,
        resizeMode: "contain"
    },

    categoryTitleLabel: {
        color: "#b9acbe",
        fontWeight: "500",
        fontSize: 17,
        marginTop: 8,
        marginBottom: 2,
        marginLeft: 5,
        letterSpacing: .4
    },

    buttonLayout: {
        height: 52,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5
    },

    buttonIcon: {
        width: 22,
        height: 22,
        marginRight: 16,
        opacity: .7,
        resizeMode: "contain"
    },

    buttonLabel: {
        fontSize: 14,
        color: "#eee1ea",
        letterSpacing: .8
    },

    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#8d7f91",
        opacity: .2
    },

    footerMessage: {
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 4,
        color: "#cab7d1",
        fontSize: 12,
        letterSpacing: .2,
        width: "90%"
    },

    footerDebugField: {
        flexDirection: "row", 
        columnGap: 10, 
        marginLeft: 4, 
        paddingRight: 10, 
        flexWrap: "wrap",
        marginBottom: 4
    },

    footerDebugFieldLabel: {
        letterSpacing: .3,
        fontSize: 12,
        lineHeight: 20
    }
});