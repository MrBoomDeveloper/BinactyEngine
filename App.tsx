import React from "react";
import { StatusBar, Pressable, StyleSheet, Text, View, Image, NativeModules } from 'react-native';
import { colors, sizes } from "./src/util/variables.json";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";
import Button from "./src/components/Button";
const { GameNative } = NativeModules;
//import GameNative from "./src/GameNative";
import { navItems } from "./src/data/HomeData";

const player = GameNative.getPlayerData("MrBoomDev");
console.log(player);

function App() {
  return (
    <View style={styles.homeScreen}>
      <StatusBar hidden={true}/>
      <Header />
      
      <View style={styles.dualContainer}>
        <Navigation items={navItems} />
        <View style={styles.pageScroller}>
          <View style={styles.home}>
            <View style={styles.homeMainColumn}>
              <Image source={require("./src/static/banner/gamemode/reznya.jpg")} style={styles.homeBanner} />
              <Text style={styles.title}>Demo level</Text>
              
              <View style={styles.actions}>
                <Button label="Play!" onPress={() => GameNative.play(0)}/>
                <Button label="Change gamemode" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    height: "100%",
    backgroundColor: colors.background
  },
  
  dualContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row"
  },
  
  pageScroller: {
    width: "100%"
  },
  
  home: {
    width: "100%"
  },
  
  homeColumn: {
    width: "33%"
  },
  
  homeMainColumn: {
    width: 250,
    height: "100%"
  },
  
  homeBanner: {
    width: "100%",
    height: 125,
    backgroundColor: "black"
  },
  
  title: {
    fontSize: 20,
    padding: 10,
    color: "white"
  },
  
  actions: {
    padding: 10
  }
});

export default App;