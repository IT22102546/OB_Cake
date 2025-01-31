/* eslint-disable prettier/prettier */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { icons } from "@/constants";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Image, TouchableOpacity } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  return (
    <>
      <Stack>
        {/* tabs stack */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Profile screen */}
        <Stack.Screen
          name="profile"
          options={{
            headerStyle: { backgroundColor: "#FE8F8E" },
            headerTintColor: "#623B1C", // Header text/icon color
            headerTitleStyle: { fontWeight: "bold" },
            title: "Your Profile", // Header title
          }}
        />

        {/* customize screen */}
        <Stack.Screen
          name="customize"
          options={{
            headerShown: true,
            header: () => (
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/home")} // Navigate back
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 10,
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#623B1C",
                  }}
                  className="bg-primary-400 rounded-full p-5" // Adjust size and color
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* single product page */}
        <Stack.Screen
          name="single_item"
          options={{
            headerShown: true,
            header: () => (
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/home")} // Navigate back
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 10,
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#623B1C",
                  }}
                  className="bg-primary-400 rounded-full p-5" // Adjust size and color
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Checkout screen */}
        <Stack.Screen
          name="checkout"
          options={{
            headerStyle: { backgroundColor: "#FE8F8E" },
            headerTintColor: "#623B1C", // Header text/icon color
            headerTitleStyle: { fontWeight: "bold" },
            title: "Checkout", // Header title
          }}
        />

        {/* Payment screen */}
        <Stack.Screen
          name="payment"
          options={{
            headerStyle: { backgroundColor: "#FE8F8E" },
            headerTintColor: "#623B1C", // Header text/icon color
            headerTitleStyle: { fontWeight: "bold" },
            title: "Payment", // Header title
          }}
        />

        {/* Search screen */}
        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#FE8F8E" },
            headerTintColor: "#623B1C", // Header text/icon color
            headerTitleStyle: { fontWeight: "bold" },
            title: "Search results", // Header title
          }}
        />

        {/* Cart Item screen screen */}
        <Stack.Screen
          name="cart_item_summary"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#FE8F8E" },
            headerTintColor: "#623B1C", // Header text/icon color
            headerTitleStyle: { fontWeight: "bold" },
            title: "Product Summary", // Header title
          }}
        />
      </Stack>

      <Toast />
    </>
  );
};

export default Layout;
