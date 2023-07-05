import Button from "@components/Button";
import Input from "@components/Input";
import { size } from "@data/constants.json";
import { PackBridge } from "@native";
import { SetScreenProps } from "App";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";

interface CreativeProps {
    setScreen: SetScreenProps
}

export default function Creative({setScreen}: CreativeProps) {
    function pick() {
        PackBridge.pickPack({
            source: "storage"
        }).then(pack => {
            Alert.alert("Yay!");
        });
    }

    return (
        <View style={styles.layout}>
            <View style={styles.header}>
                <Input placeholder="Search for installed packs..." 
                    style={styles.headerSearch}
                    align="left" />

                <Button text="Create a New Pack"
                    icon={require("@static/icon/plus.png")}
                    theme="brand" hitbox={0}
                    style={styles.headerButton}
                    onPress={() => {
                        PackBridge.createPack({name: "test", id: "123"});
                    }} />

                <Button text="Import from Storage"
                    icon={require("@static/icon/folder.png")}
                    styleIcon={{width: 22, height: 22, marginRight: 4}}
                    theme="brand" hitbox={0}
                    style={styles.headerButton}
                    onPress={() => pick()} />
            </View>
            
            <View style={{flexDirection: "row", gap: 15, marginVertical: 4}}>
                <Text>Installed: 0</Text>
                <Text>Active: 0</Text>
                <Text>Disabled: 0</Text>
            </View>
            
            
            <Button text="Back to old Lobby"
                theme="brand"
                onPress={() => {
                    setScreen("lobby2");
                }} />
        </View>
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
    }
});