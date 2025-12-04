import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export default function LoginScreen({ navigation, setLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

const {setRole, setUser} = useContext(AuthContext);

const login = async () => {
  try {
    const res = await api.post("/users/login", { email, password });

    if (res.data.token) {
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      await AsyncStorage.setItem("role", res.data.user.user_type);

      setUser(res.data.user);
      setRole(res.data.user.user_type);

      setLoggedIn(true);  
      navigation.replace("Home");
    }
  } catch (err) {
    setErrorMsg("Invalid email or password");
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>

      <Text style={styles.title}>BeanScene</Text>
      <Text style={styles.subtitle}>Welcome back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#8d6e63"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#8d6e63"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.register}>Create an account</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
  flex: 1,
  backgroundColor: "#faf4ef",
},

  container: {
    backgroundColor: "#faf4ef",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3e2723",
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 40,
    textAlign: "center",
    fontSize: 18,
    color: "#6d4c41",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
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
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  register: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#6d4c41",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
