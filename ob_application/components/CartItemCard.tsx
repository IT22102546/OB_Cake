import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartCardProps } from "@/types/type";
import { router } from "expo-router";

const CartItemCard = ({
  _id,
  imageSource,
  title,
  price,
  quantity,
  category,
  weight,
  onIncrement,
  onDecrement,
  item,
}: CartCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/cart_item_summary",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View className="flex-row bg-transparent p-2 items-center m-2 h-[120px] border border-primary-500 rounded-[20px] shadow-none">
        {/* Product Image */}

        <Image
          source={imageSource}
          className="w-28 h-28 rounded-l-xl mr-2"
          resizeMode="cover"
        />

        {/* Product Details */}
        <View className="flex-1">
          <Text className="textlg font-bold mb-1 text-primary-700">
            {title}
          </Text>
          <Text className="text-gray-500 text-sm mb-1">
            {category || "No category"}
          </Text>
          <View className="w-[40%] rounded-full bg-primary-100">
            {/* <Text className="textlg font-bold text-primary-700 p-2 text-center">
            {weight || ""}Kg
          </Text> */}
          </View>
          <Text className="text-lg font-bold text-primary-600">{`Rs. ${price}`}</Text>
        </View>

        {/* Quantity Controls */}
        <View className="flex-row items-center justify-between h-full">
          <TouchableOpacity
            onPress={() => onDecrement(_id)}
            className="bg-primary-500 rounded-full w-8 h-8 items-center justify-center"
          >
            <Text className="text-lg font-bold text-white">-</Text>
          </TouchableOpacity>
          <Text className="text-base font-bold mx-2 my-2">{quantity}</Text>
          <TouchableOpacity
            onPress={() => onIncrement(_id)}
            className="bg-primary-500 rounded-full w-8 h-8 items-center justify-center"
          >
            <Text className="text-lg font-bold text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItemCard;
