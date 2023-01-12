import { StatusBar, StyleSheet, Text, View, Image, Button } from 'react-native';
import Header from "./src/components/Header";
import Navigation, { navigationItem } from "./src/components/Navigation";
import { colors, sizes } from "./src/util/variables.json";

const navItems: navigationItems[] = [
  { label: "Home", key: "home", icon: "./src/static/ui/ic_home.png" },
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
          <Text>PageScroller</Text>
          <Button title="Play!" />
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
    
  }
});

export default App;