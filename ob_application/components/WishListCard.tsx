import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants/index";
import { WishlistProps } from "@/types/type";

const WishListCard = ({
  _id,
  imageSource,
  title,
  discountedPrice,
  originalPrice,
  category,
  inStock,
  rating,
  item,
  addToCart,
  removeFromWishlist,
}: WishlistProps) => {
  const cartObj = {
    _id,
    title,
    imageSource,
    price: originalPrice,
    cartTotalQuantity: 1,
  };

  return (
    <View className="bg-transparent p-2 items-start m-2 shadow-none border border-primary-500 rounded-[20px] flex-row">
      {/* Product Image */}
      <Image
        source={imageSource}
        className="w-28 h-28 rounded-l-lg mr-4"
        resizeMode="cover"
      />

      {/* Product Details */}
      <View className="flex-1">
        {/* Title */}
        <Text className="text-lg font-bold mb-1 text-primary-700 font-JakartaBold">
          {title}
        </Text>

        {/* Category */}
        <Text className="text-sm text-gray-500 mb-1">{category}</Text>

        {/* Stock Status */}
        <Text
          className={`text-sm font-bold mb-1 ${
            inStock ? "text-green-500" : "text-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Text>

        {/* Pricing */}
        <View className="flex-row items-center mb-2">
          {originalPrice !== discountedPrice && (
            <Text className="line-through text-gray-500 text-sm mr-2">
              Rs. {originalPrice}
            </Text>
          )}
          <Text className="text-lg font-bold text-primary-600">
            Rs. {discountedPrice}
          </Text>
        </View>

        {/* Rating Stars */}
        {/* <View className="flex-row items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Text
              key={index}
              className={`text-lg ${
                index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </Text>
          ))}
          {rating % 1 !== 0 && (
            <Text className="text-lg text-yellow-400">☆</Text> // Half Star
          )}
        </View> */}
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between ml-4 mt-10">
        {/* Remove from Wishlist */}
        <TouchableOpacity
          onPress={() => {
            removeFromWishlist(item);
          }}
          className="p-2 rounded-full"
        >
          <Image source={icons.heartFill} className="w-6 h-6 tint-white" />
        </TouchableOpacity>

        {/* Add to Cart */}
        <TouchableOpacity
          onPress={() => {
            addToCart(cartObj);
          }}
          disabled={!inStock} // Disable Add to Cart if out of stock
          className={`p-2 rounded-full ${!inStock ? "opacity-50" : ""}`} // Add opacity when disabled
        >
          <Image source={icons.cart} className="w-6 h-6 tint-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishListCard;
