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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const register = async () => {
    try {
      const res = await api.post("users/register", {
        name,
        email,
        password,
      });

      alert("Account created! You may now log in.");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setErrorMsg("Registration failed. Email may already be in use.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 50 }]} keyboardShouldPersistTaps="handled">
      
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join BeanScene today</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#8d6e63"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8d6e63"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8d6e63"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#faf4ef" },
  container: {
    padding: 25,
  },

  // BACK BUTTON STYLE
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: "#4e342e",
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#3e2723",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#6d4c41",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d7ccc8",
  },
  button: {
    backgroundColor: "#4e342e",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginLink: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
    color: "#6d4c41",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
