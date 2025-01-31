/* eslint-disable prettier/prettier */
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore, useWishlistStore } from "@/store/store"; // Import Zustand stores
import * as SplashScreen from "expo-splash-screen";
import { icons } from "@/constants";
import Header from "@/components/Header";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

// Icon Component for Tabs
const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      style={{
        width: 45,
        marginTop: 30,
        height: 45,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: focused ? "#FE8F8E" : "transparent",
      }}
    >
      <Image
        source={source}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? "#623B1C" : "white",
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const Layout = () => {
  // Initialize Zustand stores (cart and wishlist) on app start
  useEffect(() => {
    const initializeStores = async () => {
      await useCartStore.getState().initializeCart();
      await useWishlistStore.getState().initializeWishlist();
    };
    initializeStores();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "#623B1C",
          tabBarInactiveTintColor: "#623B1C",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FE8F8E",
            overflow: "hidden",
            height: 60,
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} source={icons.home} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} source={icons.cart} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wishlist",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} source={icons.heart} />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: "Order",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} source={icons.cooking} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
