import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { api, API_URL } from "../api/api";

export default function MenuScreen({ route, navigation }) {
  const { category } = route.params;
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    api.get("/dishes")
      .then(res => {
        const filtered = res.data.filter(dish => dish.category === category);
        setDishes(filtered);
      })
      .catch(err => console.log("Error loading dishes:", err));
  }, []);

  return (
    <ScrollView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18, color: "#4e342e", marginBottom: 15 }}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* HEADER */}
      <Text style={styles.header}>
        {category.toUpperCase()} MENU
      </Text>

      {/* DISH LIST */}
      {dishes.map((dish) => (
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#faf4ef" },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3e2723",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
  },
  image: { width: 90, height: 90, borderRadius: 10 },
  info: { marginLeft: 12, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#4e342e" },
  price: { marginTop: 6, fontSize: 16, color: "#6d4c41" },
});
