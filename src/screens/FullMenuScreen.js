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

  // Search state
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
        {/* Cart button (top right) */}
        <View style={ComponentStyles.rowBetween}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={ComponentStyles.backButton}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Text style={{ fontSize: 20 }}>🛒 {cart.length}</Text>
          </TouchableOpacity>
        </View>

        <Text style={Typography.largeTitle}>MENU</Text>
        {/* Category buttons */}
        <View style={{ flexDirection: "row", marginBottom: 14 }}>
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

        <TouchableOpacity onPress={closeMiniCart}>
          <Text style={ComponentStyles.cartCloseButton}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart") }>
          <Text style={ComponentStyles.cartCloseButton}>View Cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   safe: { flex: 1,justifyContent: "center",alignItems: "center", backgroundColor: "#faf4ef" },
//   container: { padding: 15, paddingBottom: 60 },

//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   cartButton: { fontSize: 20 },

//   back: { fontSize: 18, color: "#4e342e" },

//   header: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#3e2723",
//   },

//   catRow: {
//     flexDirection: "row",
//     marginBottom: 20,
//     gap: 10,
//   },

//   catButton: {
//     backgroundColor: "#d7ccc8",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 18,
//   },

//   catText: { color: "#4e342e", fontWeight: "bold" },

//   sectionHeader: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginVertical: 15,
//     color: "#5d4037",
//   },

//   card: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     elevation: 3,
//   },

//   image: { width: 90, height: 90, borderRadius: 10 },

//   info: { marginLeft: 12, justifyContent: "center" },

//   title: { fontSize: 20, fontWeight: "bold", color: "#4e342e" },

//   price: { marginTop: 6, fontSize: 16, color: "#6d4c41" },

//   empty: { fontSize: 16, color: "#8d6e63" },

//   miniCart: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     right: 0,
//     width: 260,
//     backgroundColor: "white",
//     padding: 15,
//     borderLeftWidth: 2,
//     borderLeftColor: "#ccc",
//   },

//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.2)",
//   },

//   searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   searchInput: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#d7ccc8",
//   },
//   clearBtn: { marginLeft: 10 },
//   clearText: { color: "#4e342e", fontWeight: "600" },

//   cartTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },

//   cartItem: { fontSize: 16, marginBottom: 8 },

//   closeBtn: {
//     marginTop: 20,
//     backgroundColor: "#6d4c41",
//     color: "white",
//     padding: 10,
//     textAlign: "center",
//     borderRadius: 8,
//   },
// });
