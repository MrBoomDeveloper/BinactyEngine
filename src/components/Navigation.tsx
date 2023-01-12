import { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { sizes, colors } from "../util/variables";

interface navigationItem {
  icon: string,
  label: string,
  key: string
}

function NavigationItem({icon, label}) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
  );
}

function Navigation({items}: navigationItem[]) {
  const [active] = useState(0);
  return (
    <View style={{height: "100%"}}>
      <ScrollView style={styles.navigation}>
        {items.map(item => <NavigationItem {...item} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    height: "100%",
    padding: sizes.paddingMedium,
    backgroundColor: colors.surfaceLight
  },
  
  item: {
    marginBottom: 10
  },
  
  itemLabel: {
    color: "white"
  }
});

export default Navigation;