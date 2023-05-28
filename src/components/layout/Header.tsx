import Button from "@components/Button";
import { Alert, Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import { size } from "@data/constants.json";

const profile: ProfileProps = {
    name: "MrBoomDev"
}

interface HeaderProps {
    style?: ViewStyle
}

export default function Header({style}: HeaderProps) {
    return (
        <View style={[styles.layout, style]}>
            <Profile {...profile} />

            <View style={styles.navigationLayout}>
                <Text>Center</Text>
            </View>

            <View style={styles.actionsLayout}>
                <Button theme="popup" fill={true}
                    overlayInner={true}
                    icon={require("@static/icon/settings.png")} 
                    onPress={() => Alert.alert("soon")} />
            </View>
        </View>
    )
}

interface ProfileProps {
    name: string
}

function Profile({name}: ProfileProps) {
    return (
        <View style={styles.profileLayout}>
            <Image source={require("@static/avatar/premium.jpg")} style={styles.profileAvatar} />
            <Text style={styles.profileName}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        paddingHorizontal: size.inlineScreenPadding
    },

    profileLayout: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        width: 100
    },

    profileAvatar: {
        height: 40,
        width: 40,
        borderColor: "black",
        borderWidth: 1
    },

    profileName: {
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 4
    },

    navigationLayout: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    actionsLayout: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        width: 100
    }
});