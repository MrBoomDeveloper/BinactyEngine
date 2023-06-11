import { StyleSheet, Text, View } from "react-native";
import Drawer, { SimpleDrawerProps } from "./Drawer";
import { useFetch } from "@util/hooks";

export function NewsDrawer(props: SimpleDrawerProps) {
    const [fetched] = useFetch("https://api.mrboomdev.ru");

    return (
        <Drawer width={350} direction="right" {...props}>
            <View>
                <Text>News</Text>
                {fetched.isDone && <Text>{fetched.resultMessage}</Text>}
            </View>
        </Drawer>
    );
}

const styles = StyleSheet.create({

});