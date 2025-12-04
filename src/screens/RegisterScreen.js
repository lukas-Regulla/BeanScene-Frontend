import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { Colors, ComponentStyles, Typography } from "../styles/Themes";

export default function RegisterScreen({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const register = async () => {
    try {
      const res = await api.post("users/register", {
        firstname,
        lastname,
        email,
        password,
        user_type: "staff",
      });

      alert("Account created! You may now log in.");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setErrorMsg("Registration failed. Email may already be in use.");
    }
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
    <ScrollView contentContainerStyle={[ComponentStyles.scrollContainer,]} keyboardShouldPersistTaps="handled">
      
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={ComponentStyles.backButton}>
        <Text style={Typography.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={Typography.largeTitle}>Create Account</Text>
      <Text style={Typography.subtitle}>Join BeanScene today</Text>

      <TextInput
        style={ComponentStyles.input}
        placeholder="First Name"
        placeholderTextColor={Colors.textMuted}
        value={firstname}
        onChangeText={setFirstName}
      />
      <TextInput
        style={ComponentStyles.input}
        placeholder="Last Name"
        placeholderTextColor={Colors.textMuted}
        value={lastname}
        onChangeText={setLastName}
      />

      <TextInput
        style={ComponentStyles.input}
        placeholder="Email"
        placeholderTextColor={Colors.textMuted}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={ComponentStyles.input}
        placeholder="Password"
        placeholderTextColor={Colors.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMsg ? <Text style={ComponentStyles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={ComponentStyles.button} onPress={register}>
        <Text style={ComponentStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={ComponentStyles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
}

