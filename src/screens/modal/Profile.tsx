import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Pressable, Alert, Text, ViewStyle, TouchableOpacity, Image } from "react-native";
import * as constants from "@data/constants.json";
import BoomButton from "@components/Button";

interface ProfileDrawerProps {
    isOpened: boolean,
    onClose: () => void
}

interface ProfileButtonProps {
    name: string,
    onPress?: () => void
}

interface ProfileDrawerMenuProps {
    isOpened: boolean
}

interface ButtonProps {
    text: string,
    onPress: () => void
}

export function ProfileButton({name, onPress}: ProfileButtonProps) {
    return (
        <TouchableOpacity onPress={() => onPress && onPress()}>
            <View>
                <Image source={require("@static/avatar/premium.jpg")} />
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function ProfileDrawer({isOpened, onClose}: ProfileDrawerProps) {
    const opacityAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityAnimation, {
            duration: 150,
            toValue: isOpened ? 1 : 0,
            useNativeDriver: true
        }).start();
    }, [opacityAnimation, isOpened]);

	return (
        <Animated.View style={[styles.layout, {opacity: opacityAnimation}]} pointerEvents={isOpened ? "auto" : "none"}>
            <ProfileDrawerMenu isOpened={isOpened} />
            <Pressable onPress={e => onClose()} style={{width: "100%", height: "100%", position: "absolute", left: 300}} />
        </Animated.View>
    );
}

function ProfileDrawerMenu({isOpened}: ProfileDrawerMenuProps) {
    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnimation, {
            useNativeDriver: false,
            duration: 150,
            toValue: isOpened ? 0 : -100
        }).start();
    }, [isOpened, slideAnimation]);

    return (
        <Animated.ScrollView style={[styles.menuLayout, {transform: [{translateX: slideAnimation}]}]}>
            <View style={[styles.categoryTitleLayout, {paddingTop: 10}]}>
                <Text style={styles.categoryTitleLabel}>Profile Options</Text>
            </View>

            <View style={styles.actionsLayout}>
                <Button text="Edit Details"
                    onPress={() => Alert.alert("currently unavailable.")} />
                
                <Button text="Link Account"
                    onPress={() => Alert.alert("currently unavailable.")} />

                <Button text="Log Out"
                    onPress={() => Alert.alert("currently unavailable.")} />
                
                <Button text="Delete Account"
                    onPress={() => Alert.alert("currently unavailable.")} />
            </View>
            
            <View style={styles.categoryTitleLayout}>
                <Text style={styles.categoryTitleLabel}>Developer Options</Text>
            </View>

            <View style={styles.actionsLayout}>
                <Button text="Crash Reports"
                    onPress={() => Alert.alert("currently unavailable.")} />

                <Button text="Reset Packs"
                    onPress={() => Alert.alert("currently unavailable.")} />
            </View>
        </Animated.ScrollView>
    );
}

function Button({text, onPress}: ButtonProps) {
    return (
        <BoomButton text={text}
            onPress={onPress}
            theme="brand" hitbox={0} 
            styleText={styles.actionButtonLabel}
            style={styles.actionButtonLayout} />
    );
}

const styles = StyleSheet.create({
	layout: {
        backgroundColor: "rgba(0, 0, 0, .75)",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 999
    },

    menuLayout: {
        width: 250,
        height: "100%",
        backgroundColor: constants.color.purpleBackground
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

    actionButtonLayout: {
        height: 45
    },

    actionButtonLabel: {
        fontSize: 15
    }
});