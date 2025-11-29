import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentStyles, Spacing, Typography, mergeStyles } from "../styles/Themes";


export default function HomeScreen({ navigation }) {

  // LOGOUT FUNCTION
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
    <ScrollView contentContainerStyle={ComponentStyles.scrollContainer}>
    <View style={mergeStyles(ComponentStyles.scrollContainer, { flex: 1 })}>

      {/* Logout button */}
      <TouchableOpacity onPress={() => logout()}>
            <Text style={ComponentStyles.logoutButton}>← Log Out</Text>
          </TouchableOpacity>

      <Text style={mergeStyles(Typography.largeTitle, { marginTop: Spacing.xxxl, marginBottom: Spacing.lg })}>BeanScene</Text>
      <Text style={mergeStyles(Typography.subtitle, { marginBottom: Spacing.xl })}>Welcome! Choose an option:</Text>

      <TouchableOpacity
        style={ComponentStyles.button}
        onPress={() => navigation.navigate("FullMenu")}
      >
        <Text style={ComponentStyles.buttonText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ComponentStyles.button}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={ComponentStyles.buttonText}>View Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ComponentStyles.button}
        onPress={() => navigation.navigate("ViewAllOrders")}
      >
        <Text style={ComponentStyles.buttonText}>View All Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ComponentStyles.button}
        onPress={() => navigation.navigate("DishesForm")}
      >
        <Text style={ComponentStyles.buttonText}>Add New Dish</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
