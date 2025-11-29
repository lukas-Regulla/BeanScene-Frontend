import { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../api/api";
import { Colors, ComponentStyles, Typography } from "../styles/Themes";

export default function ViewAllOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const swipeableRefs = useRef({});

  // Load orders once
  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Error loading orders:", err));
  }, []);

  // -----------------------------------------------
  // Swipe logic
  // -----------------------------------------------
  const handleLeftSwipe = async (order, swipeRef) => {
    if (swipeRef) {
      swipeRef.close();
    }
    if (order.status !== "confirmed") {
      // Update to confirmed
      await api.put(`/orders/update/${order.id}`, { status: "confirmed" });

      setOrders((old) =>
        old.map((o) => (o.id === order.id ? { ...o, status: "confirmed" } : o))
      );
    } else {
      // Already confirmed → DELETE
      await api.delete(`/orders/delete/${order.id}`);

      setOrders((old) => old.filter((o) => o.id !== order.id));
    }
  };

  const renderLeftActions = (progress, dragX, item) => (
    <View
      style={{
        backgroundColor:
          item.status === "confirmed" ? Colors.error : Colors.success,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 12,
      }}
    >
      <Text style={[Typography.subtitle, { color: "white", textAlign: "center" }]}>
        {item.status === "confirmed" ? "Delete Order" : "Mark Confirmed"}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => {
        if (ref) swipeableRefs.current[item.id] = ref;
      }}
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, item)
      }
      onSwipeableLeftOpen={() => handleLeftSwipe(item, swipeableRefs.current[item.id])}
    >
      <View style={[ComponentStyles.card, {  flexDirection: "column" }]}>

        <Text style={[Typography.subtitle, { color: Colors.darkBrown }]}>
          Customer: {item.customerName}
        </Text>

        <Text style={[Typography.body, { marginTop: 5, color: Colors.brown }]}>
          Total: ${item.total}
        </Text>

        <Text style={[Typography.small, { marginTop: 5, color: Colors.lightBrown }]}>
          {new Date(item.dateTime).toLocaleString()}
        </Text>

        <Text style={[Typography.subtitle, { marginTop: 10, color: Colors.darkBrown }]}>
          Items:
        </Text>

        {item.items?.map((d, idx) => (
          <Text key={idx} style={[Typography.body, { color: Colors.lightBrown }]}>
            • {d.name} — ${d.price}
          </Text>
        ))}

        <Text
          style={[
            Typography.small,
            {
              marginTop: 10,
              fontWeight: "bold",
              color: item.status === "confirmed" ? Colors.success : Colors.error,
            },
          ]}
        >
          Status: {item.status || "pending"}
        </Text>

      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[Typography.backButton, { margin: 15 }]}>← Back</Text>
      </TouchableOpacity>

      <Text style={[Typography.title, { textAlign: "center", marginBottom: 20 }]}>
        All Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

    </SafeAreaView>
  );
}
