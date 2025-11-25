import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { api } from "../api/api";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = async () => {
    const res = await api.post("/users/create", {
      email,
      password,
      name,
      type: "customer", // or staff, depending on your logic
    });

    alert("Account created!");
    navigation.goBack();
  };

  return (
    <View>
      <Text>Create Account</Text>

      <TextInput placeholder="Full Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Register" onPress={register} />
    </View>
  );
}
