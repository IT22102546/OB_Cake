import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CartItemSummary = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(decodeURIComponent(item)) : null;

  console.log(parsedItem);
  if (!parsedItem) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg font-JakartaBold text-gray-800">
          No item details available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView className="flex-1 pb-10">
        <ScrollView
          className="p-5"
          contentContainerStyle={{ paddingBottom: 20 }} // Add padding to ensure last items are visible
        >
          {/* Image Section */}
          <View className="rounded-lg overflow-hidden shadow-lg mb-4">
            <Image
              source={parsedItem.imageSource}
              className="w-full h-64"
              resizeMode="cover"
            />
          </View>

          {/* Details Section */}
          <View className="bg-transparent border border-primary-500 rounded-lg p-5 mb-4">
            <Text className="text-xl font-JakartaExtraBold text-primary-800 mb-2">
              {parsedItem.title}
            </Text>
            <Text className="text-sm font-JakartaBold text-primary-500 mb-4">
              Category: {parsedItem.category}
            </Text>

            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-JakartaBold text-primary-700">
                Price:
              </Text>
              <Text className="text-lg font-JakartaBold text-primary-700">
                Rs.{" "}
                {parsedItem.basePrice ? parsedItem.basePrice : parsedItem.price}
                .00
              </Text>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-JakartaBold text-primary-700">
                After customization:
              </Text>
              <Text className="text-lg font-JakartaBold text-primary-500">
                Rs. {parsedItem.dynamicPrice ? parsedItem.dynamicPrice : 0}.00
              </Text>
            </View>
          </View>

          {/* Customization Details */}
          <View className="bg-transparent border border-primary-500 rounded-lg p-5 mb-4">
            <Text className="text-lg font-JakartaBold text-gray-800 mb-3">
              Customization Details
            </Text>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Cake Type:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.cakeType
                  ? parsedItem.cakeType
                  : "Not a customized cake"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Cake Size:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.cakeSize
                  ? parsedItem.cakeSize
                  : "Not a customized cake"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Sugar Level:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.sugarLevel
                  ? parsedItem.sugarLevel
                  : "Not a customized cake"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Topping:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.topping
                  ? parsedItem.topping
                  : "Not a customized cake"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Weight:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.weight ? parsedItem.weight : "1"} Kg
              </Text>
            </View>
          </View>

          {/* Quantity and Total Price */}
          <View className="bg-transparent border border-primary-500 rounded-lg p-5">
            <Text className="text-lg font-JakartaBold text-gray-800 mb-3">
              Order Summary
            </Text>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-JakartaBold text-gray-600">
                Quantity:
              </Text>
              <Text className="text-sm font-JakartaBold text-gray-800">
                {parsedItem.cartTotalQuantity}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-JakartaBold text-primary-700">
                Total Price:
              </Text>
              <Text className="text-lg font-JakartaBold text-primary-500">
                Rs.{" "}
                {parsedItem.dynamicPrice
                  ? parsedItem.dynamicPrice
                  : parsedItem.price}
                .00
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CartItemSummary;
