import { Pressable, Text, StyleSheet } from "react-native";

export default function Button({label, ...props}) {
  return (
    <Pressable {...props}>
      <Text style={styles.button}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    color: "white",
    backgroundColor: "#ee0000",
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    textAlign: "center"
  }
});