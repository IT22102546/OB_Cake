import { Alert, Image, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import "../global.css";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect } from "react";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";
import { useUserStore } from "@/store/store";  // Import Zustand store

const API = process.env.EXPO_PUBLIC_API_KEY;

const sendUserDetailsToBackend = async (userDetails) => {
  try {
    const response = await fetch(`${API}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const result = await response.json();
    console.log("Backend Response:", result);
  } catch (error) {
    console.error("Error sending details to backend:", error);
    Alert.alert("Error", "Failed to send details to backend");
  }
};

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user, isLoaded, isSignedIn } = useUser();
  const { setCurrentUser, currentUser } = useUserStore(); // Access Zustand store

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userDetails = {
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        photo: user.imageUrl,
      };

      console.log("User Details Before Zustand Store:", userDetails);

      // Store user session in Zustand
      setCurrentUser(userDetails);

      // Log Zustand store state
      console.log("Stored User in Zustand:", currentUser);

      // Send details to backend
      sendUserDetailsToBackend(userDetails);
    }
  }, [isLoaded, isSignedIn, user]);

  const onPress = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      console.log("OAuth Result:", result);

      if (result.code === "session_exists") {
        Alert.alert("Success", "Session exists. Redirecting to home page.");
        router.replace("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth Error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", "An error occurred during OAuth process.");
    }
  }, [startOAuthFlow]);

  return (
    <View>
      <CustomButton
        title="Continue with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={onPress}
      />
    </View>
  );
};

export default OAuth;
