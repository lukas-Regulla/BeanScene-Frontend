import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { CartContext } from "../context/CartContext";
import { Colors, ComponentStyles, Spacing, Typography, mergeStyles } from "../styles/Themes";

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);
  const [customerName, setCustomerName] = useState("");

  // Pre-fill name from stored user (set at login)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem("user");
        if (!raw) return;
        const user = JSON.parse(raw);
        // support several possible shapes
        const name = user?.name || (user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}`) || user?.first || "";
        if (name) setCustomerName(name);
      } catch (err) {
        console.log("Error loading user for cart prefill:", err);
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
      navigation.goBack(); // return to menu
    } catch (err) {
      alert("Error placing order.");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
    <ScrollView contentContainerStyle={ComponentStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={ComponentStyles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={Typography.largeTitle}>Your Cart</Text>

      {/* Cart Empty */}
      {cart.length === 0 ? (
        <Text style={ComponentStyles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map((item, index) => (
            <View key={index} style={mergeStyles(ComponentStyles.row, { paddingVertical: Spacing.md, borderBottomColor: Colors.border, borderBottomWidth: 1 })}>
              <Text style={Typography.body}>{item.name}</Text>
              <Text style={mergeStyles(Typography.body, { fontWeight: "bold" })}>${item.price}</Text>
            </View>
          ))}

          <Text style={mergeStyles(Typography.title, { marginTop: Spacing.xl, fontSize: 22, fontWeight: "bold" })}>Total: ${total}</Text>

          <TextInput
            placeholder="Enter name"
            placeholderTextColor={Colors.textMuted}
            style={ComponentStyles.input}
            onChangeText={setCustomerName}
          />

          <TouchableOpacity style={ComponentStyles.button} onPress={placeOrder}>
            <Text style={ComponentStyles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}
