import { useState } from "react";
import { StatusBar, StyleSheet, ScrollView, View, Text, Image, Pressable } from "react-native";
import { sizes, colors } from "../util/variables";

interface navigationItem {
  icon: string,
  label: string,
  key: string
}

function NavigationItem({icon, label, onSelect, isSelected}) {
  const style = isSelected 
    ? {...styles.item, ...styles.itemActive} 
    : {...styles.item, ...styles.itemInactive};
  return (
    <Pressable onPress={() => onSelect(label)} style={style}>
      <Image style={styles.itemIcon} source={{uri: icon}} />
      <Text style={styles.itemLabel}>{label}</Text>
    </Pressable>
  );
}

function Navigation({items}: navigationItem[]) {
  const [select, setSelected] = useState(items[0].label);
  return (
    <View style={{height: "100%"}}>
      <ScrollView style={styles.navigation}>
        {items.map(data => <NavigationItem isSelected={select == data.label} onSelect={(label: string) => setSelected(label)} {...data}></NavigationItem>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    height: "100%",
    padding: sizes.paddingSmall,
    backgroundColor: colors.surfaceLight
  },
  
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: StatusBar.currentHeight,
    fontSize: 15,
    padding: 5,
    borderRadius: 5
  },
  
  itemActive: {
    fontWeight: "500",
    backgroundColor: colors.surfaceLight
  },
  
  itemInactive: {
    fontWeight: "400",
    opacity: .5
  },
  
  itemIcon: {
    width: 50,
    height: 50
  },
  
  itemLabel: {
    color: "white"
  }
});

export default Navigation;