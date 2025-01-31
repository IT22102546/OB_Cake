import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useSignUp } from "@clerk/clerk-expo";


const API = process.env.EXPO_PUBLIC_API_KEY;
const SignUp = () => {
  const { isLoaded, signUp } = useSignUp();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    adress: "",
    mobile: "",
  });


  const onSignUpPress = async () => {
    if (!isLoaded) return;
  
    const { username, email, password, adress, mobile } = form;
  
    // Validation checks
    if (!email || !password || !username || !adress || !mobile) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
  
    
  
    try {
      // Start Clerk signup process
      await signUp.create({
        emailAddress: email,
        password: password,
      });
  
      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, adress, mobile }),
      });
  
      if (!response.ok) {
        // If response is not OK, parse the error message from the backend
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to save user data to the backend.";
        throw new Error(errorMessage);
      }
  
      // If successful, show success alert
      Alert.alert("Success", "Signup completed successfully!");
      router.replace("/(auth)/sign-in");

    } catch (err) {
      // If an error occurs, show the error alert
      Alert.alert("Error", err.message || "Signup failed.");
    }
  };
  

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView>
        <View className="flex-1">
          <View className="w-full h-[250px]">
            <Image source={images.signImage} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-primary-600 text-center font-JakartaExtraBold mt-5">
              Sign Up
            </Text>
          </View>

          <View className="p-5 mx-8 mt-10">
            <InputField
              label="Username"
              placeholder="Enter your username"
              icon={icons.person}
              value={form.username}
              onChangeText={(value) =>
                setForm({ ...form, username: value })
              }
            />

            <InputField
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) =>
                setForm({ ...form, email: value })
              }
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry
              value={form.password}
              onChangeText={(value) =>
                setForm({ ...form, password: value })
              }
            />

            <InputField
              label="Address"
              placeholder="Enter your address"
              icon={icons.home}
              value={form.adress}
              onChangeText={(value) =>
                setForm({ ...form, adress: value })
              }
            />

            <InputField
              label="Mobile"
              placeholder="Enter your mobile number"
              keyboardType="numeric"
              icon={icons.telephone}
              value={form.mobile}
              onChangeText={(value) =>
                setForm({ ...form, mobile: value })
              }
            />

            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6"
            />
            <OAuth />

            <Link href="/sign-in">
              <Text className="mt-6">Already have an account?</Text>
              <Text className="text-primary-500"> Log In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUp;
