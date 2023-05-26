import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "@util/variables.json";
import Header from "@components/layout/Header";

export default function Lobby2() {
    return (
        <View style={styles.screen}>
            <Header style={{position: "absolute", zIndex: 999}} />
            <FlatList data={"1234567890".split("")}
                ListHeaderComponent={GamemodeOverview}
                pagingEnabled={true}
                keyExtractor={item => item}
                renderItem={item => {
                    return (
                        <Placeholder2 />
                    );
                }} />
        </View>
    );
}

function GamemodeOverview() {
    return (
        <Placeholder />
    );
}

const Placeholder = () => (<View style={{height: Dimensions.get("window").height, flexGrow: 1, backgroundColor: "red"}} />);
const Placeholder2 = () => (<View style={{height: 100, width: 100, margin: 10, backgroundColor: "green"}} />);

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background,
        flex: 1
    }
});