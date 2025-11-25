import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import FullMenuScreen from "../screens/FullMenuScreen";




const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
        <Stack.Screen name="FullMenu" component={FullMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
