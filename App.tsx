import { StatusBar, StyleSheet, Text, View, Image, Alert } from 'react-native';
import Header from "./src/components/Header";
import Navigation, { navigationItem } from "./src/components/Navigation";
import { colors, sizes } from "./src/util/variables.json";

const navItems: navigationItems[] = [
  { label: "Home", key: "home", icon: "./src/static/ui/ic_home.png" },
  { label: "Character", key: "me", icon: "./src/static/ui/ic_me.png" },
  { label: "Season Pass", key: "pass", icon: "./src/static/ui/ic_pass.png" },
  { label: "Shop", key: "shop", icon: "./src/static/ui/ic_shop.png" },
  { label: "Changelog", key: "logs", icon: "./src/static/ui/ic_changelog.png" }
]

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
              <Text style={styles.button}>Play!</Text>
              <Text style={styles.button}>Change gamemode</Text>
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
    backgroundColor: "red"
  },
  
  title: {
    fontSize: 20,
    padding: 10,
    color: "white"
  },
  
  button: {
    width: "100%",
    color: "white",
    backgroundColor: "orange",
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    textAlign: "center"
  }
});

export default App;