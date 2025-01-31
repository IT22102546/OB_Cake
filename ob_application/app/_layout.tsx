/* eslint-disable prettier/prettier */

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/auth";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    const loadFontsAndHideSplash = async () => {
      try {
        // Ensure the splash screen stays visible while fonts are loading
        await SplashScreen.preventAutoHideAsync();

        // Check if fonts are loaded or if there's an error
        if (fontsLoaded || fontError) {
          // Hide the splash screen
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error(
          "Error while loading fonts or hiding splash screen:",
          error
        );
        // Ensure the splash screen is hidden even if something goes wrong
        await SplashScreen.hideAsync();
      }
    };

    loadFontsAndHideSplash();
  }, [fontsLoaded, fontError]);

  // If fonts are not loaded yet, return null to avoid rendering the app prematurely
  if (!fontsLoaded) {
    return null;
  }

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// /* eslint-disable prettier/prettier */

// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import "react-native-reanimated";
// import { Slot } from "expo-router";
// import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
// import { tokenCache } from "@/lib/auth";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
//     "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
//     "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
//     "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
//     "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
//     "Jakarta ": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
//     "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
//   });

//   if (!publishableKey) {
//     throw new Error(
//       "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
//     );
//   }

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <Stack>
//           <Stack.Screen name="index" options={{ headerShown: false }} />
//           <Stack.Screen name="(root)" options={{ headerShown: false }} />
//           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }
