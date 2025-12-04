import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { CartContext } from "../context/CartContext";
import { Colors, ComponentStyles, Spacing, Typography, mergeStyles } from "../styles/Themes";

export default function CartScreen({ navigation }) {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const [customerName, setCustomerName] = useState("");

  // store swipe refs
  const swipeRefs = useRef({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem("user");
        if (!raw) return;

        const user = JSON.parse(raw);
        const name =
          user?.name ||
          (user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}`) ||
          "";

        if (name) setCustomerName(name);
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };

    loadUser();
  }, []);

  const total = cart.reduce((sum, d) => sum + Number(d.price), 0);

  const placeOrder = async () => {
    try {
      await api.post("/orders/create", {
        customerName,
        dateTime: new Date(),
        items: cart,
        total,
      });

      alert("Order placed!");
      clearCart();
      navigation.goBack();
    } catch (err) {
      alert("Error placing order.");
      console.log(err);
    }
  };

  // 🔥 called when swipe opens
  const handleDelete = (cartId) => {
    const ref = swipeRefs.current[cartId];
    if (ref) ref.close(); // closes the red background IMMEDIATELY

    removeFromCart(cartId); // remove from context
  };

  const renderLeftActions = () => (
    <View
      style={{
        backgroundColor: Colors.error,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 12,
      }}
    >
      <Text style={[Typography.subtitle, { color: "white" }]}>Delete</Text>
    </View>
  );

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
      <ScrollView contentContainerStyle={ComponentStyles.scrollContainer}>

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={ComponentStyles.backButton}>← Back</Text>
        </TouchableOpacity>

        <Text style={Typography.largeTitle}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={ComponentStyles.emptyText}>Your cart is empty.</Text>
        ) : (
          <>
            {cart.map((item) => (
              <Swipeable
                key={item._cartId}
                ref={(ref) => {
                  if (ref) swipeRefs.current[item._cartId] = ref;
                }}
                renderLeftActions={renderLeftActions}
                onSwipeableLeftOpen={() => handleDelete(item._cartId)}
              >
                <View
                  style={mergeStyles(ComponentStyles.row, {
                    paddingVertical: Spacing.md,
                    borderBottomColor: Colors.border,
                    borderBottomWidth: 1,
                  })}
                >
                  <Text style={Typography.body}>{item.name}</Text>
                  <Text style={[Typography.body, { fontWeight: "bold" }]}>${item.price}</Text>
                </View>
              </Swipeable>
            ))}

            <Text
              style={{
                marginTop: Spacing.xl,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Total: ${total}
            </Text>

            <TextInput
              placeholder="Enter name or table number"
              placeholderTextColor={Colors.textMuted}
              style={ComponentStyles.input}
              onChangeText={setCustomerName}
            />

            <TouchableOpacity style={ComponentStyles.button} onPress={placeOrder}>
              <Text style={ComponentStyles.buttonText}>Place Order</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ComponentStyles.button} onPress={clearCart}>
              <Text style={ComponentStyles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
