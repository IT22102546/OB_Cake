import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import * as Notifications from "expo-notifications";
import { Platform, View, ActivityIndicator } from "react-native";

const Home = () => {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true); // Track authentication check
  const [isReady, setIsReady] = useState(false); // Ensure UI updates correctly

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        console.log("Token after registration:", token);
      } catch (error) {
        console.error("Push notification setup failed:", error);
      }
    };

    setupNotifications();

    // Listen for incoming notifications
    const notificationSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    // Handle notification responses
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification Response:", response);
      }
    );

    // Clean up listeners
    return () => {
      notificationSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  useEffect(() => {
    // Simulate a delay to ensure UI renders properly
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Enable push notifications in your device settings!");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);

    const API = process.env.EXPO_PUBLIC_API_KEY;
    if (!API) {
      console.error("API key is missing. Please set EXPO_PUBLIC_API_KEY in your .env file.");
      return token;
    }

    try {
      const response = await fetch(`${API}/pushToken/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        console.error("Failed to send token to backend:", response.status, response.statusText);
      } else {
        console.log("Token successfully sent to backend!");
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }

    return token;
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#febbbb" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  return <Redirect href="/(auth)/sign-options" />;
};

export default Home;
