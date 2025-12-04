/**
 * FullMenuScreen
 * ---------------------------
 * Displays the entire restaurant menu grouped by categories.
 * Supports:
 *  - Searching dishes
 *  - Category jump scrolling
 *  - Swipe gesture to open mini cart
 *  - Viewing dish details
 *  - Viewing cart contents
 *  - Slide-out animated mini cart panel
 *
 * This screen loads all menu items from the backend API on mount.
 */

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { api, API_URL } from "../api/api";
import { CartContext } from "../context/CartContext";
import { Colors, ComponentStyles, Typography } from "../styles/Themes";


export default function FullMenuScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Global cart
  const { cart } = useContext(CartContext);

  // Dish data
  const [dishes, setDishes] = useState([]);

  // Load dishes on mount
  useEffect(() => {
    api.get("/dishes")
      .then(res => setDishes(res.data))
      .catch(err => console.log("Error loading dishes:", err));
  }, []);

  // Categories + grouped layout
  const categories = ["breakfast", "main", "dessert"];

  const grouped = categories.map(cat => ({
    name: cat,
    items: dishes.filter(d => d.category?.toLowerCase() === cat.toLowerCase())
  }));

  const [query, setQuery] = useState("");

  const filteredGrouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grouped;
    return grouped.map(section => ({
      name: section.name,
      items: section.items.filter(d => {
        const name = String(d.name || "").toLowerCase();
        const desc = String(d.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      })
    }));
  }, [grouped, query]);

  // Slide-out cart animation
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [cartVisible, setCartVisible] = useState(false);

  const openMiniCart = () => {
    setCartVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeMiniCart = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setCartVisible(false));
  };

  // Slide gesture (swipe left)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx < -20,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -20) openMiniCart();
      },
    })
  ).current;

  // Scroll refs for category jump
  const scrollRef = useRef();
  const sectionRefs = useRef({});

  const scrollToCat = (cat) => {
    const y = sectionRefs.current[cat];
    scrollRef.current.scrollTo({ y, animated: true });
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={ComponentStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        {...panResponder.panHandlers}
      >
        <Text style={Typography.largeTitle}>MENU</Text>
        {/* Cart button (top right) */}
        <View style={ComponentStyles.rowBetween}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={ComponentStyles.backButton}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Text style={{ fontSize: 20 }}>🛒 {cart.length}</Text>
          </TouchableOpacity>
        </View>

        
        {/* Category buttons */}
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={ComponentStyles.categoryButton}
              onPress={() => scrollToCat(cat)}
            >
              <Text style={ComponentStyles.categoryButtonText}>{cat.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search bar */}
        <View style={ComponentStyles.row}>
          <TextInput
            placeholder="Search menu by name or description..."
            placeholderTextColor={Colors.textMuted}
            style={ComponentStyles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} style={ComponentStyles.clearButton}>
              <Text style={ComponentStyles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Menu sections */}
        {filteredGrouped.map(section => (
          <View
            key={section.name}
            onLayout={(e) => {
              sectionRefs.current[section.name] = e.nativeEvent.layout.y; 
            }}
          >
            <Text style={Typography.sectionHeader}>
              {section.name.toUpperCase()}
            </Text>

            {section.items.map(dish => (
              <TouchableOpacity
                key={dish.id}
                style={ComponentStyles.card}
                onPress={() => navigation.navigate("DishDetails", { dish })}
              >
                <Image
                  source={{ uri: `${API_URL}/static/${dish.file}` }}
                  style={ComponentStyles.image}
                />

                <View style={ComponentStyles.info}>
                  <Text style={Typography.title}>{dish.name}</Text>
                  <Text style={ComponentStyles.priceText}>${dish.price}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {section.items.length === 0 && (
              <Text style={ComponentStyles.emptyText}>No items in this category</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* overlay when mini cart open */}
      {cartVisible && (
        <TouchableOpacity style={ComponentStyles.overlay} onPress={closeMiniCart} />
      )}

      {/* Slide-out mini cart */}
      <Animated.View
        style={[
          ComponentStyles.miniCart,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Text style={ComponentStyles.miniCartTitle}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={ComponentStyles.emptyText}>Cart is empty</Text>
        ) : (
          cart.map((item, i) => (
            <Text key={i} style={ComponentStyles.miniCartItem}>
              • {item.name} - ${item.price}
            </Text>
          ))
        )}

        
        <TouchableOpacity onPress={() => navigation.navigate("Cart") }>
          <Text style={ComponentStyles.cartCloseButton}>View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeMiniCart}>
          <Text style={ComponentStyles.cartCloseButton}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
