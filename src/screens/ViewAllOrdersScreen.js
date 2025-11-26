import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";

export default function ViewAllOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log("Error loading orders:", err));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.customer}>Customer: {item.customerName}</Text>
      <Text style={styles.total}>Total: ${item.total}</Text>
      <Text style={styles.date}>
        {new Date(item.dateTime).toLocaleString()}
      </Text>

      <Text style={styles.itemsHeader}>Items:</Text>
      {item.items.map((d, idx) => (
        <Text key={idx} style={styles.itemLine}>
          • {d.name} — ${d.price}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>All Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#faf4ef",
  },

  back: {
    fontSize: 18,
    color: "#4e342e",
    margin: 15,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3e2723",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  customer: { fontSize: 20, fontWeight: "bold", color: "#4e342e" },
  total: { fontSize: 18, marginTop: 5, color: "#5d4037" },
  date: { marginTop: 5, color: "#6d4c41" },

  itemsHeader: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#4e342e",
  },

  itemLine: {
    fontSize: 16,
    color: "#6d4c41",
  },
});
