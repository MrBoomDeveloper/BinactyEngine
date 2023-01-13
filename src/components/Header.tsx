import { StatusBar, StyleSheet, View, Image, Text } from "react-native";

import { sizes, colors } from "../util/variables";

function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.avatar} source={require("../static/avatar/premium.jpg")}/>
      <View style={styles.stats}>
        <Text style={styles.nicknameLabel}>MrBoomDev</Text>
        <View>
          <Text style={styles.levelLabel}>Lvl.1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: sizes.paddingMedium,
    backgroundColor: colors.surfaceLight
  },
  
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 2,
    marginLeft: StatusBar.currentHeight * 2
  },
  
  stats: {
    height: "100%",
    marginLeft: 14,
    padding: 1,
    display: "flex"
  },
  
  nicknameLabel: {
    color: "white",
    fontSize: 15,
    flexGrow: 1
  },
  
  levelLabel: {
    color: colors.textSecond,
    fontSize: 13,
    fontWeight: "500"
  }
});

export default Header;