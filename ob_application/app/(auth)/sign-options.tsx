/* eslint-disable prettier/prettier */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignOptions = () => {
  const router = useRouter();

  const handleFacebookSignIn = async () => {};

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 1 }} // End at the bottom
      locations={[0, 0.5, 1]}
    >
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signImage}
              className="z-0 w-full h-[250px] "
            />
            <Text className="text-2xl text-primary-600 text-center font-JakartaExtraBold bottom-5 mt-10">
              Time to taste, let's sign in
            </Text>
          </View>

          <View className="p-5 mt-16">
            {/* OAuth Button */}
            <OAuth />
            {/* Auth Buttons */}
            <CustomButton
              title="Continue with acebook"
              className="mt-5 w-full shadow-none"
              IconLeft={() => (
                <Image
                  source={icons.facebook}
                  resizeMode="contain"
                  className="w-5 h-5 mx-2"
                />
              )}
              bgVariant="outline"
              textVariant="primary"
              onPress={handleFacebookSignIn}
            />

            <CustomButton
              title="Continue with Email"
              className="mt-5 w-full shadow-none"
              IconLeft={() => (
                <Image
                  source={icons.email}
                  resizeMode="contain"
                  className="w-5 h-5 mx-2"
                />
              )}
              bgVariant="outline"
              textVariant="primary"
              onPress={() => router.replace("/(auth)/sign-in")}
            />

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

export default SignOptions;
