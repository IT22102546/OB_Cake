import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { useCartStore } from "@/store/store";

const SingleItem = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(decodeURIComponent(item)) : null;
  const { addToCart } = useCartStore();
  const [selectedWeight, setSelectedWeight] = useState("1 kg"); // Default weight

  if (!parsedItem) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No item data available</Text>
      </View>
    );
  }

  const cartObj = {
    _id: parsedItem._id,
    title: `${parsedItem.title} (${selectedWeight})`,
    imageSource: { uri: decodeURIComponent(parsedItem.mainImage) },
    price: parsedItem.price,
    category: parsedItem.category,
    weight: `${selectedWeight}`,
    cartTotalQuantity: 1,
  };

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <ScrollView className="flex-1">
        <View className="overflow-hidden mb-4">
          <Image
            source={{ uri: decodeURIComponent(parsedItem.mainImage) }}
            className="w-full h-80"
            resizeMode="cover"
          />
        </View>

        <View className="px-5 flex">
          <View className="mb-4">
            <Text className="text-2xl font-bold text-primary-800">
              {parsedItem.title}
            </Text>
            <View className="flex-row items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Text
                  key={i}
                  className={`text-xl ${
                    i < Math.floor(parsedItem.rating)
                      ? "text-primary-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </Text>
              ))}
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-lg text-gray-800 font-semibold">
              Rs. {parsedItem.price}
            </Text>
          </View>

          {/* Cake Size Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">
              Select Size/Weight
            </Text>
            <View className="flex flex-row gap-3">
              {["1 kg", "2 kg"].map((weight) => (
                <TouchableOpacity
                  key={weight}
                  onPress={() => setSelectedWeight(weight)}
                >
                  <View
                    className={`p-2 rounded-lg ${
                      selectedWeight === weight
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-center ${
                        selectedWeight === weight
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {weight}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lg text-gray-800 font-semibold">
              Description
            </Text>
            <Text className="text-base text-gray-600">
              {parsedItem.description}
            </Text>
          </View>

          {/* Add to Cart Button */}
          <CustomButton
            title="Add to Cart"
            onPress={() => addToCart(cartObj)}
            className="bg-primary-500 text-white py-2 px-4 rounded-lg"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SingleItem;
