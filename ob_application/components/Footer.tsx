import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { icons, images } from "@/constants"; // Replace with your actual icon imports
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <View className="bg-transparent mt-10 bottom-0">
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* Logo and Info Section */}
        <View className="flex-row justify-between mb-8">
          {/* Left Section */}
          <View className="w-1/3">
            <Image source={images.signImage} className="w-20 h-20" />
            <View>
              <Text className="text-base font-bold mb-2">Info</Text>
              <Text className="text-sm text-gray-700 mb-1">About us</Text>
              <Text className="text-sm text-gray-700 mb-1">Privacy Policy</Text>
              <Text className="text-sm text-gray-700 mb-1">
                Term & condition
              </Text>
              <Text className="text-sm text-gray-700 mb-1">
                Return/Exchange Policy
              </Text>
              <Text className="text-sm text-gray-700">Careers</Text>
            </View>
          </View>

          {/* Middle Section */}
          <View className="w-1/3">
            <Text className="text-base font-bold mb-2">Contacts</Text>
            <Text className="text-sm text-gray-800 font-semibold mb-1">
              Head Office
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              OB Hand Makers
              {"\n"}Galle Road
              {"\n"}Colombo
            </Text>
            <Text className="text-sm text-gray-800 font-semibold mb-1">
              E mail
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              obhandmaker@gmail.com
            </Text>
            <Text className="text-sm text-gray-800 font-semibold mb-1">
              Hotline:
            </Text>
            <Text className="text-sm text-gray-600 mb-1">+94112111111</Text>
            <Text className="text-sm text-gray-800 font-semibold mb-1">
              Landline:
            </Text>
            <Text className="text-sm text-gray-600">+94112111111</Text>
          </View>

          {/* Right Section */}
          <View className="w-1/3">
            <Text className="text-base font-bold mb-2">Socials</Text>
            <View className="flex-row space-x-3 mb-4">
              <Image source={icons.facebook} className="w-6 h-6" />
              {/* <Image source={icons.instagram} className="w-6 h-6" />
              <Image source={icons.youtube} className="w-6 h-6" /> */}
              <Image source={icons.email} className="w-6 h-6" />
            </View>
            <Text className="text-base font-bold mb-2">
              Want to hear about our latest products & offers?
            </Text>
            <TextInput
              className="bg-primary-200 p-3 rounded-full text-sm mb-4 text-white"
              placeholder="E mail address"
            />
            <CustomButton
              title="Subscribe"
              className="bg-brown-700 rounded-full bg-primary-500 text-xs"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Footer;
