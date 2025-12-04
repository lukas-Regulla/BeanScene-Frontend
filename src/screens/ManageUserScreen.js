import { useContext, useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/api";
import { ComponentStyles, Typography, Colors } from "../styles/Themes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageUsersScreen({ navigation }) {
  const { role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Load users on mount
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/users/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log("ERROR LOADING USERS:", err);
      setUsers([]);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.log("Delete Error", err);
    }
  };

  const renderLeftActions = () => (
    <View
      style={{
        backgroundColor: Colors.error,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 12,
      }}
    >
      <Text style={[Typography.subtitle, { color: "white" }]}>Delete</Text>
    </View>
  );

  if (role === null) {
    return (
      <SafeAreaView style={ComponentStyles.safeContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (role !== "admin") {
    return (
      <SafeAreaView style={ComponentStyles.safeContainer}>
        <Text style={Typography.largeTitle}>Access Denied</Text>
        <Text style={Typography.bodyMuted}>Admins only.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
      <ScrollView contentContainerStyle={ComponentStyles.scrollContainer}>
        <Text style={Typography.largeTitle}>Manage Users</Text>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={ComponentStyles.backButton}>← Back</Text>
        </TouchableOpacity>

        {users.map((u) => (
          <Swipeable
            key={u.id}
            renderLeftActions={renderLeftActions}
            onSwipeableLeftOpen={() => deleteUser(u.id)}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetails", { user: u })}
              style={{
                padding: 15,
                marginVertical: 5,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text style={Typography.body}>{u.name}</Text>
              <Text style={Typography.bodyMuted}>{u.email}</Text>
              <Text style={Typography.bodyMuted}>Role: {u.user_type}</Text>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
