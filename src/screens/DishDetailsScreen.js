import { useContext } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../api/api";
import { CartContext } from "../context/CartContext";
import { Colors, ComponentStyles, Spacing, Typography, mergeStyles } from "../styles/Themes";

export default function DishDetailsScreen({ route, navigation }) {
  const { addToCart } = useContext(CartContext);

  const { dish } = route.params;

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
    <ScrollView contentContainerStyle={ComponentStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={ComponentStyles.backButton}>← Back</Text>
      </TouchableOpacity>

      {/* Hero Image */}
      <Image
        source={{ uri: `${API_URL}/static/${dish.file}` }}
        style={ComponentStyles.fullWidthImage}
      />

      {/* Dish Title */}
      <Text style={Typography.largeTitle}>{dish.name}</Text>

      {/* Description */}
       <Text style={Typography.subtitle}>{dish.description}</Text>

      {/* Dietary Flags */}
      <Text style={Typography.sectionHeader}>Dietary Info</Text>
      <View style={ComponentStyles.tagContainer}>
        {dish.dietary_flags?.split(",").map((tag, index) => (
          <View key={index} style={ComponentStyles.tag}>
            <Text style={ComponentStyles.tagText}>{tag.trim()}</Text>
          </View>
        ))}
      </View>

      {/* Category */}
      <Text style={Typography.body}>Category: {dish.category?.toUpperCase()}</Text>

      {/* Availability */}
      <Text style={Typography.body}>
        Availability: {dish.availability === "yes" ? "Available" : "Unavailable"}
      </Text>

      {/* Price */}
      <Text style={Typography.title}>${dish.price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={ComponentStyles.button}
        onPress={() => {
          addToCart(dish);
          navigation.goBack();
        }}
      >
        <Text style={ComponentStyles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ComponentStyles.button} onPress={() => navigation.navigate("DishesForm", { dish })} >
        <Text style={ComponentStyles.buttonText}>Edit Dish</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

