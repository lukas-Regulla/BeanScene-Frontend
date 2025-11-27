import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { CartContext } from "../context/CartContext";

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
    <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>

      {/* Cart Empty */}
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          ))}

          <Text style={styles.total}>Total: ${total}</Text>

          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#8d6e63"
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
          />

          <TouchableOpacity style={styles.button} onPress={placeOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#faf4ef" },
  container: { padding: 15 },

  back: { fontSize: 18, color: "#4e342e", marginBottom: 10 },

  title: { fontSize: 32, fontWeight: "bold", color: "#3e2723", marginBottom: 20 },

  empty: { fontSize: 18, color: "#6d4c41" },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#d7ccc8",
    borderBottomWidth: 1,
  },

  itemName: { fontSize: 18, color: "#4e342e" },

  itemPrice: { fontSize: 18, fontWeight: "bold", color: "#3e2723" },

  total: { marginTop: 20, fontSize: 22, fontWeight: "bold", color: "#4e342e" },

  input: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
    color: "#4e342e",
  },

  button: {
    marginTop: 25,
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
