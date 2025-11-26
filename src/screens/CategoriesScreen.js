import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORY_LIST = [
  { name: "breakfast" },
  { name: "main" },
  { name: "dessert" }
];

export default function CategoriesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>

      {CATEGORY_LIST.map((cat) => (
        <TouchableOpacity
          key={cat.name}
          style={styles.categoryButton}
          onPress={() => navigation.navigate("Menu", { category: cat.name })}
        >
          <Text style={styles.categoryText}>{cat.name.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18, color: "#4e342e", marginBottom: 15 }}>
          ← Back
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  categoryButton: {
    backgroundColor: "#4e342e",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  categoryText: { color: "white", fontSize: 18 },
});
