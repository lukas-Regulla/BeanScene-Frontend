import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../api/api";
import { Colors, ComponentStyles, Typography } from "../styles/Themes";



export default function DishesFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const editing = route.params?.dish ?? null;

  const [name, setName] = useState(editing?.name || "");
  const [price, setPrice] = useState(editing?.price || "");
  const [category, setCategory] = useState(editing?.category || "");
  const [description, setDescription] = useState(editing?.description || "");
  const [dietaryFlags, setDietaryFlags] = useState(editing?.dietary_flags || "");
  const [availability, setAvailability] = useState(editing?.availability || "yes");
  const [file, setFile] = useState(editing?.file || "");

const pickImage = async () => {
      let resuts = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!resuts.canceled) {
        setFile(resuts.assets[0].uri);
      }
    }
    const handleDelete = async () => {
        if (!editing) return;

        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this dish?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/dishes/${editing._id}`);
                            Alert.alert("Deleted", "Dish deleted successfully");
                            navigation.goBack();
                        } catch (err) {
                            console.log(err);
                            Alert.alert("Error", "Could not delete dish. Check console.");
                        }
                    },
                },
            ]
        );
    }

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      Alert.alert("Missing fields", "Name, Price, and Category are required");
      return;
    }

    const dishData = {
      name,
      price,
      category,
      description,
      dietary_flags: dietaryFlags,
      availability,
      file,
    };

    try {
      if (editing) {
        await api.put(`/dishes/${editing._id}`, dishData);
        Alert.alert("Updated", "Dish updated successfully");
      } else {
        await api.post("/dishes", dishData);
        Alert.alert("Created", "Dish created successfully");
      }

      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong. Check console.");
    }
  };

  return (
    <SafeAreaView style={ComponentStyles.safeContainer}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={ComponentStyles.scrollContainer} keyboardShouldPersistTaps="always">
      <Text style={Typography.largeTitle}>{editing ? "Edit Dish" : "Add Dish"}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={ComponentStyles.backButton}>← Back</Text>
          </TouchableOpacity>

      <TextInput
        style={ComponentStyles.input}
        placeholder="Dish Name"
        placeholderTextColor={Colors.textMuted}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={ComponentStyles.input}
        placeholder="Price"
        placeholderTextColor={Colors.textMuted}
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />


    <TextInput
      style={ComponentStyles.input}
      placeholder="Category (e.g. Breakfast, Main, Dessert)"
      placeholderTextColor={Colors.textMuted}
      value={category}
      onChangeText={setCategory}
    />

      <TextInput
        style={ComponentStyles.input}
        placeholder="Description"
        placeholderTextColor={Colors.textMuted}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={ComponentStyles.input}
        placeholder="Dietary Flags (comma separated)"
        placeholderTextColor={Colors.textMuted}
        value={dietaryFlags}
        onChangeText={setDietaryFlags}
      />


      <TextInput
        style={ComponentStyles.input}
        placeholder="Availability (yes / no)"
        placeholderTextColor={Colors.textMuted}
        value={availability}
        onChangeText={setAvailability}
      />

        <TouchableOpacity onPress={pickImage} style={ComponentStyles.button}>
            <Text style={ComponentStyles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

      
      <TouchableOpacity onPress={handleSubmit} style={ComponentStyles.button}>
        <Text style={ComponentStyles.buttonText}>
          {editing ? "Save Changes" : "Add Dish"}
        </Text>
      </TouchableOpacity>
        {editing && (
        <TouchableOpacity onPress={handleDelete} style={ComponentStyles.button}>
            <Text style={ComponentStyles.buttonText}>Delete Dish</Text>
        </TouchableOpacity>
        )}
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


