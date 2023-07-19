import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface NavigationProps {
    tabs?: NavigationTabProps[],
    onTabSelected?: (tab: NavigationTabProps, index: number) => void,
    current?: string
}

export interface NavigationTabProps {
    title: string,
    id: string,
    isSelected?: boolean,
    onPress?: () => void
}

export default function Navigation({tabs, onTabSelected, current}: NavigationProps) {
    return (
        <View style={styles.layout}>
            {tabs?.map((item, index) =>
                <NavigationTab {...item} key={item.id}
                    isSelected={item.id == current}
                    onPress={() => onTabSelected && onTabSelected(item, index)} />
            )}
        </View>
    );
}

function NavigationTab({title, onPress, isSelected}: NavigationTabProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.tab, isSelected && styles.tabActive]}>
                <Text style={[styles.tabLabel, isSelected && styles.tabActiveLabel]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: "row",
        gap: 5
    },

    tab: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    tabActive: {
        backgroundColor: "white",
        borderRadius: 15
    },

    tabLabel: {
        color: "#f1e9f1ae",
        letterSpacing: .3
    },

    tabActiveLabel: {
        color: "black"
    }
});