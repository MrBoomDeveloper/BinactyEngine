import { StatusBar, StyleSheet, Text, View, Image, Button } from 'react-native';
import Header from "./src/components/Header";
import { colors, sizes } from "./src/util/variables.json";

function App() {
  return (
    <View style={styles.homeScreen}>
      <StatusBar hidden={true}/>
      <Header />
      
      <View style={styles.dualContainer}>
        <View style={styles.navigation}>
          <Text>Navigation</Text>
        </View>
        
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
  
  navigation: {
    height: "100%",
    padding: sizes.paddingMedium,
    backgroundColor: colors.surfaceLight
  },
  
  pageScroller: {
    
  }
});

export default App;