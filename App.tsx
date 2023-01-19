import React from "react";
import { StatusBar, Pressable, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import { colors, sizes } from "./src/util/variables.json";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";
import Button from "./src/components/Button";

const navItems = [{ 
  label: "Home", key: "home",
  icon: { active: require("./src/static/icon/home_active.png"), inactive: require("./src/static/icon/home.png") }
}, { 
  label: "Character", key: "me",
  icon: "./src/static/ui/ic_me.png"
}, {
  	label: "Season Pass", key: "pass",
  	icon: "./src/static/ui/ic_pass.png"
}, {
  	label: "Shop", key: "shop",
  	icon: { active: require("./src/static/icon/shop_active.png"), inactive: require("./src/static/icon/shop.png") }
}, {
	label: "Changelog", key: "logs",
	icon: "./src/static/ui/ic_changelog.png"
}];

function App() {
  return <TextInput placeholder="Your nickname" value="Player" />;
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
              <TextInput placeholder="Your nickname" value="Player" />
              <Button label="Play!" />
              <Button label="Change gamemode" />
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
  }
});

export default App;