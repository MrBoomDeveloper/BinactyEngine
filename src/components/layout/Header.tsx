import Button from "@components/Button";
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle, ImageSourcePropType } from "react-native";
import { size } from "@data/constants.json";
import Navigation, { NavigationProps } from "@components/layout/Navigation";
import { useAppSelector } from "@util/hooks";
import { getAvatar } from "@data/resources";
import Progress from "@components/Progress";
import { memo } from "react";

interface HeaderProps {
    onProfilePress: () => void,
    style?: ViewStyle,
    actions?: HeaderAction[],
    navigation?: NavigationProps
}

export interface HeaderAction {
    id: string,
    icon: ImageSourcePropType,
    onPress: () => void
}

const Header = ({style, onProfilePress, navigation, actions}: HeaderProps) => {
    return (
        <View style={[styles.layout, style]}>
            <Profile onPress={onProfilePress} />

            {navigation && <View style={styles.navigationLayout}>
                <Navigation {...navigation} />
            </View>}

            {(!navigation) && <View style={{flexGrow: 1}} />}

            {actions && <View style={styles.actionsLayout}>
                {actions.map(item =>
                    <Button theme="popup"
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

export const Profile = memo(({onPress}: {onPress: () => void}) => {
    const { nick, avatar, level, xp } = useAppSelector(state => state.profile.me);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.profileLayout}>
                <Image source={getAvatar(avatar)} style={styles.profileAvatar} />
                <View style={{gap: 4}}>
                    <Text style={styles.profileName}>{nick}</Text>
                    <View style={styles.profileStats}>
                        <Text style={styles.profileLevel}>Lvl. {level}</Text>
                        <Progress showLabel={false} current={0} max={100} style={{width: 70}} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});

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
        width: 150
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
        letterSpacing: .2
    },

    profileStats: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },

    profileLevel: {
        fontSize: 13,
        color: "#ccc0ce"
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
        width: 150,
        gap: 8
    }
});

export default memo(Header);