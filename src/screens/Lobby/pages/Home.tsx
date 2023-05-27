import { View, Text, SectionList, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import { size } from "@data/constants.json";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@util/hooks";

const gamemodes: SectionProps[] = [];

for(let i = 0; i < 10; i++) {
    const category: SectionProps = {
        title: "bruhff" + i, id: "bruh" + i,
        data: []
    }

    for(let a = 0; a < 10; a++) {
        category.data.push({ title: "huh" + a, id: "huh" + a });
    }

    gamemodes.push(category);
}

interface HomeProps {
    setScrollEnabled: Dispatch<SetStateAction<boolean>>
}

export default function Home({setScrollEnabled}: HomeProps) {
    const gamemodes1 = useAppSelector(state => state.gamemodes.current);

    return (
        <SectionList sections={gamemodes} pagingEnabled
            ListHeaderComponent={Overview}
            ListFooterComponent={<Text style={{padding: 50}}>The End.</Text>}
            onScroll={e => {
                setScrollEnabled(e.nativeEvent.contentOffset.y <= 0);
            }} style={styles.layout}
            keyExtractor={item => item.id}
            renderItem={() => null}
            renderSectionHeader={item => <Section {...item.section} />} />
    );
}

interface SectionProps {
    title: string,
    id: string,
    data: SectionItemProps[]
}

interface SectionItemProps {
    title: string,
    id: string
}

function Section({title, data}: SectionProps) {
    return (
        <View style={styles.sectionLayout}>
            <View>
                <Text>{title}</Text>
            </View>
            <FlatList data={data} horizontal
                renderItem={item => <SectionItem {...item.item} />} />
        </View>
    )
}

function SectionItem({title}: SectionItemProps) {
    return (
        <View style={{width: 200}}>
            <Text>{title}</Text>
        </View>
    );
}

function Overview() {
    return (
        <View style={styles.overviewLayout}>
            <Image source={require("@static/banner/gamemode/banner_hd.jpg")} style={styles.overviewWallpaper} />
            <View style={styles.overviewInfoLayout}>
                <Text>Hello, World!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get("screen").width
    },

    overviewLayout: {
        width: "100%",
        height: Dimensions.get("screen").height
    },

    overviewWallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    overviewInfoLayout: {
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: size.inlineScreenPadding
    },

    sectionLayout: {
        paddingHorizontal: size.inlineScreenPadding
    }
});