import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </AuthProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
