import { StatusBar, StyleSheet, View, Image, Text } from "react-native";
import { sizes, colors } from "../util/variables";

const avatars = {
	klarrie: require("../static/avatar/premium.jpg")
}

function Header({nick, level, avatar}) {
  return (
    <View style={styles.header}>
      <Image style={styles.avatar} source={avatars[avatar]}/>
      <View style={styles.stats}>
        <Text style={styles.nicknameLabel}>{nick}</Text>
        <View>
          <Text style={styles.levelLabel}>Lvl.{level}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: sizes.medium,
    backgroundColor: colors.surfaceLight
  },
  
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 2,
    marginLeft: StatusBar.currentHeight
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