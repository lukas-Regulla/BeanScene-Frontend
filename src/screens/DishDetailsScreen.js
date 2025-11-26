import { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../api/api";
import { CartContext } from "../context/CartContext";

export default function DishDetailsScreen({ route, navigation }) {
  const { addToCart } = useContext(CartContext);

  const { dish } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* Hero Image */}
      <Image
        source={{ uri: `${API_URL}/static/${dish.file}` }}
        style={styles.image}
      />

      {/* Dish Title */}
      <Text style={styles.title}>{dish.name}</Text>

      {/* Description */}
      <Text style={styles.description}>{dish.description}</Text>

      {/* Dietary Flags */}
      <Text style={styles.sectionTitle}>Dietary Info</Text>
      <View style={styles.tagContainer}>
        {dish.dietary_flags?.split(",").map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag.trim()}</Text>
          </View>
        ))}
      </View>

      {/* Category */}
      <Text style={styles.meta}>Category: {dish.category?.toUpperCase()}</Text>

      {/* Availability */}
      <Text style={styles.meta}>
        Availability: {dish.availability === "yes" ? "Available" : "Unavailable"}
      </Text>

      {/* Price */}
      <Text style={styles.price}>${dish.price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addToCart(dish);
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#faf4ef" },
  container: {
    padding: 15,
    backgroundColor: "#faf4ef",
  },

  back: {
    fontSize: 18,
    color: "#4e342e",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 2.6,  // you can tweak 2.0 – 3.0
    borderRadius: 12,
    resizeMode: "cover",
  marginBottom: 20,
},


  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3e2723",
  },

  description: {
    marginTop: 10,
    fontSize: 18,
    color: "#6d4c41",
    lineHeight: 24,
  },

  sectionTitle: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: "bold",
    color: "#4e342e",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#d7ccc8",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    color: "#4e342e",
    fontSize: 14,
  },

  meta: {
    marginTop: 10,
    fontSize: 16,
    color: "#5d4037",
  },

  price: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#4e342e",
  },

  button: {
    marginTop: 30,
    backgroundColor: "#6d4c41",
    padding: 16,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
