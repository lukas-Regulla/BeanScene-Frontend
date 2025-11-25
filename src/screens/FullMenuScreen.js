import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api, API_URL } from "../api/api";

export default function FullMenuScreen({ navigation }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    api.get("/dishes")
      .then(res => {
        setDishes(res.data);
      })
      .catch(err => console.log("Error loading dishes:", err));
  }, []);

  // Group dishes by category
  const categories = ["breakfast", "main", "dessert"];
  const grouped = categories.map(cat => ({
    name: cat,
    items: dishes.filter(d => d.category.toLowerCase() === cat.toLowerCase())
  }));

  return (
    <ScrollView style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>FULL MENU</Text>

      {grouped.map(section => (
        <View key={section.name}>
          {/* Category Heading */}
          <Text style={styles.sectionHeader}>
            {section.name.toUpperCase()}
          </Text>

          {section.items.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={styles.card}
              onPress={() => navigation.navigate("DishDetails", { dish })}
            >
              <Image
                source={{ uri: `${API_URL}/static/${dish.file}` }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{dish.name}</Text>
                <Text style={styles.price}>${dish.price}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* If category empty */}
          {section.items.length === 0 && (
            <Text style={styles.empty}>No items in this category</Text>
          )}
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#faf4ef" },

  back: {
    fontSize: 18,
    color: "#4e342e",
    marginBottom: 15,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#3e2723",
  },

  sectionHeader: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#5d4037",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },

  image: { width: 90, height: 90, borderRadius: 10 },

  info: { marginLeft: 12, justifyContent: "center" },

  title: { fontSize: 20, fontWeight: "bold", color: "#4e342e" },

  price: { marginTop: 6, fontSize: 16, color: "#6d4c41" },

  empty: {
    fontSize: 16,
    color: "#8d6e63",
    marginBottom: 10,
  },
});
