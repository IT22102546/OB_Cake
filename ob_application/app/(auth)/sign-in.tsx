/* eslint-disable prettier/prettier */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store/store"; 


const API = process.env.EXPO_PUBLIC_API_KEY;

const SignIn = () => {
  const router = useRouter();
  const signInStart = useUserStore((state) => state.signInStart);
  const signInSuccess = useUserStore((state) => state.signInSuccess);
  const signInFailure = useUserStore((state) => state.signInFailure);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Local loading state for button

  const onSignInPress = useCallback(async () => {
    if (!form.email || !form.password) {
      alert("Please enter both email and password.");
      return;
    }

    signInStart(); // Trigger Zustand loading state
    try {
      const response = await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        signInSuccess(data.user); // Update Zustand store with user data
        alert("Sign-in successful!");
        router.replace("/(root)/(tabs)/home"); // Redirect to home page
      } else {
        signInFailure(data.message || "Sign-in failed. Please try again.");
        alert(data.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      signInFailure("An error occurred. Please try again later.");
      alert("An error occurred. Please try again later.");
    }
  }, [form.email, form.password, signInStart, signInSuccess, signInFailure, router]);

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View className="relative w-full h-[250px]">
            <Image source={images.signImage} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-primary-600 text-center font-JakartaExtraBold bottom-5 mt-10">
              Sign In
            </Text>
          </View>

          <View className="p-5 mt-10">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={true}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <CustomButton
              title={loading ? "Signing In..." : "Sign In"}
              onPress={onSignInPress}
              disabled={loading}
              className="mt-6"
            />
            <OAuth />

            <View className="pt-5 items-center">
              <Link href="/sign-up">
                <View>
                  <Text className="text-center text-gray-700">
                    Don't have an account on OB Hand makers?
                  </Text>
                  <Text className="text-primary-500 text-center font-bold">
                    Sign Up
                  </Text>
                </View>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignIn;
