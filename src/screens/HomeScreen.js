import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BeanScene</Text>
      <Text style={styles.sub}>Welcome! Choose an option:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Categories")}
      >
        <Text style={styles.buttonText}>View Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FullMenu")}
      >
        <Text style={styles.buttonText}>View Full Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  sub: { fontSize: 18, marginBottom: 30 },
  button: {
    backgroundColor: "#4e342e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" }
});
