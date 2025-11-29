import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen({ navigation }) {

  // LOGOUT FUNCTION
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView>
    <View style={styles.container}>

      {/* Logout button */}
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.header}>BeanScene</Text>
      <Text style={styles.sub}>Welcome! Choose an option:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FullMenu")}
      >
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewAllOrders")}
      >
        <Text style={styles.buttonText}>View All Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DishesForm")}
      >
        <Text style={styles.buttonText}>Add New Dish</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#faf4ef" },
  container: { padding: 20, backgroundColor: "#faf4ef", flex: 1 },
  
  logout: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },

  header: { fontSize: 30, fontWeight: "bold", marginTop: 100, marginBottom: 10 },
  sub: { fontSize: 18, marginBottom: 30 },
  button: {
    backgroundColor: "#4e342e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" }
});
