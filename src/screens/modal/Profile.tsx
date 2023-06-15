import { StyleSheet, View, Alert, Text, Image, SectionList, TouchableOpacity } from "react-native";
import * as constants from "@data/constants.json";
import Drawer, { SimpleDrawerProps } from "./Drawer";
import { useEffect, useMemo, useState } from "react";
import { AppBridge, DebugField } from "@native";
import { Profile } from "@context/profile";
import { getAvatar } from "@data/resources";
import { useAppSelector } from "@util/hooks";

function ProfileButton({nick, avatar}: Profile) {
    return (
        <View style={styles.profileLayout}>
            <Image style={styles.profileAvatar} source={getAvatar(avatar)} />
            <View style={{gap: 3}}>
                <Text style={{color: "white", fontSize: 15}}>{nick}</Text>
                <Text style={{color: "#dadada"}}>Anonymous login</Text>
            </View>
        </View>
    );
}

export function ProfileDrawer(props: SimpleDrawerProps) {
    const profile = useAppSelector(state => state.profile.me);
    const [debug, setDebug] = useState<DebugField[]>([]);

    useEffect(() => {
        (async function() {
            setDebug(await AppBridge.getDebug());
        })();
    }, []);

    const actions = useMemo(() => {
        return [
            {
                title: "Account",
                data: [
                    { text: "Edit Details", onPress() {
                        Alert.alert("Not available now!", "Coming soon...");
                    } }
                ]
            }
        ];
    }, []);

	return (
        <Drawer width={300} direction="left" {...props}>
            <SectionList sections={actions}
                style={{paddingLeft: constants.size.inlineScreenPadding, paddingRight: 10}}
                ListHeaderComponent={() => <ProfileButton {...profile} />}
                ListFooterComponent={() => {
                    return (<View>
                        {debug.map(({key, value}) => {
                            return (
                                <Text key={key}>{key}:  {value}</Text>
                            );
                        })}
                    </View>);
                }}
                renderItem={({item}) => <Button text={item.text} onPress={item.onPress} />} />
        </Drawer>
    );
}

function Button({text, onPress}: {text: string, onPress: () => void}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonLayout}>
                <Text style={styles.buttonLabel}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileLayout: {
        backgroundColor: constants.color.surfaceLight,
        borderRadius: 10,
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 10
    },

    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 5
    },

    categoryTitleLayout: {
        backgroundColor: "rgba(0, 0, 0, .3)",
        paddingLeft: constants.size.inlineScreenPadding
    },

    categoryTitleLabel: {
        color: "white",
        fontSize: 20,
        marginVertical: 16,
        marginRight: 20,
        textAlign: "center"
    },

    actionsLayout: {
        paddingLeft: constants.size.inlineScreenPadding,
        padding: 20,
        paddingVertical: 15,
        gap: 8
    },

    buttonLayout: {
        height: 45,
        backgroundColor: constants.color.surfaceLight,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },

    buttonLabel: {
        fontSize: 15,
        color: "white"
    }
});