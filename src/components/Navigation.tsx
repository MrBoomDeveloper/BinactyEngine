import { useState } from "react";
import { StatusBar, StyleSheet, ScrollView, View, Text, Image, Pressable } from "react-native";
import { sizes, colors } from "../util/variables";

function NavigationItem({icon, label, onSelect, isSelected}) {
  const style = isSelected 
    ? {...styles.item, ...styles.itemActive} 
    : {...styles.item, ...styles.itemInactive};
  return (
    <Pressable onPress={() => onSelect(label)} style={style}>
      <Image style={styles.itemIcon} source={isSelected ? (icon.active || icon.inactive) : (icon.inactive || icon.active)}/>
      <Text style={isSelected ? styles.itemLabel : {...styles.itemLabel, ...styles.itemLabelActive}}>{label}</Text>
    </Pressable>
  );
}

export default function Navigation({items}: navigationItem[]) {
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
    paddingTop: sizes.big,
    paddingRight: sizes.big,
    backgroundColor: colors.surfaceLight
  },
  
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: StatusBar.currentHeight,
    padding: sizes.medium,
    paddingRight: 25,
    borderRadius: 10
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
  	marginRight: sizes.medium,
    width: 23,
    height: 23
  },
  
  itemLabel: {
    color: "white",
    fontSize: 15,
    fontWeight: "500"
  },
  
  itemLabelActive: {
  	fontWeight: "400"
  }
});