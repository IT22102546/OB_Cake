import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import InputField from "@/components/InputField";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useUserStore } from "@/store/store";
import { useAuth } from "@clerk/clerk-expo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal } from "react-native";

export default function Profile() {
  const { currentUser, loadUserFromStorage, signOut, deleteUserSuccess } =
    useUserStore();
  const [profileImage, setProfileImage] = useState(
    currentUser?.profilePicture || "https://via.placeholder.com/150"
  );
  const API = process.env.EXPO_PUBLIC_API_KEY;
  const { signOut: clerkSignOut } = useAuth();
  const [form, setForm] = useState({
    name: "",
    familyName: "",
    email: "",
    gender: "",
    mobile: "",
    birthday: "",
    location: "",
    password: "",
    lastName: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      await loadUserFromStorage();
    };

    fetchUserFromStorage();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.username || currentUser.firstName,
        familyName: currentUser.familyName || "",
        email: currentUser.email || currentUser.emailAddresses[0]?.emailAddress,
        gender: currentUser.gender || "",
        birthday: currentUser.birthday || "",
        location: currentUser.adress || "",
        mobile: currentUser.mobile || "",
        password: currentUser.password,
        lastName: currentUser.lastName,
      });
      setProfileImage(currentUser.profilePicture || currentUser.imageUrl);
    }
  }, [currentUser]);

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSignOut = async () => {
    try {
      await clerkSignOut();
      router.replace("/(auth)/sign-options");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      const clerkUserId =
        currentUser.email || currentUser.emailAddresses[0].emailAddress;

      // Fetch the user from the backend using the Clerk email (user's email)
      const response = await fetch(`${API}/user/findByClerkId/${clerkUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to find MongoDB user: " + errorText);
      }

      const userData = await response.json();
      const mongodbUserId = userData._id; // Get MongoDB user ID

      // Update the user details in the MongoDB database using the user ID
      const updateResponse = await fetch(
        `${API}/user/updateUser/${mongodbUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            username: form.name,
            email: form.email,
            adress: form.location,
            mobile: form.mobile,
            password: form.password,
            profilePicture: profileImage,
            birthday: form.birthday,
            gender: form.gender,
            lastName: form.lastName,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error("Failed to update profile: " + errorText);
      }

      const updatedUser = await updateResponse.json();

      // Update the store with the new user data
      setCurrentUser(updatedUser);
      setForm({
        name: updatedUser.username || updatedUser.firstName,
        familyName: updatedUser.familyName || "",
        email: updatedUser.email || updatedUser.emailAddresses[0]?.emailAddress,
        gender: updatedUser.gender || "",
        birthday: updatedUser.birthday || "",
        location: updatedUser.adress || "",
        mobile: updatedUser.mobile || "",
        password: updatedUser.password,
        lastName: updatedUser.lastName,
      });

      setProfileImage(updatedUser.profilePicture || updatedUser.imageUrl);

      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update profile.");
    }
  };

  const onPressDate = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the picker after selection
    if (selectedDate) {
      // Update the state with the selected date in ISO format
      setForm({ ...form, birthday: selectedDate.toISOString() });
    }
  };

  const formatBirthday = (birthday) => {
    if (!birthday) return ""; // If no birthday, return an empty string
    const date = new Date(birthday); // Convert ISO string to Date object
    if (isNaN(date)) return ""; // Handle invalid date
    return date.toDateString(); // Return a readable date string
  };

  const handleDeleteAccount = async () => {
    try {
      const clerkUserId =
        currentUser.email || currentUser.emailAddresses[0].emailAddress;

      // Fetch the user from the backend using Clerk email
      const response = await fetch(`${API}/user/findByClerkId/${clerkUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to find MongoDB user: " + errorText);
      }

      const userData = await response.json();
      const mongodbUserId = userData._id;

      // Delete the user from the backend
      const deleteResponse = await fetch(
        `${API}/user/delete/${mongodbUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        const errorText = await deleteResponse.text();
        throw new Error("Failed to delete account: " + errorText);
      }

      // Clear user session from store and sign out
      await deleteUserSuccess(); // Update your app's store
      setCurrentUser(null); // Clear the user from the store
      await clerkSignOut(); // Clear Clerk session
      router.replace("/(auth)/sign-options"); // Redirect to the sign-in page
      alert("Account deleted successfully.");
    } catch (error) {
      alert(error.message || "Failed to delete account.");
    }
  };

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView className="flex-1 pb-5">
        <ScrollView
          className="mx-10"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mt-5">
            <View className="relative">
              <Image
                source={{ uri: profileImage }}
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white rounded-full p-2"
                onPress={openGallery}
              >
                <Feather name="camera" size={16} color="#000" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold mt-3">Profile</Text>
          </View>

          <View className="px-5 mt-8">
            <InputField
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <InputField
              label="Family Name"
              placeholder="Your family name"
              value={form.lastName}
              onChangeText={(text) => setForm({ ...form, lastName: text })}
            />

            <InputField
              label="Your Email"
              placeholder="Your Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            <Text className="font-semibold font-JakartaSemiBold mt-3 text-lg pb-2">
              Select your gender
            </Text>
            <View className="border border-primary-300 rounded-lg mb-2">
              <Picker
                selectedValue={form.gender}
                onValueChange={(value) => setForm({ ...form, gender: value })}
                style={{ height: 50 }}
              >
                <Picker.Item label="Select your gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
                <Picker.Item label="Not Prefer To Say" value="nf" />
              </Picker>
            </View>

            <TouchableOpacity onPress={onPressDate}>
              <InputField
                label="Birthday"
                placeholder="Pick a date"
                value={form.birthday ? formatBirthday(form.birthday) : ""}
                editable={false}
                icon="calendar" // Feather icon name
                onIconPress={onPressDate} // Trigger date picker on icon press
              />
            </TouchableOpacity>

            {showDatePicker && (
              <Modal transparent={true} animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50">
                  <DateTimePicker
                    value={form.birthday ? new Date(form.birthday) : new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false); // Hide the picker
                      if (selectedDate) {
                        setForm({
                          ...form,
                          birthday: selectedDate.toISOString(),
                        });
                      }
                    }}
                  />
                </View>
              </Modal>
            )}

            <InputField
              label="Mobile Number"
              placeholder="Your Mobile Number"
              value={form.mobile}
              onChangeText={(text) => setForm({ ...form, mobile: text })}
            />

            <InputField
              label="Location"
              placeholder="Choose a location"
              value={form.location}
              onChangeText={(text) => setForm({ ...form, location: text })}
            />

            <TouchableOpacity
              className="bg-primary-700 rounded-full py-4 items-center mt-5"
              onPress={handleUpdateAccount}
            >
              <Text className="text-white font-bold">Update Account</Text>
            </TouchableOpacity>

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity onPress={handleDeleteAccount}>
                <Text className="text-red-500 underline font-JakartaBold">
                  Delete Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSignOut}>
                <Text className="text-black font-JakartaBold">Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
