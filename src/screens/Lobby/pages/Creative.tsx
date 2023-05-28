import Button from "@components/Button";
import { size } from "@data/constants.json";
import { SetScreenProps } from "App";
import { View, StyleSheet, Dimensions } from "react-native";

interface CreativeProps {
    setScreen: SetScreenProps
}

export default function Creative({setScreen}: CreativeProps) {
    return (
        <View style={styles.layout}>
            <Button text="Launch Editor"
                theme="brand"
                onPress={() => {

                }} />
            
            <Button text="Back to old Lobby"
                theme="brand"
                onPress={() => {
                    setScreen("lobby");
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get("screen").width,
        paddingTop: 75,
        paddingHorizontal: size.inlineScreenPadding
    }
});