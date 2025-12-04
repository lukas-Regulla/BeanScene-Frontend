import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { Colors, ComponentStyles, Spacing, Typography, mergeStyles } from "../styles/Themes";

export default function UserDetailsScreen({ route, navigation }) {
  const { user } = route.params;
  
  // Split name into first and last
  const nameParts = (user.name || "").split(" ");
  const [firstname, setFirstName] = useState(nameParts[0] || "");
  const [lastname, setLastName] = useState(nameParts.slice(1).join(" ") || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.user_type || "staff");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!firstname.trim() || !lastname.trim() || !email.trim()) {
      Alert.alert("Validation", "First name, last name, and email are required");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/users/update/${user.id}`, {
        firstname,
        lastname,
        email,
        user_type: role,
      });
      Alert.alert("Success", "User updated successfully");
      navigation.goBack();
    } catch (err) {
      console.log("Update error:", err);
      Alert.alert("Error", "Failed to update user. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
      <ScrollView contentContainerStyle={ComponentStyles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={ComponentStyles.backButton}>← Back</Text>
        </TouchableOpacity>

        <Text style={Typography.largeTitle}>Edit User</Text>

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

        {/* Email Field */}
        <Text style={Typography.label}>Email</Text>
        <TextInput
          style={ComponentStyles.input}
          placeholder="Enter email"
          placeholderTextColor={Colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Role Selector */}
        <Text style={Typography.label}>Role</Text>
        <View style={mergeStyles(ComponentStyles.section, { flexDirection: "row", gap: Spacing.md, marginTop: Spacing.lg })}>
          <TouchableOpacity
            style={mergeStyles(ComponentStyles.button, {
              flex: 1,
              backgroundColor: role === "staff" ? Colors.primaryLight : Colors.accent,
              marginTop: 0,
            })}
            onPress={() => setRole("staff")}
          >
            <Text style={mergeStyles(ComponentStyles.buttonText, {
              color: role === "staff" ? Colors.white : Colors.text,
              fontSize: 16,
            })}>
              Staff
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={mergeStyles(ComponentStyles.button, {
              flex: 1,
              backgroundColor: role === "admin" ? Colors.primaryLight : Colors.accent,
              marginTop: 0,
            })}
            onPress={() => setRole("admin")}
          >
            <Text style={mergeStyles(ComponentStyles.buttonText, {
              color: role === "admin" ? Colors.white : Colors.text,
              fontSize: 16,
            })}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={mergeStyles(ComponentStyles.button, { marginTop: Spacing.xxl })}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={ComponentStyles.buttonText}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
