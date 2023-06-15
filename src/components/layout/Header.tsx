import Button from "@components/Button";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle, ImageSourcePropType } from "react-native";
import { size } from "@data/constants.json";
import Navigation, { NavigationProps } from "@components/layout/Navigation";
import { useAppSelector } from "@util/hooks";
import { getAvatar } from "@data/resources";

interface HeaderProps {
    onProfilePress: () => void,
    style?: ViewStyle,
    actions?: Action[],
    navigation?: NavigationProps
}

interface Action {
    id: string,
    icon: ImageSourcePropType,
    onPress: () => void
}

export default function Header({style, onProfilePress, navigation, actions}: HeaderProps) {
    return (
        <View style={[styles.layout, style]}>
            <Profile onPress={onProfilePress} />

            {navigation && <View style={styles.navigationLayout}>
                <Navigation {...navigation} />
            </View>}

            {(!navigation) && <View style={{flexGrow: 1}} />}

            {actions && <View style={styles.actionsLayout}>
                {actions.map(item =>
                    <Button theme="popup" fill={true}
                        hitbox={0}
                        key={item.id}
                        overlayInner={true}
                        icon={item.icon}
                        onPress={item.onPress} />
                )}
            </View>}
        </View>
    )
}

export function Profile({onPress}: {onPress: () => void}) {
    const { nick, avatar, level, xp } = useAppSelector(state => state.profile.me);

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.profileLayout}>
                <Image source={getAvatar(avatar)} style={styles.profileAvatar} />
                <Text style={styles.profileName}>{nick}</Text>
            </View>
        </TouchableOpacity>
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
        width: 100,
        gap: 8
    }
});