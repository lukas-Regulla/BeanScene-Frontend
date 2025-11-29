import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import CartScreen from "../screens/CartScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import DishesFormScreen from "../screens/DishesFormScreen";
import FullMenuScreen from "../screens/FullMenuScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ViewAllOrdersScreen from "../screens/ViewAllOrdersScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {    
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Runs once on startup
  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(!!token);
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator
      key={loggedIn ? "loggedIn" : "loggedOut"}
      initialRouteName={loggedIn ? "Home" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="Register">
        {(props) => <RegisterScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} />}
      </Stack.Screen>


      <Stack.Screen name="FullMenu" component={FullMenuScreen} />
      <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ViewAllOrders" component={ViewAllOrdersScreen} />
      <Stack.Screen name="DishesForm" component={DishesFormScreen} />
    </Stack.Navigator>
  );
}