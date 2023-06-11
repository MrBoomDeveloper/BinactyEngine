import { StyleSheet, View, Alert, Text, TouchableOpacity, Image } from "react-native";
import * as constants from "@data/constants.json";
import BoomButton from "@components/Button";
import Drawer, { SimpleDrawerProps } from "./Drawer";

interface ProfileButtonProps {
    name: string,
    onPress?: () => void
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

export function ProfileDrawer(props: SimpleDrawerProps) {
	return (
        <Drawer width={250} direction="left" {...props}>
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
        </Drawer>
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